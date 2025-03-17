import { QuestionnaireSchema } from "~/functions/_validators/_questionnaire"
import { ContextSchema } from "~/functions/_validators/_context"
import { z } from "zod"

// Define a schema for the request payload
const QuestionnairePayloadSchema = z.object({
  form: QuestionnaireSchema,
  context: ContextSchema,
  anonymousId: z.string().uuid().optional()
})

// Input type (before transformation)
export type QuestionnairePayloadInput = z.input<typeof QuestionnairePayloadSchema>

// Output type (after transformation)
export type QuestionnairePayloadOutput = z.output<typeof QuestionnairePayloadSchema>

/**
 * Formats Zod errors into a more readable structure
 */
function formatZodErrors(error: z.ZodError) {
  return error.errors.map((err) => ({
    path: err.path.join("."),
    message: err.message
  }))
}

/**
 * Validates the entire payload in one go
 */
export function validateQuestionnairePayload(data: unknown): QuestionnairePayloadOutput {
  const result = QuestionnairePayloadSchema.safeParse(data)

  if (!result.success) {
    const formattedErrors = formatZodErrors(result.error)
    throw new Error(`Validation failed: ${JSON.stringify(formattedErrors)}`)
  }

  return result.data
}
