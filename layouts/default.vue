<script setup lang="ts">
import { ref } from "vue"
import { useElementSize } from "@vueuse/core"

const story = await useAsyncStoryblok("layouts/default", {
  version: "draft"
})

const headerWrapper = ref<HTMLElement | null>(null)
const { height } = useElementSize(headerWrapper)
</script>

<template>
  <div>
    <StoryblokComponent v-for="blok in story?.content?.header" :key="blok._uid" :blok="blok" />
    <slot />
    <StoryblokComponent v-for="blok in story?.content?.footer" :key="blok._uid" :blok="blok" />
  </div>
</template>
