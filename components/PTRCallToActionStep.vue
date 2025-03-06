<script setup lang="ts">
interface PropTypes {
  hasCheck?: boolean
}
const props = defineProps<PropTypes>()
</script>
<template>
  <div
    class="relative basis-1/3 rounded shadow border mx-auto max-w-xl p-6 lg:rounded-none lg:border-0 lg:px-0 lg:py-0 lg:shadow-none"
  >
    <div class="flex items-center justify-between">
      <span
        class="absolute top-0 left-1/2 flex h-14 w-14 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full bg-blue-400 text-center text-3xl font-bold text-white lg:relative lg:left-0 lg:top-0 lg:translate-x-0"
        ><slot name="number"
      /></span>
      <PTRArrow class="grow pl-4" :class="{ 'pr-4': hasCheck }" />
      <Icon
        v-if="hasCheck"
        name="material-symbols-light:check-circle"
        class="hidden lg:block -my-4 -ml-4 -mr-1 text-green"
        size="69px"
      />
    </div>
    <h4 class="mb-8 text-2xl sm:text-3xl leading-10 font-bold text-primary mt-3">
      <slot name="header" />
    </h4>
    <p class="prose sm:prose-lg leading-normal text-stone-800">
      <slot />
    </p>
  </div>
</template>
