<script setup lang="ts">
import NavBarPopover from '~/components/NavBarPopover.vue'

defineProps({
  blok: Object,
  isOverlay: Boolean
})
</script>

<template>
  <NavBarPopover v-editable="blok" :isOverlay="isOverlay">
    <template #link>{{ blok.text }}</template>
    <template #panel>
      <div class="relative z-20 rounded-b-3xl bg-white p-4 shadow-sm">
        <StoryblokComponent v-for="item in blok.dropdown" :key="item._uid" :blok="item" />
      </div>
    </template>
  </NavBarPopover>
</template>
