<script setup lang="ts">
import NavBarLinkComponent from "~/components/NavBarLinkComponent.vue"

defineProps({
  blok: Object,
  isOverlay: Boolean
})
</script>

<template>
  <NavBarLinkComponent v-editable="blok" :href="blok.link.url" :is-overlay="isOverlay"
    >{{ blok.text }}
  </NavBarLinkComponent>
</template>
