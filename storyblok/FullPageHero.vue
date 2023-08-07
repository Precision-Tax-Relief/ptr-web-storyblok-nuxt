<script setup lang="ts">
import { FullPageHeroStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: FullPageHeroStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div v-editable="props.blok" class="relative flex min-h-screen flex-col items-center justify-center">
    <NuxtPicture
      sizes="sm:100vw md:100vw lg:100vw"
      loading="lazy"
      :src="props.blok.image?.filename"
      :imgAttrs="{
        class: 'brightness-50 absolute inset-0 object-cover h-full w-full z-0',
        alt: props.blok.matterPortImage?.alt
      }"
    />
    <h1
      class="relative z-10 px-4 text-center text-9xl font-semibold tracking-tighter text-white shadow-black drop-shadow-xl"
    >
      {{ props.blok.title }}
    </h1>
  </div>
</template>
