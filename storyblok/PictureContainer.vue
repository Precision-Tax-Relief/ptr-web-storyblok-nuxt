<script setup lang="ts">
import type { PictureContainerStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: PictureContainerStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div v-editable="props.blok">
    <NuxtPicture
      :loading="props.blok.lazy ? 'lazy' : 'eager'"
      :modifiers="{ smart: true }"
      :src="props.blok.image.filename"
      :img-attrs="{ alt: props.blok.image.alt }"
    />
  </div>
</template>
