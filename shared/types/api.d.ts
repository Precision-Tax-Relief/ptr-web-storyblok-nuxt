import { z } from "zod"
import { EbookFormSchema, EbookPayloadSchema } from "#shared/utils/validators/ebook"
import { ContactFormSchema, ContactPayloadSchema, ContactApiResponseSchema } from "#shared/utils/validators/contact"
import { QuestionnaireSchema, QuestionnairePayloadSchema } from "#shared/utils/validators/questionnaire"
import { ContextSchema } from "#shared/utils/validators/context"
import {
  ServerErrorResponseSchema,
  ServerSuccessResponseSchema,
  ServerResponseSchema
} from "#shared/utils/validators/apiResponse"

export type ContactAnswerInput = z.input<typeof ContactFormSchema>
export type ContactAnswerOutput = z.output<typeof ContactFormSchema>

export type ContactPayload = z.infer<typeof ContactPayloadSchema>
export type ContactPayloadOutput = z.output<typeof ContactPayloadSchema>

export type ContactApiResponse = z.infer<typeof ContactApiResponseSchema>

export type ContextInput = z.input<typeof ContextSchema>
export type ContextOutput = z.output<typeof ContextSchema>

export type QuestionnaireAnswerInput = z.input<typeof QuestionnaireSchema>
export type QuestionnaireAnswerOutput = z.output<typeof QuestionnaireSchema>

export type QuestionnairePayloadInput = z.input<typeof QuestionnairePayloadSchema>
export type QuestionnairePayloadOutput = z.output<typeof QuestionnairePayloadSchema>

export type EbookFormInput = z.input<typeof EbookFormSchema>

export type EbookPayloadInput = z.input<typeof EbookPayloadSchema>
export type EbookPayloadOutput = z.input<typeof EbookPayloadSchema>

export type ServerErrorResponse = z.infer<typeof ServerErrorResponseSchema>
export type ServerSuccessResponse = z.infer<typeof ServerSuccessResponseSchema>
export type ServerResponse = z.infer<typeof ServerResponseSchema>
