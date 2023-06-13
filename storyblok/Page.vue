<script setup lang='ts'>
const props = defineProps<PropTypes>()
interface PropTypes {
  blok: Object
}
</script>

<template>
  <div v-editable="props.blok">
    <StoryblokComponent
      v-for="child_block in blok.body"
      :key="child_block._uid"
      :blok="child_block"
    />
  </div>
</template>
