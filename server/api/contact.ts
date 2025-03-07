import { defineEventHandler, readBody, createError } from "h3"

interface ContactForm {
  name: string
  email: string
  message: string
  newsletter: boolean
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default defineEventHandler(async (event) => {
  try {
    // Parse request body
    const body = await readBody<ContactForm>(event)

    // Validate required fields
    if (!body.name?.trim()) {
      throw createError({
        statusCode: 400,
        message: "Name is required"
      })
    }

    if (!body.email?.trim()) {
      throw createError({
        statusCode: 400,
        message: "Email is required"
      })
    }

    if (!isValidEmail(body.email)) {
      throw createError({
        statusCode: 400,
        message: "Please provide a valid email address"
      })
    }

    if (!body.message?.trim()) {
      throw createError({
        statusCode: 400,
        message: "Message is required"
      })
    }

    // Process the form data - this is where you would:
    // 1. Send an email
    // 2. Store in a database
    // 3. Call a third-party API
    console.log("Contact form submission:", body)

    // TODO: Implement your actual form handling logic here
    // Example: await sendEmail(body)
    // Example: await saveToDatabase(body)

    // Return success response
    return {
      success: true,
      message: "Form submitted successfully"
    }
  } catch (error: any) {
    // If it's an h3 error, it will be automatically handled
    if (error.statusCode) {
      throw error
    }

    // For other errors, create a generic 500 error
    throw createError({
      statusCode: 500,
      message: "Failed to process form submission"
    })
  }
})
