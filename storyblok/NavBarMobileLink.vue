<script setup lang="ts">
interface PropTypes {
  blok: object
}
const props = defineProps<PropTypes>()
</script>

<template>
  <nuxt-link
    v-editable="props.blok"
    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    :to="props.blok.link.url"
  >
    {{ props.blok.text }}
  </nuxt-link>
</template>
