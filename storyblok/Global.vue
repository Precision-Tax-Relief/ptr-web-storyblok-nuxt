<script setup lang="ts">
import type { GlobalStoryblok } from "#shared/types/component-types-sb"

interface PropTypes {
  blok: GlobalStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div v-editable="blok">
    <StoryblokComponent v-for="child_block in blok.global" :key="child_block._uid" :blok="child_block" />
  </div>
</template>
