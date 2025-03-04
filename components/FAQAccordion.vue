<script setup lang="ts">
import type { FaqItemStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  title: string
  subtitle?: string
  items?: [FaqItemStoryblok]
}
defineProps<PropTypes>()
</script>

<template>
  <div class="container mx-auto pt-8">
    <header class="section-head">
      <h2 id="head_b_padding" class="mb-8 text-5xl font-bold text-primary text-center max-w-4xl mx-auto leading-tight">
        {{ title }}
      </h2>
      <h5
        v-if="subtitle"
        id="head_b_padding"
        class="text-center hidden md:block mb-6 text-xl max-w-3xl mx-auto px-4 lg:px-0"
      >
        {{ subtitle }}
      </h5>
    </header>

    <div class="mb-10 lg:max-w-3xl xl:max-w-4xl mx-auto" role="tablist" aria-live="polite">
      <HeadlessDisclosure
        v-for="(item, index) in items"
        :key="index"
        v-slot="{ open }"
        as="article"
        class="bg-white mx-4 lg:mx-0 mb-4 overflow-hidden"
      >
        <div class="content">
          <HeadlessDisclosureButton
            class="relative rounded-xl flex gap-8 items-center p-2 w-full transition-colors duration-300 hover:bg-neutralLight"
            :aria-controls="`panel-${index}`"
            :aria-expanded="open"
          >
            <span class="flex items-center justify-center icon-faq">
              <Icon
                name="mdi:add-circle"
                class="transform transition-transform duration-300 ease-in-out w-12 h-12 text-primaryDark"
                :class="{ 'rotate-45': open }"
              />
            </span>
            <h3 :id="`tab-${index}`" class="font-bold text-2xl leading-normal text-primary text-left">
              {{ item.question }}
            </h3>
          </HeadlessDisclosureButton>

          <HeadlessDisclosurePanel
            :id="`panel-${index}`"
            class="md:pl-[5rem] pl-5 pr-6 leading-[24px] text-[#333] overflow-hidden transition-all duration-300 ease-out origin-top"
            :class="open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'"
            role="tabpanel"
            :aria-labelledby="`tab-${index}`"
          >
            <div class="py-4 text-[1.5rem] md:text-md" v-html="item.answer" />
          </HeadlessDisclosurePanel>
        </div>
      </HeadlessDisclosure>
    </div>
  </div>
</template>
