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
    <div class="flex items-center justify-between mb-3"> 
      <span
        class="flex h-14 w-14 items-center justify-center rounded-full bg-blue-400 text-center text-3xl font-bold text-white"
      >
        <slot name="number" />
      </span>
      
      <PTRArrow class="grow px-4" />
      
      <div class="flex items-center"> 
        <Icon
          v-if="hasCheck"
          name="material-symbols-light:check-circle"
          class="text-green-500"
          size="69px"
        />
      </div>
    </div>
    
    <h4 class="mb-4 text-2xl sm:text-3xl leading-10 font-bold text-primary">
      <slot name="header" />
    </h4>
    
    <p class="prose sm:prose-lg leading-normal text-stone-800">
      <slot />
    </p>
  </div>
  
</template>