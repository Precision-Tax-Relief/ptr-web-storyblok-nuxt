import { z } from "zod"
import { phoneValidator } from "#shared/utils/validators/phone"
import { ContextSchema } from "#shared/utils/validators/context"
import { formatZodErrors } from "#shared/utils/validators/errorFormaters"
import type { ContactPayloadOutput } from "#shared/types/api"
import { ServerErrorResponseSchema } from "#shared/utils/validators/apiResponse"

export const ContactFormSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  email: z.string().trim().email("Please provide a valid email address"),
  phone: phoneValidator
})

// Define a schema for the request payload
export const ContactPayloadSchema = z.object({
  form: ContactFormSchema,
  context: ContextSchema,
  anonymousId: z.string().uuid().optional()
})

const ContactSuccessResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  lead_id: z.string().uuid()
})

// Combined response schema
export const ContactApiResponseSchema = z.discriminatedUnion("success", [
  ContactSuccessResponseSchema,
  ServerErrorResponseSchema
])

export function validateContactPayload(data: unknown): { validatedPayload: ContactPayloadOutput; errors: any } {
  const result = ContactPayloadSchema.safeParse(data)

  let errors: false | object = false
  if (!result.success) {
    errors = formatZodErrors(result.error)
    console.error(`Validation failed: ${JSON.stringify(errors)}`)
  }

  return {
    validatedPayload: result.data as ContactPayloadOutput,
    errors: errors
  }
}
