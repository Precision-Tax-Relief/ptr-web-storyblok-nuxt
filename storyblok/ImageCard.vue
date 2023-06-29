<script setup lang="ts">
import { ImageCardStoryblok } from "~/types/component-types-sb"
import ImageCardComponent from "~/components/ImageCardComponent.vue"
interface PropTypes {
  blok: ImageCardStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <ImageCardComponent v-editable="props.blok" :img="props.blok.image" :link="props.blok.link">
    <template v-if="props.blok.category" #category>
      {{ props.blok.category }}
    </template>
    <template v-if="props.blok.preheading" #preheading>
      {{ props.blok.preheading }}
    </template>
    <template v-if="props.blok.heading" #heading>
      {{ props.blok.heading }}
    </template>
    <template v-if="props.blok.subheading" #subheading>
      {{ props.blok.subheading }}
    </template>
  </ImageCardComponent>
</template>
