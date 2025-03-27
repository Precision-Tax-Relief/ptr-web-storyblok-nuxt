import { Analytics } from "@segment/analytics-node"
import { validateEbookPayload } from "#shared/utils/validators/ebook"
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

    analytics.track({
      anonymousId: validatedPayload.context.anonymous_id,
      event: "Ebook Form Filled",
      properties: {
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
