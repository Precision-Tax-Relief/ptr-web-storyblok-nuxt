<script setup lang="ts">
import type { PtrHeroStoryblok } from "~/types/component-types-sb"
import BBBTorchAwards from "~/components/svg/BBBTorchAwards.vue"
const { isBusinessOpen } = useBusinessHours()

interface PropTypes {
  blok: PtrHeroStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div class="bg-slate-100 py-16">
    <div class="px-0 sm:px-4 md:px-8 container">
      <div class="flex flex-col lg:flex-row gap-16 lg:items-start lg:justify-between">
        <div>
          <div class="px-2 sm:px-0 mb-8 lg:mx-auto lg:max-w-7xl text-center text-primary">
            <h1 class="mb-12 text-4xl md:text-6xl font-bold tracking-wider lg:mb-10" v-html="blok.header"></h1>
            <h3 class="text-xl md:text-3xl/8 font-normal" v-html="blok.subheader"></h3>
          </div>
          <figure class="splash-thumb">
            <NuxtImg
              :modifiers="{ smart: true }"
              :src="blok.image.filename"
              :alt="blok.image.alt"
              class="sm:m-2 w-full"
              quality="100"
              width="1010"
              height="275"
              :placeholder="[202, 55, 35, 10]"
              format="webp"
              loading="eager"
              fetchpriority="high"
              preload
            />
            <figcaption
              class="text-pretty lg:leading-1 px-2 pb-0 pt-6 sm:px-0 text-center text-sm leading-normal text-[#666] lg:pt-2 lg:text-left xl:text-xl"
            >
              <p>
                <strong>Precision Tax</strong>, under the leadership of Scott Gettis, Michele Mulkey, and Gene Haag,
                proudly maintains an <strong>A+&nbsp;BBB</strong> rating and has been awarded the
                <strong>Torch Award for Ethics in 2019, 2023, and 2024.</strong>
              </p>
            </figcaption>
          </figure>
        </div>
        <div class="shrink-0 basis-auto lg:block lg:grow-0" :class="{ hidden: isBusinessOpen }">
          <ContactForm />
        </div>
      </div>
      <div class="px-3 sm:px-0 py-12">
        <ul class="grid grid-cols-2 items-center justify-between max-w-xl mx-auto lg:max-w-full lg:flex">
          <li class="flex flex-col items-center">
            <span class="text-center">
              <BBBTorchAwards />
            </span>
          </li>
          <li class="mt-5 flex flex-col items-center lg:mt-0">
            <div class="badge badge_google">
              <a
                href="https://www.precisiontaxrelief.com/pdf/TorchAwards_Certificate_Recipient_2023.pdf"
                target="_blank"
                data-click-name="ClickG2 TorchAwards_Certificate_2023"
              >
                <NuxtImg
                  src="https://a-us.storyblok.com/f/1023258/131x90/5b311ae5d1/tafe2023.png"
                  alt="BBB Torch Awards for Ethics 2023 Winner"
                  format="webp"
                  loading="eager"
                  width="131"
                  height="90"
                  fetchpriority="high"
                  preload
                ></NuxtImg>
              </a>
            </div>
          </li>
          <li class="mt-5 flex flex-col items-center lg:mt-0">
            <div class="badge badge_google">
              <a
                href="https://www.precisiontaxrelief.com/pdf/TorchAwards_Certificate_Recipient_2019.pdf"
                target="_blank"
                data-click-name="ClickG2 TorchAwards_Certificate_2019"
              >
                <NuxtImg
                  src="https://a-us.storyblok.com/f/1023258/134x90/35be32afe6/tafe2019.png"
                  alt="BBB Torch Awards for Ethics 2019 Winner"
                  format="webp"
                  loading="eager"
                  width="131"
                  height="90"
                  fetchpriority="high"
                  preload
                ></NuxtImg>
              </a>
            </div>
          </li>
          <li class="mt-5 flex flex-col items-center lg:mt-0">
            <div class="badge badge_google">
              <NuxtImg
                src="https://a-us.storyblok.com/f/1023258/479x120/ab7cca33fc/bbb-mobile.png"
                alt="BBB A+ Accredited Business"
                format="webp"
                loading="eager"
                fetchpriority="high"
                width="240"
                height="60"
                preload
              ></NuxtImg>
            </div>
          </li>
        </ul>
      </div>
      <div class="pt-5 px-3 md:px-0 text-xl md:text-center xl:text-2xl">
        <h5 class="mb-5 text-center text-xl font-bold text-primary underline lg:hidden">Our promise:</h5>
        <p>
          <strong class="hidden lg:inline-block">Our Promise:</strong> Precision Tax Relief
          <strong>will never share or sell</strong> your information. Everything you discuss with us is
          <strong>completely confidential.</strong>
        </p>
      </div>
    </div>
  </div>
</template>
