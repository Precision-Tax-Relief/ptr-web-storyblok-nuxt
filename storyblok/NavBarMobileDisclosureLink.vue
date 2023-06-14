<script setup lang="ts">
interface PropTypes {
  blok: Object
}
const props = defineProps<PropTypes>()
</script>

<template>
  <NuxtLink
    v-editable="props.blok"
    :to="props.blok.link.url"
    class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
  >
    {{ props.blok.text }}
  </NuxtLink>
</template>
