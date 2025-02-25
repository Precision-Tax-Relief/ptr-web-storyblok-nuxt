<script setup lang="ts">
import { type PTRFooterStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: PTRFooterStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <footer v-editable="props.blok" class="bg-primaryDark pt-12 sm:pt-18">
    <div class="container mx-auto">
      <div class="lg:px-10">
        <div class="">
          <div class="mx-auto text-center">
            <figure class="flex items-center justify-center flex-col">
              <picture
                class="lozad"
                data-iesrc="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/team-all.jpg"
                data-loaded="true"
                ><source
                  srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/team-all.webp"
                  type="image/webp"
                />
                <source
                  srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/team-all.jpg"
                  type="image/jpg"
                />
                <img
                  class="xl:h-[340px]"
                  src="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/team-all.jpg"
                  alt="Precision Tax Team"
                />
              </picture>
              <figcaption class="text-[#96a7ba] pt-6 text-2xl">
                Our team consists of proven tax professionals that include CPAs, Tax Attorneys, and federally licensed
                Enrolled Agents.
              </figcaption>
            </figure>
          </div>
          <aside class="text-center text-white my-8">
            <h4 style="font-size: 3rem" class="font-bold">If you have a tax problem, the time to act is now.</h4>
            <p class="text-white font-normal" style="font-size: 2.3rem; margin: 15px 0">
              Trust the experts at Precision Tax Relief to put it behind you for good.
            </p>
            <a
              class="flex-col mx-auto bg-green-500 hover:bg-green-600 py-4 px-10 hidden sm:inline-flex items-center justify-center gap-1 my-16 select-none rounded-sm lg:rounded-md"
              href="#"
            >
              <span class="text-[2.1rem]">Call us today:</span><strong class="text-6xl">1-844-229-6966</strong>
              <span>
                <span
                  class="underline text-3xl activate-form scrollTo"
                  href="#"
                  data-click-name="ClickFtr - Form Scroll"
                  >or fill out the form above</span
                >
              </span>
            </a>
          </aside>
        </div>
        <div class="pb-20 flex justify-center justify-between items-center gap-20">
          <span class="text-[#96a7ba] uppercase">proud members of:</span>
          <ul class="flex gap-20">
            <li>
              <div class="icon_aicpa">
                <picture
                  class="lozad"
                  data-iesrc="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/logos/aicpa.png"
                  data-loaded="true"
                  ><source
                    srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/logos/aicpa.webp"
                    type="image/webp"
                  />
                  <source
                    srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/logos/aicpa.png"
                    type="image/png"
                  />
                  <img
                    src="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/logos/aicpa.png"
                    alt="aicpa logo"
                  />
                </picture>
              </div>
            </li>
            <li>
              <div class="icon_naea">
                <picture
                  class="lozad"
                  data-iesrc="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/logos/naea.png"
                  data-loaded="true"
                  ><source
                    srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/logos/naea.webp"
                    type="image/webp"
                  />
                  <source
                    srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/logos/naea.png"
                    type="image/png"
                  />
                  <img src="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/logos/naea.png" alt="naea" />
                </picture>
              </div>
            </li>
            <li>
              <div class="icon_astps">
                <picture
                  class="lozad"
                  data-iesrc="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/logos/astps.png"
                  data-loaded="true"
                  ><source
                    srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/logos/astps.webp"
                    type="image/webp"
                  />
                  <source
                    srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/logos/astps.png"
                    type="image/png"
                  />
                  <img src="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/logos/astps.png" alt="astps" />
                </picture>
              </div>
            </li>
          </ul>
        </div>
        <div class="text-center text-[#65707f] leading-[24px] text-[1.4rem] mb-2">
          <p>
            We will not rent, share, or sell your information I <a id="open-privacy-modal" href="#">Privacy Policy</a>
          </p>
          <p>Contact us: Precision Tax Relief 1-844-229-6966 I Address: 233 E Locust Ave, Coeur d' Alene, ID 83814</p>
        </div>
        <div class="text-center text-[#65707f] leading-[24px] text-[1.4rem]">
          <p>Copyright 2025 Precision Tax Relief, LLC | All Rights Reserved</p>
        </div>
        <div class="text-white text-[1.1rem] py-10" id="disclaimers">
          <p class="mb-5">
            [1] Precision Tax Relief is a registered trademark of Precision Tax Relief, LLC. All other trademarks, trade
            names, product names, logos, and brands are property of their respective owners. Use of these trademarks,
            trade names, product names, logos, and brands does not imply endorsement.
          </p>
          <p class="mb-5">
            [2] Statistics are based on prior results for clients. Estimates are based on prior results; individual
            results will vary based on circumstances.
          </p>
          <p class="mb-5">
            [3] The company data presented in the competitor chart on our website is updated on a monthly basis. This
            data is sourced directly from BBB.org, Google.com, and Trustpilot.com,. While we strive to ensure the
            accuracy and completeness of the information, we cannot guarantee that it is always up-to-date or
            error-free. Please verify the details from the respective sources for the most current information.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
