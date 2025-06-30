<script setup>
useHead({
  htmlAttrs: {
    lang: "en"
  },
  script: [
    {
      src: "https://meclabsai.com/embed/chat.js?appId=xulqous1vdSlUH6LQY7VNCba",
      async: true,
      defer: true
    }
  ]
})

const config = useRuntimeConfig()
const { slug } = useRoute().params

const story = await useAsyncStoryblok(slug && slug.length > 0 ? slug.join("/").replace(/\/$/, "") : "index", {
  version: config.public.storyblokVersion,
  resolve_relations: "GlobalReference.references"
})

// If story doesn't exist, redirect to homepage
if (story.value === null || story.value === undefined) {
  await navigateTo("/")
}
</script>

<template>
  <StoryblokComponent v-if="story?.content" :blok="story.content" />
</template>
