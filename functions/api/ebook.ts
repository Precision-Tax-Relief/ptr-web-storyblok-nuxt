import { Analytics } from "@segment/analytics-node"
import { v4 as uuidv4 } from "uuid"
import { validateEbookPayload } from "#shared/utils/validators/ebook"
import jsonResponse from "#shared/utils/api/jsonResponse"

/**
 * Handles ebook form submission via Cloudflare Pages Functions
 * POST /api/ebook
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

    let anon_id = validatedPayload.context.anonymous_id
    let extra_properties: any = {}
    if (anon_id === undefined) {
      anon_id = uuidv4()
      extra_properties.analytics_no_load = true
    }

    analytics.track({
      anonymousId: anon_id,
      event: "Ebook Form Filled",
      properties: {
        ...validatedPayload.form,
        ...validatedPayload.context,
        ...extra_properties
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
