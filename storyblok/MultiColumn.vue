<script setup lang="ts">
interface PropTypes {
  blok: Object
}

const props = defineProps<PropTypes>()
</script>

<template>
  <ContentCTAComponent v-editable="props.blok">
    <template #title>{{ props.blok.title }}</template>
    <template #text>{{ props.blok.text }}</template>
    <template #columns>
      <StoryblokComponent v-for="child_block in blok.columns" :key="child_block._uid" :blok="child_block" />
    </template>
  </ContentCTAComponent>
</template>
