<script setup lang="ts">
import ContentFloaterComponent from "~/components/ContentFloaterComponent.vue"
import type { ContentFloaterStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: ContentFloaterStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <ContentFloaterComponent v-editable="props.blok">
    <template #title>{{ props.blok.contentFloaterTitle }}</template>
    <template #big-text>{{ props.blok.contentFloaterBigText }}</template>
    <template #small-text>{{ props.blok.contentFloaterSmallText }}</template>
    <template v-if="Boolean(props.blok.contentFloaterFigures?.length)" #content-floater-figures>
      <StoryblokComponent v-for="childBlok in blok.contentFloaterFigures" :key="childBlok._uid" :blok="childBlok" />
    </template>
  </ContentFloaterComponent>
</template>
