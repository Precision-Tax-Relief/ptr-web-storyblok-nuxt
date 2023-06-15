<script setup lang="ts">
import ContentFloaterComponent from "~/components/ContentFloaterComponent.vue"

interface PropTypes {
  blok: Object
}

const props = defineProps<PropTypes>()
</script>

<template>
  <ContentFloaterComponent v-editable="props.blok">
    <template #title>{{ props.blok.topButtonText }}</template>
    <template #big-text>{{ props.blok.contentFloaterBigText }}</template>
    <template #small-text>{{ props.blok.contentFloaterSmallText }}</template>
    <template v-if="Boolean(props.blok.contentFloaterFigures?.length)" #content-floater-figures>
      <StoryblokComponent v-for="childBlok in blok.contentFloaterFigures" :key="childBlok._uid" :blok="childBlok" />
    </template>
  </ContentFloaterComponent>
</template>
