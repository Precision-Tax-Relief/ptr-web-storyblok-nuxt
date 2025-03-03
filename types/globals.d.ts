import type { SbRichTextOptions } from "@storyblok/js/dist/types/types"
import type { RichtextResolver } from "storyblok-js-client"
import type { RichtextStoryblok } from "~/types/component-types-sb"
declare global {
  function renderRichText(
    data: RichtextStoryblok,
    options?: SbRichTextOptions,
    resolverInstance?: RichtextResolver
  ): string
  function useSlots(): Record<string, unknown>
}
