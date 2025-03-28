import { z } from "zod"
import { ContextSchema } from "#shared/utils/validators/context"
import { formatZodErrors } from "#shared/utils/validators/errorFormaters"
import type { EbookPayloadOutput } from "#shared/types/api"

export const EbookFormSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  email: z.string().trim().email("Invalid Email Address")
})

// Define a schema for the request payload
export const EbookPayloadSchema = z.object({
  form: EbookFormSchema,
  context: ContextSchema
})

export function validateEbookPayload(data: unknown): { validatedPayload: EbookPayloadOutput; errors: any } {
  const result = EbookPayloadSchema.safeParse(data)

  let errors: false | object = false
  if (!result.success) {
    errors = formatZodErrors(result.error)
    console.error(`Validation failed: ${JSON.stringify(errors)}`)
  }

  return {
    validatedPayload: result.data as EbookPayloadOutput,
    errors: errors
  }
}
