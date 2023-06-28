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
  version: "draft",
  starts_with: "model",
  by_uuids: props.blok.homeModels?.join(",")
})
const models = data.stories
</script>

<template>
  <div v-editable="props.blok">
    <div class="mx-auto">
      <h2 class="text-center text-3xl font-bold tracking-tight text-charcoal-900 sm:text-4xl">
        {{ props.blok.title }}
      </h2>
      <div v-for="model in models" class="grid grid-cols-3 gap-4">
        <HomeModelCard :model="model.content"></HomeModelCard>
      </div>
    </div>
  </div>
</template>
