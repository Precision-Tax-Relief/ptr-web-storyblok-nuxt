import { Analytics } from "@segment/analytics-node"
import { v4 as uuidv4 } from "uuid"

/**
 * Handles form submission via Cloudflare Pages Functions
 * POST /api/contact
 */
export async function onRequestPost(context) {
  // Initialize analytics inside the handler function
  const analytics = new Analytics({
    writeKey: context?.env?.ANALYTICS_KEY || ""
  }).on("error", console.error)

  try {
    // Get request body as JSON
    const body = await context.request.json()

    const form = body?.form
    if (form === undefined) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Form data was malformed."
        }),
        {
          status: 406,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    }

    // Basic validation
    if (!form.name || !form.name.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Name is required"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    }

    if (!form.email || !form.email.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email is required"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    }

    if (!form.phone || !form.phone.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Phone Number is required"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    }

    // Email validation using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please provide a valid email address"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    }

    // Log form submission (for debugging purposes)
    console.log("Form submission received:", body)

    // Serialize Inputs
    const form_keys = ["name", "email", "phone"]
    const data_keys = [
      "ga_client_id",
      "page_url",
      "referrer",
      "path",
      "tax_amount_id",
      "gclid",
      "msclkid",
      "gbraid",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content"
    ]

    const properties = {}
    for (const key in form_keys) {
      properties[key] = body.form[key]
    }
    for (const key in data_keys) {
      properties[key] = body[key]
    }

    let anonymousId = body?.anonymousId
    if (anonymousId === undefined) {
      anonymousId = uuidv4()
    }
    analytics.track({
      anonymousId: anonymousId,
      event: "Contact Form Filled",
      properties: properties,
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
