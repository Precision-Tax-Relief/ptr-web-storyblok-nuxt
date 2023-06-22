<script setup lang="ts">
import { PageStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: PageStoryblok
}
const props = defineProps<PropTypes>()
</script>

<template>
  <Head>
    <Title>{{ props.blok?.title }}</Title>
    <Meta property="og:title" :content="props.blok?.title" />
    <Meta name="twitter:title" :content="props.blok?.title" />

    <Meta name="description" :content="props.blok?.description" />
    <Meta property="og:description" :content="props.blok?.description" />
    <Meta name="twitter:description" :content="props.blok?.description" />

    <Meta property="og:image" :content="props.blok?.image.filename" />
    <Meta name="twitter:image" :content="props.blok?.image.filename" />
  </Head>
  <div v-editable="props.blok">
    <StoryblokComponent v-for="child_block in blok.body" :key="child_block._uid" :blok="child_block" />
  </div>
</template>
