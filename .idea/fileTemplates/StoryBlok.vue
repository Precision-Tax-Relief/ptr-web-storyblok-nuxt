<script setup lang='ts'>
interface PropTypes {
  blok: Object
}
const props = defineProps<PropTypes>()
#[[$END$]]#
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