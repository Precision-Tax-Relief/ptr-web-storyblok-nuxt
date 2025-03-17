import { Analytics } from "@segment/analytics-node"
import { v4 as uuidv4 } from "uuid"
import type { ContactPayloadOutput } from "#shared/types/api"
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

    let validatedPayload: ContactPayloadOutput

    try {
      validatedPayload = validateContactPayload(rawBody)
    } catch (error) {
      return jsonResponse(
        {
          success: false,
          message: "Validation failed",
          errors: error instanceof Error ? error.message : "Unknown validation error"
        },
        400
      )
    }

    // Log form submission (for debugging purposes)
    console.log("Validated Payload received:", validatedPayload)

    let anonymousId = validatedPayload?.anonymousId
    if (anonymousId === undefined) {
      anonymousId = uuidv4()
    }

    analytics.track({
      anonymousId: anonymousId,
      event: "Contact Form Filled",
      properties: {
        ...validatedPayload.form,
        ...validatedPayload.context
      },
      context: {
        source: "cloudflare"
      }
    })

    await analytics.flush({ close: true })

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Form submitted successfully",
        lead_id: 1
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
  } catch (error) {
    console.error("Error processing form submission:", error)

    // Return error response
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to process form submission"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
  }
}
