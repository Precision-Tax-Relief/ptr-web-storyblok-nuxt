<script setup lang='ts'>
import FooterComponent from '~/components/FooterComponent.vue'
const props = defineProps<PropTypes>()

interface PropTypes {
  blok: Object
}
</script>

<template>
  <FooterComponent v-editable="props.blok">
    <template #links>
      <StoryblokComponent v-for='child_blok in props.blok.links' :key='child_blok._uid' :blok='child_blok' />
    </template>
    <template #icons>
      <StoryblokComponent v-for='child_blok in props.blok.icons' :key='child_blok._uid' :blok='child_blok' />
    </template>
    <template #copy>
      {{ props.blok.copy }}
    </template>
  </FooterComponent>
</template>
