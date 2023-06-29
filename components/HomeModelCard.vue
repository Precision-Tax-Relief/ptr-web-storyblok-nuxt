<script setup lang="ts">
interface PropTypes {
  model: Object
  slug: String
}

const props = defineProps<PropTypes>()

console.log()
</script>

<template>
  <NuxtLink :to="'/' + props.slug" class="border border-charcoal-100 shadow-none hover:shadow-md shadow-charcoal-500/25 hover:shadow-charcoal-500/25 transition-shadow duration-300">
    <div>
      <NuxtPicture
        :src="props.model.featuredImage.filename"
        :imgAttrs="{
          alt: props.model.featuredImage.alt,
          class: 'aspect-video object-cover'
          }"
      ></NuxtPicture>
      <h2 class="text-3xl font-bold text-charcoal-700 tracking-tight p-2">
        {{ props.model.model }}
      </h2>
      <div class="grid grid-cols-2 justify-between gap-2 px-2 pb-4">
        <div v-for="stat in props.model.stats.filter((stat) => stat.label != 'Floor')" class="space-x-2">
          <Icon :name="stat.icon" class="text-charcoal-500" />
          <span> {{ stat.value }} {{ stat.label }} </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
