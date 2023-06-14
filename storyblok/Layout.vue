<template>
  <div v-editable="blok" class="px-4">
    <StoryblokComponent v-for="childBlok in blok.body" :key="childBlok._uid" :blok="childBlok" />
  </div>
</template>

<script setup>
defineProps({ blok: Object })
</script>
