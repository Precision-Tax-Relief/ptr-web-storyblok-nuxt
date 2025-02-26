<script setup lang="ts">
import { type PtrHeroStoryblok } from "~/types/component-types-sb"
import BBBTorchAwards from "~/components/svg/BBBTorchAwards.vue"

interface PropTypes {
  blok: PtrHeroStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div class="lg:pt-30 bg-slate-100 pb-10 pt-20 md:py-20 lg:mt-0">
    <div class="container mx-auto mt-28 pt-20">
      <div class="text-left leading-6 text-black lg:flex lg:flex-row lg:items-start lg:justify-between">
        <div class="px-0 pb-12 pt-0 text-left text-4xl text-black lg:py-0 lg:pl-0 lg:pr-[4.8rem] xl:pr-[6rem]">
          <div class="mb-8 lg:mx-auto lg:max-w-[82rem]">
            <h1 class="mb-12 text-center text-5xl font-bold tracking-wider text-primary lg:mb-10 xl:text-6xl">
              BBB Approved Tax Attorney
            </h1>
            <h3
              class="mx-auto my-0 text-center text-2xl font-normal leading-normal text-primary lg:text-3xl lg:leading-normal xl:text-3xl xl:leading-normal"
            >
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
              :imgAttrs="{
                class: 'm-2 w-full'
              }"
            />
            <figcaption
              class="text-pretty lg:leading-1 mx-5 block px-0 pb-0 pt-6 text-center text-[1.2rem] leading-normal text-[#666] md:mx-0 lg:px-0 lg:pb-0 lg:pt-2 lg:text-left xl:text-[1.6rem]"
            >
              <p>
                <strong>Precision Tax</strong>, under the leadership of Scott Gettis, Michele Mulkey, and Gene Haag,
                proudly maintains an <strong>A+ BBB</strong> rating and has been awarded the
                <strong>Torch Award for Ethics in 2019, 2023, and 2024.</strong>
              </p>
            </figcaption>
          </figure>
        </div>
        <div class="shrink-0 basis-auto lg:grow-0">
          <div id="main-form-slide" class="mx-auto">
            <div class="bg-secondary px-1 py-3 text-center font-bold text-white">
              <h3 class="m-0 py-2 text-center text-xl font-bold text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Set up your FREE Consultation
              </h3>
            </div>
            <div class="bg-white p-8 text-left leading-6 text-black sm:p-8 lg:p-6 xl:p-8">
              <div class="main-form" id="main-form">
                <form id="callbackForm" class="validate" method="post" action="/api/v2/lead">
                  <input type="hidden" id="abid_1" name="AbId1" value="763202" />
                  <input type="hidden" id="abid_2" name="AbId2" value="192811" />
                  <input type="hidden" id="abid_type" name="AbIdType" value="875839" />
                  <input type="hidden" id="abid_r" name="AbIdR" value="363831526" />
                  <input type="hidden" id="referrer" name="Referrer" value="" />
                  <input
                    type="hidden"
                    id="request_url"
                    name="RequestUrl"
                    value="https://taxattorney-bbb.org/kp1?device=c&amp;onhours=1"
                  />
                  <input type="hidden" name="TaxAmountId" value="14" />
                  <input
                    type="hidden"
                    id="anonymous_id"
                    name="AnonymousId"
                    value="755f4392-45bb-4569-9324-6489f888f56c"
                  />
                  <input type="hidden" id="ga_client_id" name="GaClientId" value="78236266.1740001216" />
                  <input type="hidden" id="iis_id" name="IisId" value="1a9430ec-ab96-2ba8-3500-2e2feb5a15fe.dd44e611" />
                  <h4
                    class="desktop mb-10 mt-2 text-center text-[1.3rem] font-bold leading-5 text-black lg:text-[1.3rem] xl:text-[1.6rem]"
                  >
                    Let us know how we can reach you.
                  </h4>
                  <div class="form-group mb-6">
                    <div class="input-group_icon input-group_icon-name relative">
                      <Icon
                        name="fa-solid:user-alt"
                        class="absolute left-4 top-1/2 h-8 w-8 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        class="form-control lg:h-lg h-16 w-full bg-slate-200 pl-16"
                        id="form-name"
                        name="Name"
                        placeholder="Full Name"
                      />
                      <div
                        class="error-message rounded-bl-1 absolute right-0 top-0 z-10 hidden bg-red-500 p-1 text-lg leading-5 text-white"
                      >
                        Required
                      </div>
                    </div>
                  </div>
                  <div class="form-group mb-6">
                    <div class="input-group_icon input-group_icon-phone relative">
                      <Icon
                        name="fa-solid:phone-alt"
                        class="absolute left-4 top-1/2 h-8 w-8 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        class="form-control lg:h-lg h-16 w-full bg-slate-200 pl-16"
                        minlength="14"
                        name="Phone"
                        id="PhoneNumber"
                        placeholder="Phone Number"
                      />
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
                        class="absolute left-4 top-1/2 h-8 w-8 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        class="form-control lg:h-lg h-16 w-full bg-slate-200 pl-16"
                        email=""
                        name="Email"
                        id="my-email"
                        type="email"
                        placeholder="Example@email.com"
                      />
                      <div
                        class="error-message rounded-bl-1 absolute right-0 top-0 z-10 hidden bg-red-500 p-1 text-lg leading-5 text-white"
                      >
                        Required
                      </div>
                    </div>
                  </div>
                  <button
                    class="m-0 block w-full cursor-pointer overflow-visible rounded-sm border-0 bg-green-500 px-1 py-4 text-center font-sans text-2xl font-bold normal-case tracking-wider text-white hover:bg-green-600 lg:rounded-md lg:py-6 xl:text-2xl"
                    id="btn-submit"
                    data-click-name="ClickForm - Submit"
                  >
                    Get My Free Consultation
                  </button>
                  <div class="form-summary mb-0 mb-2 mt-8 text-center">
                    <strong
                      class="text-center text-[2.2rem] leading-8 text-black lg:text-[1.7rem] xl:text-[2.2rem]"
                      style="font-weight: bolder"
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
                    type="image/png" />
                  <img src="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2023.png" alt="Torch"
                /></picture>
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
                    type="image/png" />
                  <img src="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2019.png" alt="Torch"
                /></picture>
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
                />
                <img
                  class="m-0 h-auto w-[140px] lg:w-[200px]"
                  src="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/bbb-mobile.png"
                  alt="Torch"
                />
              </picture>
            </div>
          </li>
        </ul>
      </div>
      <div class="container pt-5 text-2xl md:text-center xl:text-3xl">
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
