<script setup lang="ts">
import { type YoutubeEmbedStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: YoutubeEmbedStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div v-editable="props.blok">
    <iframe
      loading="lazy"
      class="mx-auto aspect-video h-full w-full"
      :src="props.blok.youtubeLink.url + '?modestbranding=1'"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</template>
