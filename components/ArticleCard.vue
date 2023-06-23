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
    class="flex h-full w-full overflow-hidden rounded-[5px] text-left"
  >
    <div>
      <div class="font-semibold text-charcoal-700">
        {{ formatDate(props.article.date).toUpperCase() }}
      </div>
      <h2 class="mb-1 pt-3 text-3xl font-bold text-charcoal-700">
        {{ props.article.title }}
      </h2>
      <div class="line-clamp-5 pt-6">
        {{ props.article.teaser }}
      </div>
      <h2 class="pl-1 pt-5 align-bottom text-xl font-bold text-charcoal-700">Read More</h2>
    </div>
  </NuxtLink>
</template>
