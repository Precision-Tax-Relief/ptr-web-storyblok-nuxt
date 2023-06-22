<script setup lang="ts">
interface PropTypes {
  blok: blok
}

const styles = {
  imgDiv: [
    "lg:row-span-2 lg:col-span-2",
    "lg:row-span-1 lg:col-span-1",
    "lg:row-span-1 lg:col-span-1",
    "lg:row-span-2 lg:col-span-2",
    "lg:row-span-1 lg:col-span-2"
  ],
  imgSizes: ["lg:50vw", "lg:25vw", "lg:25vw", "lg:50vw", "lg:50vw"]
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div v-editable="props.blok">
    <div class="mx-auto grid grid-cols-1 gap-2 sm:grid-cols-2 lg:auto-rows-[200px] lg:grid-cols-4">
      <div v-for="(image, index) in props.blok?.images" :class="'bg-charcoal-200 ' + styles.imgDiv[index % 5]">
        <NuxtPicture
          class="h-full w-full"
          :sizes="styles.imgSizes[index % 5]"
          :src="image?.filename"
          loading="lazy"
          :imgAttrs="{ class: 'object-cover h-full w-full', alt: image?.alt }"
        >
        </NuxtPicture>
      </div>
    </div>
  </div>
</template>
