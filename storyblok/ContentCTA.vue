<script setup lang="ts">
import ContentCTAComponent from "~/components/ContentCTAComponent.vue"

interface PropTypes {
  blok: object
}

const props = defineProps<PropTypes>()
</script>

<template>
  <ContentCTAComponent v-editable="props.blok" :is-dark="props.blok.dark">
    <template #title>{{ props.blok.title }}</template>
    <template #text>{{ props.blok.text }}</template>
    <template #ctas>
      <StoryblokComponent v-for="childBlok in props.blok.ctas" :key="childBlok._uid" :blok="childBlok" />
    </template>
  </ContentCTAComponent>
</template>
