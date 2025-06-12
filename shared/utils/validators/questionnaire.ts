import { z } from "zod"
import { ContextSchema } from "#shared/utils/validators/context"
import type { QuestionnairePayloadOutput } from "#shared/types/api"
import { formatZodErrors } from "#shared/utils/validators/errorFormaters"

export const QuestionnaireSchema = z.object({
  "self-employed": z.enum(["true", "false", "undefined"]).transform((val) => {
    if (val === "true") return true
    if (val === "false") return false
    if (val === "undefined") return undefined
    return val // This line shouldn't be reached due to enum validation
  }),
  owe_irs: z.enum(["1", "2", "3", "4", "5", "6"]),
  "3_plus_unfiled": z.union([
    z.boolean(),
    z.string().transform((val) => {
      if (val === "true") return true
      if (val === "false") return false
      throw new Error("Invalid boolean value")
    })
  ]),
  levied: z.union([
    z.boolean(),
    z.string().transform((val) => {
      if (val === "true") return true
      if (val === "false") return false
      throw new Error("Invalid boolean value")
    })
  ]),
  contacted_by_ro: z.union([
    z.boolean(),
    z.string().transform((val) => {
      if (val === "true") return true
      if (val === "false") return false
      throw new Error("Invalid boolean value")
    })
  ]),
  lead_id: z.string().uuid()
})

// Define a schema for the request payload
export const QuestionnairePayloadSchema = z.object({
  form: QuestionnaireSchema,
  context: ContextSchema
})

export function validateQuestionnairePayload(data: unknown): {
  validatedPayload: QuestionnairePayloadOutput
  errors: any
} {
  const result = QuestionnairePayloadSchema.safeParse(data)

  let errors: false | object = false
  if (!result.success) {
    const errors = formatZodErrors(result.error)
    console.log(`Validation failed: ${JSON.stringify(errors)}`)
  }

  return {
    validatedPayload: result.data as QuestionnairePayloadOutput,
    errors: errors
  }
}
