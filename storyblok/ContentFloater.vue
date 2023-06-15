<script setup lang="ts">
import ContentFloaterComponent from "~/components/ContentFloaterComponent.vue"

interface PropTypes {
  blok: Object
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div>
    <ContentFloaterComponent v-editable="props.blok">
      <template #title>{{ props.blok.topButtonText }}</template>
      <template #big-text>{{ props.blok.contentFloaterBigText }}</template>
      <template #small-text>{{ props.blok.contentFloaterSmallText }}</template>
    </ContentFloaterComponent>
    <StoryblokComponent v-for="child_block in blok.body" :key="child_block._uid" :blok="child_block" />
  </div>
</template>
