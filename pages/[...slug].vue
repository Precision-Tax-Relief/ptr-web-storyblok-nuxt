<script setup>
const { slug } = useRoute().params

const resolveRelations = ['popular-articles.articles']

const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join('/') : 'home',
  {
    version: 'draft',
    resolve_relations: resolveRelations
  },
  {
    resolveRelations
  }
)
const layout = await useAsyncStoryblok('layouts/default', {
  version: 'draft'
})
</script>

<template>
  <div>
    <StoryblokComponent v-if="layout" :blok="layout.content" />
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
