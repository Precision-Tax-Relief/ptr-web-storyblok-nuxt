<script setup lang="ts">
import { type PtrHeroStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: PtrHeroStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <PTRHeroComponent v-editable="props.blok" />
</template>
