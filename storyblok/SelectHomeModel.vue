<script setup lang="ts">
import { useStoryblokApi } from "@storyblok/vue"
import { SelectHomeModelStoryblok } from "~/types/component-types-sb"
import HomeModelCard from "~/components/HomeModelCard.vue"

interface PropTypes {
  blok: SelectHomeModelStoryblok
}

const props = defineProps<PropTypes>()

const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get("cdn/stories", {
  version: "published",
  starts_with: "model",
  by_uuids: props.blok.homeModels?.join(","),
  resolve_links: "link"
})
const models = data.stories
</script>

<template>
  <div v-editable="props.blok" class="mx-auto container px-6 pt-6 pb-24">
    <h2 class="text-center text-34xl font-bold tracking-tight text-charcoal-900 sm:text-4xl pb-12">

      {{ props.blok.title }}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 max-w-lg sm:max-w-max md:grid-cols-3 mx-auto gap-5">
      <HomeModelCard v-for="model in models" :key="model.uid" :model="model.content" :slug="model.full_slug"></HomeModelCard>
    </div>
  </div>
</template>
