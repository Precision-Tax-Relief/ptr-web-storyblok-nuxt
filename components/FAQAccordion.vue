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
        class="accordion__item js-show-item-default bg-white rounded-xl mx-4 lg:mx-0 mb-4"
      >
        <div class="content">
          <HeadlessDisclosureButton
            class="relative flex gap-8 items-center p-2 w-full"
            :aria-controls="`panel-${index}`"
            :aria-expanded="open"
          >
            <span class="">
              <span v-if="!open" class="flex items-center justify-center icon-faq-add">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="22" cy="22" r="22" fill="#173F85" />
                  <path
                    d="M30.75 23.25H23.25V30.75H20.75V23.25H13.25V20.75H20.75V13.25H23.25V20.75H30.75V23.25Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span v-else class="flex items-center justify-center icon-faq-subtract">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="22" cy="22" r="22" fill="#173F85" />
                  <path d="M30.75 23.25H13.25V20.75H30.75V23.25Z" fill="white" />
                </svg>
              </span>
            </span>
            <h3 :id="`tab-${index}`" class="font-bold text-2xl leading-normal text-primary text-left">
              {{ item.question }}
            </h3>
          </HeadlessDisclosureButton>

          <HeadlessDisclosurePanel
            :id="`panel-${index}`"
            class="accordion__content md:pl-[5rem] pl-5 pr-6 leading-[24px] text-[#333]"
            role="tabpanel"
            :aria-labelledby="`tab-${index}`"
          >
            <div class="accordion__content-inner pb-4 text-[1.5rem] md:text-md" v-html="item.answer" />
          </HeadlessDisclosurePanel>
        </div>
      </HeadlessDisclosure>
    </div>
  </div>
</template>
