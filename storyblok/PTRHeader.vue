<script setup lang="ts">
import type { PTRHeaderStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: PTRHeaderStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div>
    <PTRHeaderComponent v-editable="props.blok" />
  </div>
</template>
