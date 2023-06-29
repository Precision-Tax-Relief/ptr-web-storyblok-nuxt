<script setup lang="ts">
import { useStoryblokApi } from "@storyblok/vue"
import ArticleCard from "~/components/ArticleCard.vue"

defineProps({ blok: Object })

const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get("cdn/stories", {
  version: "published",
  starts_with: "blog",
  is_startpage: 0
})
const articles = data.stories

function getArticleStyles(index) {
  if (index === 0) {
    return "md:order-first"
  } else {
    return "md:order-last"
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl p-8 py-24">
    <h2 class="mb-20 text-left text-6xl font-bold text-charcoal-900">{{ blok.title }}</h2>
    <div class="mx-auto my-12 grid place-items-start gap-8 md:auto-rows-[350px] md:grid-cols-3">
      <NuxtPicture
        class="h-full w-full py-1 md:col-span-2 md:row-span-1"
        :src="articles[0].content.image.filename"
        loading="lazy"
        :imgAttrs="{ class: 'object-cover h-full w-full', alt: articles[0].content.image.alt }"
      >
      </NuxtPicture>
      <ArticleCard
        v-for="(article, index) in articles"
        :key="article.uuid"
        :article="article.content"
        :slug="article.full_slug + '/'"
        :class="'' + getArticleStyles(index)"
      />
    </div>
  </div>
</template>
