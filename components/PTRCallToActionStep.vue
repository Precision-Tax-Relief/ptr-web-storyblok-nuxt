<script setup lang="ts">
interface PropTypes {
  hasCheck?: boolean
}
const props = defineProps<PropTypes>()
</script>

<template>
  <div
    class="relative mx-auto max-w-xl basis-1/3 rounded border p-6 shadow lg:rounded-none lg:border-0 lg:px-0 lg:py-0 lg:shadow-none"
  >
    <div class="mb-3 flex items-center justify-between">
      <span
        class="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-blue-400 text-center text-3xl font-bold text-white"
      >
        <slot name="number" />
      </span>

      <PTRArrow class="grow px-4" />

      <div class="flex items-center">
        <div class="flex h-16 items-center justify-center">
          <Icon v-if="hasCheck" name="material-symbols-light:check-circle" class="text-green-500" size="69px" />
        </div>
      </div>
    </div>

    <h4 class="mb-4 text-2xl font-bold leading-10 text-primary sm:text-2xl">
      <slot name="header" />
    </h4>

    <p class="sm:prose-md prose leading-normal text-stone-800">
      <slot />
    </p>
  </div>
</template>
