<script setup lang="ts">
interface PropTypes {
  blok: blok
}

const imgDivStyles = [
  "row-span-2 col-span-2",
  "row-span-1 col-span-1",
  "row-span-1 col-span-1",
  "row-span-2 col-span-2",
  "row-span-1 col-span-2"
]

const props = defineProps<PropTypes>()
</script>

<template>
  <div v-editable="props.blok">
    <div class="mx-auto grid gap-2 lg:auto-rows-[200px] lg:grid-cols-4">
      <div v-for="(image, index) in props.blok?.images" :class="'bg-charcoal-200 ' + imgDivStyles[index % 5]">
        <NuxtPicture
          class="h-full w-full"
          sizes=""
          :src="image?.filename"
          loading="lazy"
          :imgAttrs="{ class: 'object-cover h-full w-full', alt: image?.alt }"
        >
        </NuxtPicture>
      </div>
    </div>
  </div>
</template>
