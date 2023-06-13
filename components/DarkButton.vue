<script setup lang="ts">
type PropTypes = {
  href: string
}
const props = defineProps<PropTypes>()
</script>
<template>
  <nuxt-link
    :to="props.href"
    class="rounded bg-charcoal-600 px-6 py-2 text-neutral-100 hover:bg-charcoal-700 motion-safe:transition-colors"
  >
    <slot />
  </nuxt-link>
</template>
