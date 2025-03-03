<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue"
</script>

<template>
  <Disclosure v-slot="{ open }" as="div" class="-mx-3">
    <DisclosureButton
      class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50"
    >
      <slot name="button"/>
      <Icon
        name="lucide:chevron-down"
        :class="{ 'h-5 w-5 flex-none motion-safe:transition-transform': true, '-rotate-180': open }"
        aria-hidden="true"
      />
    </DisclosureButton>
    <DisclosurePanel class="mt-2 space-y-2">
      <slot name="panel"/>
    </DisclosurePanel>
  </Disclosure>
</template>
