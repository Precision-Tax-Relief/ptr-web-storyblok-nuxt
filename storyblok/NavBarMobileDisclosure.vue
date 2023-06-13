<script setup lang="ts">
import NavBarMobileDisclosureComponent from "~/components/NavBarMobileDisclosureComponent.vue"
interface PropTypes {
  blok: Object
}
const props = defineProps<PropTypes>()
</script>

<template>
  <NavBarMobileDisclosureComponent v-editable='props.blok'>
    <template #button>{{props.blok.text}}</template>
    <template #panel>
      <StoryblokComponent v-for="child_blok in props.blok.panel" :key="child_blok._uid" :blok="child_blok" />
    </template>
  </NavBarMobileDisclosureComponent>
</template>
