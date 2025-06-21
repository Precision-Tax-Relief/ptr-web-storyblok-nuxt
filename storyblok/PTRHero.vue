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
  <div class="bg-slate-100 py-10">
    <div class="container mx-auto max-w-6xl px-1">
      <div class="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div class="mb-6 px-2 text-center text-primary sm:px-0">
            <h1 class="mb-2 text-[41px] font-bold leading-[53px] tracking-wider text-primary" v-html="blok.header"></h1>
            <h3
              class="sm: mx-auto mt-8 text-2xl text-xl leading-7 tracking-wide md:text-xl"
              v-html="blok.subheader"
            ></h3>
          </div>
          <figure class="splash-thumb">
            <NuxtImg
              :modifiers="{ smart: true }"
              :src="blok.image.filename"
              :alt="blok.image.alt ?? undefined"
              width="850"
              height="220"
              class="w-full sm:m-2"
              quality="90"
              densities="x1 x2"
              format="avif,webp"
              loading="eager"
              fetchpriority="high"
              sizes="752px md:704px sm:95vw xs:95vw"
            />
            <figcaption
              class="lg:leading-1 text-pretty px-2 pb-0 pt-4 text-center text-sm leading-normal text-[#666] sm:px-0 lg:pt-2 lg:text-left lg:text-lg"
            >
              <p class="mb-4 text-base sm:text-sm">
                <strong>Precision Tax</strong>, under the leadership of Scott Gettis, Michele Mulkey, and Gene Haag,
                proudly maintains an <strong>A+&nbsp;BBB</strong> rating and has been awarded the
                <strong>Torch Award for Ethics in 2019, 2023, and 2024.</strong>
              </p>
            </figcaption>
          </figure>
        </div>

        <div class="hidden shrink-0 basis-[18rem] lg:block lg:grow-0">
          <ContactForm :show-phone-number="isBusinessOpen" />
        </div>
        <div class="lg:hidden">
          <template v-if="isBusinessOpen">
            <!-- Business OPEN on small screens → show call button -->
            <PTRCallConsultationButton class="mx-auto block" />
          </template>

          <template v-else>
            <!-- Business CLOSED on small screens → show form -->
            <div class="shrink-0 px-8 sm:grow-0 md:px-24">
              <ContactForm :show-phone-number="isBusinessOpen" class="mx-auto" />
            </div>
          </template>
        </div>
      </div>

      <!-- BBB Awards images -->

      <div class="items-center px-3 py-8 sm:px-0">
        <ul class="mx-auto grid max-w-xl grid-cols-2 items-center justify-between lg:flex lg:max-w-full">
          <li class="flex flex-col items-center">
            <span class="mt-6 text-center lg:mt-0">
              <BBBTorchAwards />
            </span>
          </li>
          <li class="mt-4 flex flex-col items-center lg:mt-0">
            <div class="badge badge_google">
              <SegmentExternalLink
                eventName="PDF Clicked"
                to="https://www.precisiontaxrelief.com/pdf/TorchAwards_Certificate_Recipient_2023.pdf"
                label="Torch Awards 2023 PDF"
              >
                <NuxtImg
                  src="https://a-us.storyblok.com/f/1023258/131x90/5b311ae5d1/tafe2023.png"
                  alt="BBB Torch Awards for Ethics 2023 Winner"
                  format="webp"
                  loading="eager"
                  width="131"
                  height="90"
                  fetchpriority="high"
                  sizes="131 "
                ></NuxtImg>
              </SegmentExternalLink>
            </div>
          </li>
          <li class="mt-4 flex flex-col items-center lg:mt-0">
            <div class="badge badge_google">
              <SegmentExternalLink
                eventName="PDF Clicked"
                to="https://www.precisiontaxrelief.com/pdf/TorchAwards_Certificate_Recipient_2019.pdf"
                label="Torch Awards 2019 PDF"
              >
                <NuxtImg
                  src="https://a-us.storyblok.com/f/1023258/134x90/35be32afe6/tafe2019.png"
                  alt="BBB Torch Awards for Ethics 2019 Winner"
                  format="webp"
                  loading="eager"
                  width="131"
                  height="90"
                  fetchpriority="high"
                  sizes="131"
                />
              </SegmentExternalLink>
            </div>
          </li>
          <li class="mt-4 flex flex-col items-center lg:mt-0">
            <div class="badge badge_google">
              <NuxtImg
                src="https://a-us.storyblok.com/f/1023258/479x120/ab7cca33fc/bbb-mobile.png"
                alt="BBB A+ Accredited Business"
                format="webp"
                loading="eager"
                fetchpriority="high"
                width="200"
                height="50"
                sizes="240"
              ></NuxtImg>
            </div>
          </li>
        </ul>
      </div>
      <div class="px-3 pt-4 text-lg md:px-0 md:text-center lg:text-lg">
        <h5 class="mb-4 text-center text-lg font-bold text-primary underline lg:hidden">Our promise:</h5>
        <p>
          <strong class="hidden lg:inline-block">Our Promise:</strong> Precision Tax
          <strong>will never share or sell</strong> your information. Everything you discuss with us is
          <strong>completely confidential.</strong>
        </p>
      </div>
    </div>
  </div>
</template>
