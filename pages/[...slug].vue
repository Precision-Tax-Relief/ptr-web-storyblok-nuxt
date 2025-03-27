<script setup>
useHead({
  htmlAttrs: {
    lang: "en"
  }
})

const config = useRuntimeConfig()
const { slug } = useRoute().params

const story = await useAsyncStoryblok(slug && slug.length > 0 ? slug.join("/").replace(/\/$/, "") : "index", {
  version: config.public.storyblokVersion,
  resolve_relations: "GlobalReference.references"
})
</script>

<template>
  <StoryblokComponent v-if="story?.content" :blok="story.content" />
</template>
