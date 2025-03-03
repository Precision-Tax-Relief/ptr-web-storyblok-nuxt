<script setup lang="ts">
import type { PtrHeroStoryblok } from "~/types/component-types-sb"
import BBBTorchAwards from "~/components/svg/BBBTorchAwards.vue"

interface PropTypes {
  blok: PtrHeroStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div class="bg-slate-100 pb-10 md:py-20">
    <div class="container mx-auto">
      <div class="lg:flex lg:flex-row gap-16 lg:items-start lg:justify-between">
        <div>
          <div class="mb-8 lg:mx-auto lg:max-w-7xl text-center text-primary">
            <h1 class="mb-12 text-7xl font-bold tracking-wider lg:mb-10">BBB Approved Tax&nbsp;Attourney</h1>
            <h3 class="text-3xl/8 font-normal">
              <span>
                Get <strong class="font-bold">Immediate</strong> Help with a
                <strong class="font-bold">FREE</strong> Confidential Consultation from the BBB's
                <strong class="whitespace-nowrap font-bold">#1 Rated Tax Relief Attorney</strong> in the US
              </span>
            </h3>
          </div>
          <figure class="splash-thumb">
            <NuxtPicture
              :modifiers="{ smart: true }"
              :src="blok.image.filename"
              :img-attrs="{
                class: 'm-2 w-full'
              }"
            />
            <figcaption
              class="text-pretty lg:leading-1 px-0 pb-0 pt-6 text-center text-sm leading-normal text-[#666] lg:pt-2 lg:text-left xl:text-xl"
            >
              <p>
                <strong>Precision Tax</strong>, under the leadership of Scott Gettis, Michele Mulkey, and Gene Haag,
                proudly maintains an <strong>A+&nbsp;BBB</strong> rating and has been awarded the
                <strong>Torch Award for Ethics in 2019, 2023, and 2024.</strong>
              </p>
            </figcaption>
          </figure>
        </div>
        <div class="shrink-0 basis-auto lg:grow-0">
          <div id="main-form-slide" class="mx-auto">
            <div class="bg-secondary px-1 py-2 text-center font-bold text-white">
              <h3 class="m-0 py-2 text-center text-xl font-bold lg:text-xl">Set up your FREE Consultation</h3>
            </div>
            <div class="bg-white p-6">
              <div id="main-form" class="main-form">
                <form id="callbackForm" class="validate" method="post" action="/api/v2/lead">
                  <input id="abid_1" type="hidden" name="AbId1" value="763202" >
                  <input id="abid_2" type="hidden" name="AbId2" value="192811" >
                  <input id="abid_type" type="hidden" name="AbIdType" value="875839" >
                  <input id="abid_r" type="hidden" name="AbIdR" value="363831526" >
                  <input id="referrer" type="hidden" name="Referrer" value="" >
                  <input
                    id="request_url"
                    type="hidden"
                    name="RequestUrl"
                    value="https://taxattorney-bbb.org/kp1?device=c&amp;onhours=1"
                  >
                  <input type="hidden" name="TaxAmountId" value="14" >
                  <input
                    id="anonymous_id"
                    type="hidden"
                    name="AnonymousId"
                    value="755f4392-45bb-4569-9324-6489f888f56c"
                  >
                  <input id="ga_client_id" type="hidden" name="GaClientId" value="78236266.1740001216" >
                  <input id="iis_id" type="hidden" name="IisId" value="1a9430ec-ab96-2ba8-3500-2e2feb5a15fe.dd44e611" >
                  <h4 class="mb-6 text-center text-base font-bold lg:text-lg">Let us know how we can reach you.</h4>
                  <div class="form-group mb-4">
                    <div class="relative">
                      <Icon
                        name="fa-solid:user-alt"
                        class="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        id="form-name"
                        class="form-control h-12 w-full bg-slate-200 pl-14"
                        name="Name"
                        placeholder="Full Name"
                      >
                      <div
                        class="error-message rounded-bl-1 absolute right-0 top-0 z-10 hidden bg-red-500 p-1 text-lg leading-5 text-white"
                      >
                        Required
                      </div>
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <div class="input-group_icon input-group_icon-phone relative">
                      <Icon
                        name="fa-solid:phone-alt"
                        class="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        id="PhoneNumber"
                        class="form-control h-12 w-full bg-slate-200 pl-14"
                        minlength="14"
                        name="Phone"
                        placeholder="Phone Number"
                      >
                      <div
                        class="error-message rounded-bl-1 absolute right-0 top-0 z-10 hidden bg-red-500 p-1 text-lg leading-5 text-white"
                      >
                        Required
                      </div>
                    </div>
                  </div>
                  <div class="form-group mb-6">
                    <div class="input-group_icon input-group_icon-email relative">
                      <Icon
                        name="fa-solid:envelope"
                        class="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        id="my-email"
                        class="form-control h-12 w-full bg-slate-200 pl-14"
                        email=""
                        name="Email"
                        type="email"
                        placeholder="Example@email.com"
                      >
                      <div
                        class="error-message rounded-bl-1 absolute right-0 top-0 z-10 hidden bg-red-500 p-1 text-lg leading-5 text-white"
                      >
                        Required
                      </div>
                    </div>
                  </div>
                  <button
                    id="btn-submit"
                    class="w-full cursor-pointer rounded-sm bg-green-500 px-4 py-4 text-center font-sans text-xl font-bold tracking-wider text-white hover:bg-green-600 lg:rounded-md"
                    data-click-name="ClickForm - Submit"
                  >
                    Get My Free Consultation
                  </button>
                  <div class="form-summary mt-4 text-center">
                    <strong class="text-center text-2xl text-black" style="font-weight: bolder"
                      >or Call 1-877-635-2025</strong
                    >
                  </div>
                </form>
                <!--                <script>setHiddenFormValues()</script>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="py-20 lg:py-12">
        <ul class="grid grid-cols-2 items-center justify-between lg:flex">
          <li class="flex flex-col items-center">
            <span class="text-center">
              <BBBTorchAwards />
            </span>
          </li>
          <li class="mt-5 flex flex-col items-center lg:mt-0">
            <div class="badge badge_google">
              <a
                href="/pdf/TorchAwards_Certificate_Recipient_2023.pdf"
                target="_blank"
                data-click-name="ClickG2 TorchAwards_Certificate_2023"
              >
                <picture
                  class="lozad m-0 h-auto w-[141px] lg:w-[200px]"
                  data-iesrc="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2023.png"
                  data-alt="Torch"
                  data-loaded="true"
                >
                  <source
                    srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2023.png"
                    type="image/png" >
                  <img src="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2023.png" alt="Torch"
                ></picture>
              </a>
            </div>
          </li>
          <li class="mt-5 flex flex-col items-center lg:mt-0">
            <div class="badge badge_google">
              <a
                href="/pdf/TorchAwards_Certificate_Recipient_2019.pdf"
                target="_blank"
                data-click-name="ClickG2 TorchAwards_Certificate_2019"
              >
                <picture
                  class="lozad m-0 h-auto w-[141px] lg:w-[200px]"
                  data-iesrc="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2019.png"
                  data-alt="Torch"
                  data-loaded="true"
                >
                  <source
                    srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2019.png"
                    type="image/png" >
                  <img src="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2019.png" alt="Torch"
                ></picture>
              </a>
            </div>
          </li>
          <li class="mt-5 flex flex-col items-center lg:mt-0">
            <div class="badge badge_google">
              <picture
                class="lozad m-0 h-auto w-[100px] lg:w-[140px]"
                data-iesrc="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/bbb-mobile.png"
                data-alt="Torch"
                data-loaded="true"
              >
                <source
                  srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/bbb-mobile.png"
                  type="image/png"
                >
                <img
                  class="m-0 h-auto w-[140px] lg:w-[200px]"
                  src="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/bbb-mobile.png"
                  alt="Torch"
                >
              </picture>
            </div>
          </li>
        </ul>
      </div>
      <div class="pt-5 text-xl md:text-center xl:text-2xl">
        <h5 class="mb-5 text-center text-3xl font-bold text-primary underline lg:hidden">Our promise:</h5>
        <p>
          <strong class="hidden lg:inline-block">Our Promise:</strong> Precision Tax Relief
          <strong>will never share or sell</strong> your information. Everything you discuss with us is
          <strong>completely confidential.</strong>
        </p>
      </div>
    </div>
  </div>
</template>
