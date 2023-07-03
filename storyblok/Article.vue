<script setup lang="ts">
interface PropTypes {
  blok: Object
}
const props = defineProps<PropTypes>()
</script>
<template>
  <Head>
    <Title>{{ props.blok.title }}</Title>
    <Meta property="og:title" :content="props.blok.title" />
    <Meta name="twitter:title" :content="props.blok.title" />

    <Meta v-if="props.blok?.teaser" name="description" :content="props.blok?.teaser" />
    <Meta v-if="props.blok?.teaser" property="og:description" :content="props.blok?.teaser" />
    <Meta v-if="props.blok?.teaser" name="twitter:description" :content="props.blok?.teaser" />

    <Meta v-if="props.blok?.image?.filename" property="og:image" :content="props.blok?.image?.filename" />
    <Meta v-if="props.blok?.image?.filename" name="twitter:image" :content="props.blok?.image?.filename" />
  </Head>
  <div v-editable="props.blok" class="mx-auto mb-32 px-6 sm:px-0">
    <div class="prose mx-auto lg:prose-xl">
      <NuxtPicture :imgAttrs="{ alt: props.blok.image.alt }" :src="props.blok.image.filename"></NuxtPicture>
      <h1>
        {{ props.blok.title }}
      </h1>
      <div v-html="renderRichText(props.blok.content)" />
    </div>
  </div>
</template>
