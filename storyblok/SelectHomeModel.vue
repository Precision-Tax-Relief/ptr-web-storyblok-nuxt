<script setup lang="ts">
import { useStoryblokApi } from "@storyblok/vue"
import type { SelectHomeModelStoryblok } from "~/types/component-types-sb"
import HomeModelCard from "~/components/HomeModelCard.vue"

interface PropTypes {
  blok: SelectHomeModelStoryblok
}

const props = defineProps<PropTypes>()

const storyblokApi = useStoryblokApi()
const runtimeConfig = useRuntimeConfig()
const { data } = await storyblokApi.get("cdn/stories", {
  version: runtimeConfig.public.storyblokVersion ? runtimeConfig.public.storyblokVersion : "published",
  starts_with: "model",
  by_uuids: props.blok.homeModels?.join(","),
  resolve_links: "link"
})
const models = data.stories
</script>

<template>
  <div v-editable="props.blok" class="container px-6 pb-24 pt-6">
    <h2 class="text-34xl pb-12 text-center font-bold tracking-tight text-charcoal-900 sm:text-4xl">
      {{ props.blok.title }}
    </h2>
    <div class="mx-auto grid max-w-lg grid-cols-1 gap-5 sm:max-w-max sm:grid-cols-2 md:grid-cols-3">
      <div v-for="model in models" :key="model.uid">
        <HomeModelCard :model="model.content" :slug="model.full_slug" />
      </div>
    </div>
  </div>
</template>
