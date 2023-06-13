<template>
  <div class="py-24">
    <h2 class="mb-12 text-center text-6xl font-bold text-[#50b0ae]">{{ blok.headline }}</h2>
    <div class="container mx-auto my-12 grid place-items-start gap-12 md:grid-cols-3">
      <ArticleCard
        v-for="article in blok.articles"
        :key="article.uuid"
        :article="article.content"
        :slug="article.full_slug"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({ blok: Object })
</script>
