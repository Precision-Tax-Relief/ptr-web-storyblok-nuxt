<script setup lang="ts">
import type { FaqStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: FaqStoryblok
}

const props = defineProps<PropTypes>()

const faqItems = computed(() => {
  if (!props.blok || !props.blok.faq_items) {
    return []
  }

  return props.blok.faq_items.map((item) => ({
    question: item.question,
    answer: renderRichText(item.answer)
  }))
})
</script>

<template>
  <div v-editable="blok">
    <FAQAccordion v-if="blok" :title="blok.title" :subtitle="blok.subtitle" :items="faqItems" />
  </div>
</template>
