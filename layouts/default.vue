<script setup lang="ts">
const config = useRuntimeConfig()

const story = await useAsyncStoryblok("layouts/default", {
  version: config.public.storyblokVersion
})
</script>

<template>
  <div>
    <StoryblokComponent
      ref="headerWrapper"
      v-for="blok in story?.content?.header"
      :key="blok._uid"
      :blok="blok"
      class="sticky inset-x-0 top-0 z-50"
    />
    <slot />
    <StoryblokComponent v-for="blok in story?.content?.footer" :key="blok._uid" :blok="blok" />
  </div>
</template>
