<script setup lang="ts">
interface PropTypes {
  model: Object
  slug: String
}

const props = defineProps<PropTypes>()

console.log()
</script>

<template>
  <NuxtLink :to="'/' + props.slug">
    <div>
      <NuxtPicture
        :src="props.model.featuredImage.filename"
        :imgAttrs="{ alt: props.model.featuredImage.alt }"
      ></NuxtPicture>
      <h2 class="text-3xl font-bold text-charcoal-700">
        {{ props.model.model }}
      </h2>
      <div class="grid grid-cols-2 justify-between">
        <div v-for="stat in props.model.stats.filter((stat) => stat.label != 'Floor')" class="space-x-2">
          <Icon :name="stat.icon" class="text-charcoal-500" />
          <span> {{ stat.value }} {{ stat.label }} </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
