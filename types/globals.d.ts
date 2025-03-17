import type { SbRichTextOptions } from "@storyblok/js/dist/types/types"
import type { RichtextResolver } from "storyblok-js-client"
import type { RichtextStoryblok } from "~/types/component-types-sb"
import type { QuestionnaireAnswerInput } from "~/functions/_validators/_questionnaire.ts"
import type { FormAnswerInput } from "~/functions/_validators/_contact.ts"
import type { ContextInput } from "~/functions/_validators/_context.ts"

declare global {
  function renderRichText(
    data: RichtextStoryblok,
    options?: SbRichTextOptions,
    resolverInstance?: RichtextResolver
  ): string
  function useSlots(): Record<string, unknown>
}

interface ContactPayload {
  form: FormAnswerInput
  context: ContextInput
}

interface QuestionnairePayload {
  form: QuestionnaireAnswerInput
  context: ContextInput
}
