<script setup lang="ts">
interface PropTypes {
  blok: blok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div v-editable="props.blok" class="mb-12">
    <h2 class="mx-auto pb-20 text-center text-3xl font-bold tracking-tight text-charcoal-900 sm:text-5xl">Gallery</h2>
    <div class="container grid grid-cols-2 gap-2 md:grid-cols-3">
      <NuxtPicture
        v-for="image in props.blok?.images"
        :key="image.id"
        width="507"
        height="338"
        sizes="sm:100vw md:66vw lg:66vw xl:66vw 2xl:66vw"
        :img-attrs="{ class: 'h-auto max-w-full' }"
        :src="image?.filename"
        :alt="image?.alt"
        loading="lazy"
      />
    </div>
  </div>
</template>
