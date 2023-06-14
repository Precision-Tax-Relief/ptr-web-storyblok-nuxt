<template>
  <div v-editable="blok" class="container mx-auto my-12 grid place-items-center gap-12 md:grid-cols-3">
    <StoryblokComponent v-for="childBlok in blok.columns" :key="childBlok._uid" :blok="childBlok" />
  </div>
</template>

<script setup>
defineProps({ blok: Object })
</script>
