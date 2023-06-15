<script setup lang="ts">
import { useDateFormat } from "@vueuse/core"
import type { Ref } from "vue"
import ImageCard from "~/components/ImageCard.vue"

const imageSizes = [
  {
    width: 384,
    height: 436,
    media: "(min-width: 1024px)"
  },
  {
    width: 672,
    height: 284,
    media: "(min-width: 640px)"
  },
  {
    width: 591,
    height: 412,
    media: "(max-width: 639px)"
  }
]

interface structruedPostType extends WpPost {
  featuredImage: string | undefined
  formattedDate: Ref<string>
}

const { data: postData }: { data: Ref<structruedPostType[] | null> } = await useFetch(
  "https://timberedridge.com/wp-json/wp/v2/posts??orderby=date&order=desc&per_page=3"
)
if (postData.value !== null) {
  for (const post of postData.value) {
    const { data: imageData }: { data: Ref<WpMedia | null> } = await useFetch(
      `https://timberedridge.com/wp-json/wp/v2/media/${post.featured_media}`
    )
    post.featuredImage = imageData.value?.source_url
    post.formattedDate = useDateFormat(post.date, "MMMM D, YYYY")
  }
}
interface PropTypes {
  blok: Object
  imageSrc: String
}

const props = defineProps<PropTypes>()
</script>

<template>
  <ImageCard src="" :sources="imageSizes" alt="Timbered Series Home" href="/our-homes/timbered-series">
    Timbered Series
    <template #subheading> A perfect balance of ingenuity and comfort. </template>
  </ImageCard>
</template>
