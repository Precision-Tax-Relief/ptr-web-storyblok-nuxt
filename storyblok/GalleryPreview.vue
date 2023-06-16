<script setup lang="ts">
interface PropTypes {
  blok: blok
}

const props = defineProps<PropTypes>()
const imageSources = props.blok.images?.map((image) => image?.filename)
</script>

<template>
  <GalleryPreviewComponent v-editable="props.blok" :imageSources="imageSources">
    <template #title>{{ props.blok.title }}</template>
    <template #link-label>{{ props.blok.linkLabel }}</template>
  </GalleryPreviewComponent>
</template>
