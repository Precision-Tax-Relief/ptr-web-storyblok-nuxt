<script setup lang="ts">
import { computed } from "vue"

type PropTypes = {
  href: string
  isOverlay: boolean
}
const props = defineProps<PropTypes>()
const shared_styles = "rounded p-1.5 font-semibold leading-6 motion-safe:transition-colors motion-safe:duration-500 "
const overlay_styles = shared_styles + "text-neutral-100 hover:text-white hover:drop-shadow-md"
const default_styles = shared_styles + "text-charcoal-600"
const styles = computed(() => {
  if (props.isOverlay) {
    return overlay_styles
  } else {
    return default_styles
  }
})
</script>

<template>
  <NuxtLink :to="props.href" :class="styles"><slot /></NuxtLink>
</template>
