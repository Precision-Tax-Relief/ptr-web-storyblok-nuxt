<script setup lang="ts">
import { type PTRCallToActionStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: PTRCallToActionStoryblok
}
const props = defineProps<PropTypes>()
</script>

<template>
  <PTRCallToActionComponent v-editable="props.blok" />
</template>
