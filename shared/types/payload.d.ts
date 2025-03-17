import type { QuestionnaireAnswerInput } from "~/functions/_validators/_questionnaire.ts"
import type { FormAnswerInput } from "~/functions/_validators/_contact.ts"
import type { ContextInput } from "~/functions/_validators/_context.ts"

interface ContactPayload {
  form: FormAnswerInput
  context: ContextInput
}

interface QuestionnairePayload {
  form: QuestionnaireAnswerInput
  context: ContextInput
}
