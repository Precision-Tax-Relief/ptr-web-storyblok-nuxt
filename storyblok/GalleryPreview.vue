<script setup lang="ts">
import type { GalleryPreviewStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: GalleryPreviewStoryblok
}

const props = defineProps<PropTypes>()
const imageSources = props.blok.images?.map((image) => image?.filename)
</script>

<template>
  <GalleryPreviewComponent v-editable="props.blok" :image-sources="imageSources" :view-more-link="props.blok.link">
    <template #title>{{ props.blok.title }}</template>
  </GalleryPreviewComponent>
</template>
