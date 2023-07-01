<script setup lang="ts">
import { ArticleCardStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: ArticleCardStoryblok
}

const props = defineProps<PropTypes>()
function formatDate(dateStr) {
  // Create a new Date object using your string
  const dateObj = new Date(dateStr)
  // Define the options for the string format
  const options = { year: "numeric", month: "long", day: "numeric" }
  // Convert the date to your desired string format
  const formattedDate = dateObj.toLocaleDateString("en-US", options)
  // Return the formatted date
  return formattedDate
}
</script>

<template>
  <ImageCardComponent v-editable="props.blok" :img="props.blok.post.content.image" :link="props.blok.post.full_slug">
    <template v-if="props.blok.post.tag_list.length > 0" #category>
      {{ props.blok.post.tag_list[0] }}
    </template>
    <template #preheading>
      {{ formatDate(props.blok.post.content.date) }}
    </template>
    <template #heading>
      {{ props.blok.post.content.title }}
    </template>
  </ImageCardComponent>
</template>
