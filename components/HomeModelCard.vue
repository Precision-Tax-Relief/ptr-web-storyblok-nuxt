<script setup lang="ts">
interface PropTypes {
  model: Object
  slug: String
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div
    class="border border-charcoal-100 shadow-none shadow-charcoal-500/25 transition-shadow duration-300 hover:shadow-md hover:shadow-charcoal-500/25"
    @click="navigateTo('/' + props.slug)"
  >
    <div class="relative">
      <div v-if="props.model.matterPortLink">
        <span
          class="absolute right-5 top-6 z-10 rounded-sm bg-charcoal-50 px-2 text-xs font-medium leading-5 text-charcoal-800"
        >
          3D Walkthrough
        </span>
      </div>
      <NuxtPicture
        :src="props.model.featuredImage.filename"
        :imgAttrs="{
          alt: props.model.featuredImage.alt,
          class: 'aspect-video object-cover'
        }"
      ></NuxtPicture>
      <h2 class="p-2 text-3xl font-bold tracking-tight text-charcoal-700">
        {{ props.model.model }}
      </h2>
      <div class="grid grid-cols-2 justify-between gap-2 px-2 pb-4">
        <div v-for="stat in props.model.stats.filter((stat) => stat.label != 'Floor')" class="space-x-2">
          <Icon :name="stat.icon" class="text-charcoal-500" />
          <span> {{ stat.value }} {{ stat.label }} </span>
        </div>
      </div>
      <NuxtLink
        v-if="props.model.matterPortLink"
        :to="props.model.matterPortLink?.url"
        target="_blank"
        class="flex w-full justify-center border-t border-charcoal-100 p-2"
        @click.stop
      >
        <h3 class="text-lg font-semibold tracking-tight text-charcoal-700">View 3D Walkthrough</h3>
      </NuxtLink>
    </div>
  </div>
</template>
