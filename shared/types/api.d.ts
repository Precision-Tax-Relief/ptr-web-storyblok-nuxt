import { z } from "zod"
import { ContactFormSchema, ContactPayloadSchema } from "#shared/utils/validators/contact"
import { QuestionnaireSchema, QuestionnairePayloadSchema } from "#shared/utils/validators/questionnaire"
import { ContextSchema } from "#shared/utils/validators/context"

export type ContactAnswerInput = z.input<typeof ContactFormSchema>
export type ContactAnswerOutput = z.output<typeof ContactFormSchema>

export type ContactPayloadInput = z.input<typeof ContactPayloadSchema>
export type ContactPayloadOutput = z.output<typeof ContactPayloadSchema>

export type ContextInput = z.input<typeof ContextSchema>
export type ContextOutput = z.output<typeof ContextSchema>

export type QuestionnaireAnswerInput = z.input<typeof QuestionnaireSchema>
export type QuestionnaireAnswerOutput = z.output<typeof QuestionnaireSchema>

export type QuestionnairePayloadInput = z.input<typeof QuestionnairePayloadSchema>
export type QuestionnairePayloadOutput = z.output<typeof QuestionnairePayloadSchema>
