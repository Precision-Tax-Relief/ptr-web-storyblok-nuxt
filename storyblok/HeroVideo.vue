<script setup lang="ts">
import HeroVideoComponent from "~/components/HeroVideoComponent.vue"

interface PropTypes {
  blok: Object
}

const props = defineProps<PropTypes>()
</script>

<template>
  <HeroVideoComponent v-editable="props.blok" :videoSrc="blok.video?.filename">
    <template #top-button>{{ props.blok.topButtonText }}</template>
    <template #big-text><span v-html="props.blok.bigText" /></template>
    <template #small-text>{{ props.blok.smallText }}</template>
    <template #ctas>
      <StoryblokComponent v-for="childBlok in props.blok.ctas" :key="childBlok._uid" :blok="childBlok" />
    </template>
  </HeroVideoComponent>
</template>
