<script setup lang="ts">
import { ref, provide } from "vue"
import { useElementSize } from "@vueuse/core"

const config = useRuntimeConfig()

const story = await useAsyncStoryblok("layouts/default", {
  version: config.public.storyblokVersion
})

const headerWrapper = ref<HTMLElement | null>(null)
const { height } = useElementSize(headerWrapper)
provide("headerHeight", height)
</script>

<template>
  <div>
    <div>
      <StoryblokComponent ref="headerWrapper" v-for="blok in story?.content?.header" :key="blok._uid" :blok="blok" />
    </div>
    <div :style="{ height: `${height}px` }"></div>
    {{height}}
    <slot />
    <StoryblokComponent v-for="blok in story?.content?.footer" :key="blok._uid" :blok="blok" />
  </div>
</template>
