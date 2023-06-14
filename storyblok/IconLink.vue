<script setup lang="ts">
import { defineProps, computed } from 'vue'
interface PropTypes {
  blok: Object
  isOverlay?: Boolean
}
const props = defineProps<PropTypes>()

const size_styles_svg = computed(() => {
  switch (props.blok?.size) {
    case 'small':
      return 'h-5 w-5'
    case 'large':
      return 'h-9 w-9'
    default:
      return 'h-7 w-7'
  }
})

const size_styles_link = computed(() => {
  switch (props.blok?.size) {
    case 'small':
      return 'm-0.5 p-1'
    case 'large':
      return 'm-2 p-2'
    default:
      return 'm-1 p-1.5'
  }
})

const shared_styles = 'inline-block rounded leading-none motion-safe:transition-colors motion-safe:duration-500'
const overlay_styles = 'text-neutral-100 hover:bg-neutral-100 hover:text-charcoal-700'
const default_styles = 'text-charcoal-600 hover:bg-neutral-100 hover:text-charcoal-700'

const styles = computed(() => {
  if (props.isOverlay) {
    return [shared_styles, overlay_styles, size_styles_link.value].join(' ')
  } else {
    return [shared_styles, default_styles, size_styles_link.value].join(' ')
  }
})
</script>

<template>
  <nuxt-link v-editable="props.blok" :class="styles" :href="props.blok.link.url">
    <span class="sr-only">{{ props.blok.alt }}</span>
    <Icon :name="props.blok.icon" :class="size_styles_svg" />
  </nuxt-link>
</template>
