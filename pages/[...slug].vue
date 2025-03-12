<script setup>
const router = useRouter()
useHead({
  htmlAttrs: {
    lang: "en"
  }
})

const config = useRuntimeConfig()
const { slug } = useRoute().params

const story = await useAsyncStoryblok(slug && slug.length > 0 ? slug.join("/").replace(/\/$/, "") : "index", {
  version: config.public.storyblokVersion
})
console.log("story", !!story?.content)
if (!story?.content) {
  console.log("go to 404")
  router.push({ path: "/404" })
}
</script>

<template>
  <StoryblokComponent v-if="story?.content" :blok="story.content" />
</template>
