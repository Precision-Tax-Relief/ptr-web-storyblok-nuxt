<script setup>
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
const layout = await useAsyncStoryblok("layouts/default", {
  version: "draft"
})

useHead({
  htmlAttrs: {
    lang: "en",
    style: "font-size: 13px"
  }
})
</script>

<template>
  <div>
    <Head>
      <Title>Timbered Ridge Homes</Title>
      <Meta
        name="description"
        content="Discover Timbered Ridge Homes, North Idaho's premier home builder. Crafting exceptional, high-quality homes with precision and passion, we bring your dream home to life in Idaho's majestic landscapes. Explore our custom designs today and start your journey to personalized, luxurious living"
      />
    </Head>
    <StoryblokComponent v-if="layout" :blok="layout.content" />
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
