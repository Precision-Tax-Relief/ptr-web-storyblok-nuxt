<script setup lang='ts'>
const props = defineProps<PropTypes>()

interface PropTypes {
  blok: Object
}

</script>

<template>
  <div
    v-editable='props.blok'
    class="pb-6"
  >
    <NuxtLink
      :to="blok.link.url"
      class="text-sm leading-6 text-charcoal-200 hover:text-charcoal-50"
    >{{ props.blok.text }}</NuxtLink>
  </div>
</template>
