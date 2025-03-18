import { z } from "zod"
import { phoneValidator } from "#shared/utils/validators/phone"
import { ContextSchema } from "#shared/utils/validators/context"
import { formatZodErrors } from "#shared/utils/validators/errorFormaters"
import type { ContactPayloadOutput } from "#shared/types/api"

export const ContactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Please provide a valid email address"),
  phone: phoneValidator
})

// Define a schema for the request payload
export const ContactPayloadSchema = z.object({
  form: ContactFormSchema,
  context: ContextSchema,
  anonymousId: z.string().uuid().optional()
})

export function validateContactPayload(data: unknown): ContactPayloadOutput {
  const result = ContactPayloadSchema.safeParse(data)

  if (!result.success) {
    const formattedErrors = formatZodErrors(result.error)
    throw new Error(`Validation failed: ${JSON.stringify(formattedErrors)}`)
  }

  return result.data
}
