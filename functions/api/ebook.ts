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
    console.log("ebook request")
    console.log(JSON.stringify(rawBody, null, 2))

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

    const properties = {
      ...validatedForm,
      ...validatedContext,
      analytics_no_load
    }

    analytics.track({
      anonymousId,
      event: "Ebook Form Filled",
      properties,
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
