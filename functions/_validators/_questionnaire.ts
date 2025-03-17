import { z } from "zod"

// Define the schema
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

// Input type (before transformation)
export type QuestionnaireAnswerInput = z.input<typeof QuestionnaireSchema>

// Output type (after transformation)
export type QuestionnaireAnswerOutput = z.output<typeof QuestionnaireSchema>
