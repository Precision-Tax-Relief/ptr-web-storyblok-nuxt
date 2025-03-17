import type { CloudflareContext } from "~/types/cloudflare"
import { Analytics } from "@segment/analytics-node"
import { v4 as uuidv4 } from "uuid"
import { type QuestionnairePayloadOutput, validateQuestionnairePayload } from "~/functions/_validators/_payload"

/**
 * Creates a JSON response with appropriate headers
 */
function jsonResponse<T>(data: T, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  })
}

/**
 * Handles questionnaire submission via Cloudflare Pages Functions
 * POST /api/questionnaire
 */
export async function onRequestPost(context: CloudflareContext): Promise<Response> {
  // Initialize analytics inside the handler function
  const analytics = new Analytics({
    writeKey: context?.env?.ANALYTICS_KEY || ""
  }).on("error", console.error)

  try {
    // Get request body as JSON
    const rawBody = await context.request.json()

    // Validate the entire payload in one go
    let validatedPayload: QuestionnairePayloadOutput

    try {
      validatedPayload = validateQuestionnairePayload(rawBody)
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

    // Extract validated data
    const { form: validatedForm, context: validatedContext } = validatedPayload

    // Generate or use provided anonymousId
    const anonymousId = validatedPayload.anonymousId || uuidv4()

    // Prepare properties for analytics
    const properties = {
      ...validatedForm,
      ...validatedContext
    }

    // Track the event
    analytics.track({
      anonymousId,
      event: "Questionnaire Submitted",
      properties,
      context: {
        source: "cloudflare"
      }
    })

    // Wait for analytics to flush
    const flushPromise = analytics.flush({ close: true })
    context.waitUntil(flushPromise)

    // Return success response
    return jsonResponse({
      success: true,
      message: "Questionnaire submitted successfully",
      questionnaire_id: anonymousId
    })
  } catch (error) {
    console.error("Error processing questionnaire submission:", error)

    // Return error response
    return jsonResponse(
      {
        success: false,
        message: "Failed to process questionnaire submission",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      500
    )
  }
}
