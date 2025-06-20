import { Analytics } from "@segment/analytics-node"
import { v4 as uuidv4 } from "uuid"
import { validateEbookPayload } from "#shared/utils/validators/ebook"
import jsonResponse from "#shared/utils/api/jsonResponse"

/**
 * Handles ebook form submission via Cloudflare Pages Functions
 * POST /api/ebook
 */
export async function onRequestPost(context: CloudflareContext) {
  // Initialize analytics inside the handler function
  const analytics = new Analytics({
    writeKey: context?.env?.ANALYTICS_KEY || ""
  }).on("error", console.error)

  try {
    const rawBody = await context.request.json()

    let { validatedPayload, errors } = validateEbookPayload(rawBody)

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
    let analytics_no_load: undefined | true = undefined
    if (anonymousId === undefined) {
      anonymousId = uuidv4()
      analytics_no_load = true
    } else {
      delete validatedPayload.context.anonymous_id
    }

    const ip = context.request.headers.get('CF-Connecting-IP') || context.request.cf?.ip || 'unknown'

    const properties = {
      ...validatedForm,
      ...validatedContext,
      analytics_no_load
    }

    analytics.track({
      anonymousId,
      event: "Ebook Lead Submitted",
      properties,
      context: {
        source: "cloudflare",
        ip
      }
    })
    analytics.identify({
      anonymousId,
      traits: {
        name: properties.name,
        email: properties.email
      },
      context: {
        source: "cloudflare",
        ip,
        messaging_subscriptions: [
          {
            key: properties.email,
            type: "EMAIL"
            status: "SUBSCRIBED"
          }
        ]
      }
    })

    await analytics.flush({ close: true })

    return jsonResponse({
      success: true,
      message: "Form submitted successfully"
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
