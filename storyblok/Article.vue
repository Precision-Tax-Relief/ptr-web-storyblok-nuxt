<script setup lang="ts">
interface PropTypes {
  blok: Object
}
const props = defineProps<PropTypes>()
</script>
<template>
  <div v-editable="props.blok" class="mx-auto px-6 sm:px-0">
    <div class="prose mx-auto lg:prose-xl">
      <NuxtPicture :imgAttrs="{ alt: props.blok.image.alt }" :src="props.blok.image.filename"></NuxtPicture>
      <h1>
        {{ props.blok.title }}
      </h1>
      <div v-html="renderRichText(props.blok.content)" />
    </div>
  </div>
</template>
