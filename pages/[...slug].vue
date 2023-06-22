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
    <Head>
      <Title>Timbered Ridge Homes</Title>
      <Meta
        name="description"
        content="Discover Timbered Ridge Homes, North Idaho's premier home builder. Crafting exceptional, high-quality homes with precision and passion, we bring your dream home to life in Idaho's majestic landscapes. Explore our custom designs today and start your journey to personalized, luxurious living"
      />
    </Head>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
