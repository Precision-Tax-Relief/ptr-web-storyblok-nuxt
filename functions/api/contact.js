import { Analytics } from "@segment/analytics-node"

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

    // Basic validation
    if (!body.name || !body.name.trim()) {
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

    if (!body.email || !body.email.trim()) {
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

    if (!body.message || !body.message.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Message is required"
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
    if (!emailRegex.test(body.email)) {
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

    analytics.track({
      anonymousId: "test",
      event: "Contact Form Filled",
      properties: {
        source: "cloudflare",
        ...body
      }
    })

    // Here you would typically:
    // 1. Send an email notification
    // 2. Store the submission in a database
    // 3. Forward to a CRM or other service

    // ========================================
    // Example: Using Email integration
    // ========================================
    /*
    // This is just a placeholder - replace with your actual email service integration
    // Access API keys and config from environment variables
    const API_KEY = context.env.EMAIL_API_KEY;

    const emailData = {
      to: context.env.ADMIN_EMAIL || "your-email@example.com",
      from: context.env.FROM_EMAIL || "website-forms@yourdomain.com",
      subject: `New Contact Form Submission from ${body.name}`,
      text: `
        Name: ${body.name}
        Email: ${body.email}
        Message: ${body.message}
        Newsletter: ${body.newsletter ? "Yes" : "No"}
      `
    };

    // Send email using your preferred email service
    await sendEmail(emailData);
    */

    await analytics.flush({ close: true })

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Form submitted successfully"
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
