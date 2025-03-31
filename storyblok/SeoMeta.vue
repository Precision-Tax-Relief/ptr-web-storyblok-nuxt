<script setup lang="ts">
import type { SeoMetaStoryblok } from "#shared/types/component-types-sb"

interface PropTypes {
  blok: SeoMetaStoryblok
}

const props = defineProps<PropTypes>()
useSeoMeta({
  title: props.blok.title,
  ogTitle: props.blok.title,
  description: props.blok.description,
  ogDescription: props.blok.description,
  ogImage: props.blok.image?.url,
  ogUrl: props.blok.canonical_url,
  ogSiteName: props.blok.site_name
})
</script>

<template>
  <client-only></client-only>
</template>
