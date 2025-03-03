<script setup lang="ts">
import FooterComponent from "~/components/FooterComponent.vue"
interface PropTypes {
  blok: object
}
const props = defineProps<PropTypes>()
</script>

<template>
  <FooterComponent v-editable="props.blok">
    <template #links>
      <StoryblokComponent v-for="child_blok in props.blok.links" :key="child_blok._uid" :blok="child_blok" />
    </template>
    <template #icons>
      <StoryblokComponent v-for="child_blok in props.blok.icons" :key="child_blok._uid" :blok="child_blok" />
    </template>
    <template #copy>
      {{ props.blok.copy }}
    </template>
  </FooterComponent>
</template>
