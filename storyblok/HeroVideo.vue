<script setup lang="ts">
import HeroVideoComponent from "~/components/HeroVideoComponent.vue"
import type { HeroVideoStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: HeroVideoStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <HeroVideoComponent
    v-editable="props.blok"
    :video-src="props.blok.video?.filename"
    :top-link="props.blok.topButtonLink?.url"
  >
    <template #top-button>{{ props.blok.topButtonText }}</template>
    <template #big-text><span v-html="props.blok.bigText" /></template>
    <template #small-text>{{ props.blok.smallText }}</template>
    <template #ctas>
      <StoryblokComponent v-for="childBlok in props.blok.ctas" :key="childBlok._uid" :blok="childBlok" />
    </template>
  </HeroVideoComponent>
</template>
