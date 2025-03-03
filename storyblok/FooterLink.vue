<script setup lang="ts">
interface PropTypes {
  blok: object
}
const props = defineProps<PropTypes>()
</script>

<template>
  <div v-editable="props.blok" class="pb-6">
    <NuxtLink :to="blok.link.url" class="text-sm leading-6 text-charcoal-200 hover:text-charcoal-50">{{
      props.blok.text
    }}</NuxtLink>
  </div>
</template>
