<template>
  <div v-editable="blok">
    <img
      v-if="blok.image?.filename"
      :src="blok.image.filename + '/m/1600x0'"
      :alt="blok.image.alt"
      class="h-[360px] w-full object-cover lg:h-[450px]"
    >
    <div class="container mx-auto mb-12">
      <h1 class="mb-4 mt-12 text-6xl font-bold text-[#50b0ae]">{{ blok.title }}</h1>
      <h2 class="mb-4 text-2xl font-bold text-[#1d243d]">
        {{ blok.subtitle }}
      </h2>
      <div class="prose" v-html="resolvedRichText" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object })

const resolvedRichText = computed(() => renderRichText(props.blok.content))
</script>
