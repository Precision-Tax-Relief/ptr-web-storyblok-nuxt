<script setup lang="ts">
interface PropTypes {
  article: Object
  slug: String
}

const props = defineProps<PropTypes>()

function formatDate(dateStr) {
  // Create a new Date object using your string
  const dateObj = new Date(dateStr)
  // Define the options for the string format
  const options = { year: "numeric", month: "long", day: "numeric" }
  // Convert the date to your desired string format
  const formattedDate = dateObj.toLocaleDateString("en-US", options)
  // Return the formatted date
  return formattedDate
}
</script>

<template>
  <NuxtLink
    v-editable="props.article"
    :to="'/' + props.slug"
    class="group flex h-full w-full overflow-hidden rounded-[5px] text-left"
  >
    <div>
      <div class="font-semibold text-charcoal-500">
        {{ formatDate(props.article.date).toUpperCase() }}
      </div>
      <h2 class="mb-1 pt-3 text-3xl font-bold text-charcoal-900">
        {{ props.article.title }}
      </h2>
      <p class="line-clamp-5 pt-6 text-charcoal-700">
        {{ props.article.teaser }}
      </p>
      <span
        class="mt-3 inline-block border-2 border-charcoal-600 bg-charcoal-50/50 px-3 py-2 align-bottom text-xl font-bold text-charcoal-600 group-hover:border-charcoal-800 group-hover:bg-white group-hover:text-charcoal-900 motion-safe:transition-all motion-safe:duration-100"
        >Read More</span
      >
    </div>
  </NuxtLink>
</template>
