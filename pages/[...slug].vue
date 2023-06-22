<script setup>
import { useRoute } from "nuxt/app"

const { slug } = useRoute().params

const resolveRelations = ["popular-articles.articles"]

const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join("/") : "home",
  {
    version: "draft",
    resolve_relations: resolveRelations
  },
  {
    resolveRelations
  }
)

useHead({
  htmlAttrs: {
    lang: "en",
    style: "font-size: 13px"
  }
})
const route = useRoute()
function getUseOverlay() {
  return ["/", "/our-homes/gallery/"].includes(route.path)
}
const useOverlay = computed(() => {
  return getUseOverlay()
})
</script>

<template>
  <div :class="[useOverlay ? '' : 'pt-[4.25rem] lg:pt-[5.5rem]']">
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
