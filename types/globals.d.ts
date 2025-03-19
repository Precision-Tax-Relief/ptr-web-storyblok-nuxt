import type { SbRichTextOptions } from "@storyblok/js/dist/types/types"
import type { RichtextResolver } from "storyblok-js-client"
import type { RichtextStoryblok } from "~/types/component-types-sb"

// TODO: This function need to be refactored into a composable or plugin
declare global {
  function renderRichText(
    data: RichtextStoryblok,
    options?: SbRichTextOptions,
    resolverInstance?: RichtextResolver
  ): string
  function useSlots(): Record<string, unknown>
}
