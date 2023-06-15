<script setup lang="ts">
interface PropTypes {
  blok: Object
}

const props = defineProps<PropTypes>()
</script>

<template>
  <figure class="text-center text-5xl font-bold text-sand-800">
    {{ props.blok.value }}
    <figcaption class="text-lg font-semibold">
      {{ props.blok.text }}
    </figcaption>
  </figure>
</template>
