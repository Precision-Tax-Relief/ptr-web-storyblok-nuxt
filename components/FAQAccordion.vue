<script setup lang="ts">
import type { FaqItemStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  title: string
  subtitle?: string
  items?: [FaqItemStoryblok]
}
defineProps<PropTypes>()

// Animation enter/leave functions
function beforeEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = "0"
  element.style.overflow = "hidden"
}

function enter(el: Element, done: () => void): void {
  const element = el as HTMLElement
  const targetHeight = element.scrollHeight

  // Start animation with easing
  const animation = element.animate([{ height: "0px" }, { height: targetHeight + "px" }], {
    duration: 300,
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1.0)", // Use ease-out cubic
    fill: "forwards"
  })

  animation.onfinish = () => {
    done()
  }
}

function afterEnter(el: Element): void {
  const element = el as HTMLElement
  element.style.height = "auto"
  element.style.overflow = "visible"
}

function beforeLeave(el: Element): void {
  const element = el as HTMLElement
  // Set height to current height before animating
  element.style.height = element.scrollHeight + "px"
  element.style.overflow = "hidden"

  // Force a repaint to make sure the height is applied
  element.offsetHeight
}

function leave(el: Element, done: () => void): void {
  const element = el as HTMLElement
  // Animate to height 0 with easing
  const animation = element.animate([{ height: element.scrollHeight + "px" }, { height: "0px" }], {
    duration: 300,
    easing: "cubic-bezier(0.4, 0.0, 0.2, 1)", // Use ease-in-out cubic
    fill: "forwards"
  })

  animation.onfinish = () => {
    done()
  }
}
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

          <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @before-leave="beforeLeave"
            @leave="leave"
            :css="false"
          >
            <HeadlessDisclosurePanel :id="`panel-${index}`" role="tabpanel" :aria-labelledby="`tab-${index}`">
              <div class="prose prose-lg max-w-full px-24" v-html="item.answer" />
            </HeadlessDisclosurePanel>
          </transition>
        </div>
      </HeadlessDisclosure>
    </div>
  </div>
</template>
