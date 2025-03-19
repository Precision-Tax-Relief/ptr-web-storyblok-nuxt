import { Analytics } from "@segment/analytics-node"
import { v4 as uuidv4 } from "uuid"
import { validateContactPayload } from "#shared/utils/validators/contact"
import jsonResponse from "#shared/utils/api/jsonResponse"

/**
 * Handles form submission via Cloudflare Pages Functions
 * POST /api/contact
 */
export async function onRequestPost(context: any) {
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

    // Log form submission (for debugging purposes)
    console.log("Validated Payload received:", validatedPayload)
    const lead_id = uuidv4()
    console.log("Lead ID Set to:", lead_id)

    let anonymousId = validatedPayload?.anonymousId
    if (anonymousId === undefined) {
      anonymousId = lead_id
    }

    analytics.track({
      anonymousId: anonymousId,
      event: "Contact Form Filled",
      properties: {
        lead_id: lead_id,
        ...validatedPayload.form,
        ...validatedPayload.context
      },
      context: {
        source: "cloudflare"
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
