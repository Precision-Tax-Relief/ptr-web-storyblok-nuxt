<script setup>
useHead({
  htmlAttrs: {
    lang: "en",
    style: "font-size: .8125rem"
  }
})

const { slug } = useRoute().params
const resolveRelations = ["popular-articles.articles", "ArticleCard.post"]

const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join("/").replace(/\/$/, "") : "index",
  {
    version: "draft",
    resolve_relations: resolveRelations
  },
  {
    resolveRelations
  }
)

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
