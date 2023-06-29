<script setup lang="ts">
import { defineProps, computed } from "vue"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"

type PropTypes = {
  isOverlay: boolean
}
const props = defineProps<PropTypes>()

const styles = {
  shared: "motion-safe:transition-colors motion-safe:duration-500 ",
  overlay: "text-neutral-100 hover:text-white hover:drop-shadow-md",
  default: "text-charcoal-600"
}

const style = computed(() => {
  if (props.isOverlay) {
    return styles.shared + styles.overlay
  } else {
    return styles.shared + styles.default
  }
})
</script>

<template>
  <Popover class="relative">
    <PopoverButton :class="['flex items-center gap-x-1 rounded p-1.5 font-semibold leading-6', style]">
      <slot name="link" />
      <Icon name="lucide:chevron-down" :class="['h-5 w-5 flex-none', style]" aria-hidden="true" />
    </PopoverButton>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <PopoverPanel
        v-slot="{ close }"
        class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-gray-50 shadow-lg ring-1 ring-gray-900/5"
      >
        <div @click.capture="close()">
          <slot name="panel" />
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
