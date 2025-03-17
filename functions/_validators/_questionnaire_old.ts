import { z } from "zod"

// Define the schema
const AnswerSchema = z.object({
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

// Input type (before transformation)
export type QuestionnaireAnswerInput = z.input<typeof AnswerSchema>

// Output type (after transformation)
export type QuestionnaireAnswerOutput = z.output<typeof AnswerSchema>

/**
 * Validates and transforms answer data
 * @param {QuestionnaireAnswerInput} data - Raw form data
 * @returns {QuestionnaireAnswerOutput} Validated and transformed data or throws error
 */
export function validateQuestionnaireAnswer(data: QuestionnaireAnswerInput): QuestionnaireAnswerOutput {
  // Validate, Strip Extra kwargs, and transform
  const result = AnswerSchema.strip().safeParse(data)

  if (!result.success) {
    // Format validation errors
    const formattedErrors = result.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message
    }))

    throw new Error(`Validation failed: ${JSON.stringify(formattedErrors)}`)
  }

  return result.data
}
