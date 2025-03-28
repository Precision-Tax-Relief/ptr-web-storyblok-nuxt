<script setup lang="ts">
import ExitIntentPopup from "~/components/ExitIntentPopup.vue"

const config = useRuntimeConfig()

const story = await useAsyncStoryblok("layouts/default", {
  version: config.public.storyblokVersion
})
</script>

<template>
  <div>
    <StoryblokComponent
      v-for="blok in story?.content?.header"
      ref="headerWrapper"
      :key="blok._uid"
      :blok="blok"
      class="sticky inset-x-0 top-0 z-30"
    />
    <slot />
    <ExitIntentPopup :mobileTimeout="10000" :cookieExpiration="7" :initialDelay="3000" />
    <StoryblokComponent v-for="blok in story?.content?.footer" :key="blok._uid" :blok="blok" />
  </div>
</template>
