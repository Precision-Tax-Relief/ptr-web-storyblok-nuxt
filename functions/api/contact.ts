import { Analytics } from "@segment/analytics-node"
import { v4 as uuidv4 } from "uuid"
import { validateContactPayload } from "#shared/utils/validators/contact"
import jsonResponse from "#shared/utils/api/jsonResponse"

/**
 * Handles form submission via Cloudflare Pages Functions
 * POST /api/contact
 */
export async function onRequestPost(context: CloudflareContext) {
  // Initialize analytics inside the handler function
  const analytics = new Analytics({
    writeKey: context?.env?.ANALYTICS_KEY || ""
  }).on("error", console.error)

  try {
    const rawBody = await context.request.json()

    let { validatedPayload, errors } = validateContactPayload(rawBody)

    if (errors !== false) {
      return jsonResponse(
        {
          success: false,
          message: "Validation failed",
          errors: errors
        },
        400
      )
    }

    const { form: validatedForm, context: validatedContext } = validatedPayload

    let anonymousId = validatedContext.anonymous_id
    const lead_id = uuidv4()
    let analytics_no_load: undefined | true = undefined
    if (anonymousId === undefined) {
      anonymousId = lead_id
      analytics_no_load = true
    } else {
      delete validatedPayload.context.anonymous_id
    }

    const properties = {
      ...validatedForm,
      ...validatedContext,
      analytics_no_load,
      lead_id
    }

    analytics.track({
      anonymousId,
      event: "Contact Form Filled",
      properties,
      context: {
        source: "cloudflare"
      }
    })
    analytics.identify({
      anonymousId,
      traits: {
        name: properties.name,
        phone: properties.phone,
        email: properties.email
      },
      context: {
        source: "cloudflare",
        "messaging_subscriptions": [
          {
            "key": properties.phone,
            "type": "SMS",
            "status": "SUBSCRIBED"
          },
          {
            "key": properties.email,
            "type": "EMAIL",
            "status": "SUBSCRIBED"
          }
        ],
      }
    })

    await analytics.flush({ close: true })

    return jsonResponse({
      success: true,
      message: "Form submitted successfully",
      lead_id: lead_id
    })
  } catch (error) {
    console.error("Error processing form submission:", error)

    return jsonResponse(
      {
        success: false,
        message: "Failed to process form submission"
      },
      500
    )
  }
}
