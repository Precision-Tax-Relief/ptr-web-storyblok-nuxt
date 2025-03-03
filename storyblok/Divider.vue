<script setup lang="ts">
import type { DividerStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: DividerStoryblok
}

const props = defineProps<PropTypes>()
const padding = computed(() => {
  if (props.blok.size === "sm") return "py-4 md:py-6"
  if (props.blok.size === "md") return "py-8 md:py-12"
  if (props.blok.size === "lg") return "py-12 md:py-16"
  if (props.blok.size === "xl") return "py-20 md:py-28"
  return "py-0"
})
const height = computed(() => {
  if (props.blok.line_thickness === "sm") return "h-px"
  if (props.blok.line_thickness === "md") return "h-0.5"
  if (props.blok.line_thickness === "lg") return "h-1"
  if (props.blok.line_thickness === "xl") return "h-2"
  return "h-0"
})
const width = computed(() => {
  if (props.blok.line_width === "sm") return "w-1/4"
  if (props.blok.line_width === "md") return "w-2/4"
  if (props.blok.line_width === "lg") return "w-3/4"
  if (props.blok.line_width === "xl") return "w-11/12"
  if (props.blok.line_width === "full") return "w-full"
  return "w-1/4"
})
const color = computed(() => {
  if (props.blok.line_color === "primary-light") return "bg-charcoal-100"
  if (props.blok.line_color === "primary-medium") return "bg-charcoal-400"
  if (props.blok.line_color === "primary-dark") return "bg-charcoal-900"
  if (props.blok.line_color === "accent-dark") return "bg-sand-700"
  if (props.blok.line_color === "accent-light") return "bg-sand-200"
  return "bg-white"
})
</script>

<template>
  <div v-editable="props.blok" :class="[padding]">
    <hr v-if="props.blok.line_thickness !== 'none'" :class="[height, width, color, 'mx-auto rounded border-none']" >
  </div>
</template>
