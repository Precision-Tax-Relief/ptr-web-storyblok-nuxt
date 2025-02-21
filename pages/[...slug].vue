<script setup>
useHead({
  htmlAttrs: {
    lang: "en"
  }
})

const { slug } = useRoute().params

const story = await useAsyncStoryblok(slug && slug.length > 0 ? slug.join("/").replace(/\/$/, "") : "index", {
  version: process.env.STORYBLOK_VERSION
})
</script>

<!--<template>-->
<!--  <StoryblokComponent v-if="story" :blok="story.content" />-->
<!--</template>-->

<template>
  <div>
    <PTRHero />
    <PTRCallToAction />
  </div>
</template>
