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
  owe_irs: z.enum(["1", "2", "3", "4", "unknown", "undefined"]),
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
  ])
})

// Define a schema for the request payload
export const QuestionnairePayloadSchema = z.object({
  form: QuestionnaireSchema,
  context: ContextSchema
})

export function validateQuestionnairePayload(data: unknown): QuestionnairePayloadOutput {
  const result = QuestionnairePayloadSchema.safeParse(data)

  if (!result.success) {
    const formattedErrors = formatZodErrors(result.error)
    throw new Error(`Validation failed: ${JSON.stringify(formattedErrors)}`)
  }

  return result.data
}
