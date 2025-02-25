<template>
  <div class="mt-28 mb-10">
    <h4 class="font-bold text-primary text-center md:text-left text-4xl md:text-7xl px-4 lg:px-0 mb-5">
      Our Recent Client Results:
    </h4>
    <div class="container mx-auto overflow-hidden lg:px-0 px-4">
      <ClientOnly>
        <swiper-container
          :init="true"
          class="pt-8 pb-8 lg:pb-16"
          slides-per-view="auto"
          :space-between="20"
          :speed="2500"
          :autoplay="{
            delay: 7000,
            disableOnInteraction: false
          }"
          loop
        >
          <swiper-slide v-for="(client, index) in clients" :key="index" class="w-auto max-w-md md:max-w-2xl">
            <div class="flex items-center">
              <div
                class="flex md:items-center shadow-md w-full bg-white rounded-lg justify-between py-6 px-7 md:flex-row flex-col gap-10 md:gap-0"
              >
                <div class="flex">
                  <figure>
                    <img :src="client.imageUrl" :alt="client.name" class="h-12 w-12" />
                  </figure>
                  <div class="user_title ml-5 flex flex-col justify-center">
                    <h4 class="font-bold text-3xl leading-tight mb-2">{{ client.name }}</h4>
                    <p class="text-neutral-400 text-2xl font-normal">{{ client.location }}</p>
                  </div>
                </div>
                <ul
                  class="flex flex-col md:flex-row md:items-center justify-between lg:gap-16 gap-6 font-bold ml-24 md:ml-0"
                >
                  <li class="flex sm:ml-16 lg:ml-0 gap-2">
                    <p class="text-rose-600">Owed:</p>
                    <p>${{ client.owed.toLocaleString() }}</p>
                  </li>
                  <li class="flex gap-2">
                    <p class="text-green-600">Paid:</p>
                    <p>${{ client.paid.toLocaleString() }}</p>
                  </li>
                  <li class="flex gap-2">
                    <p class="text-blue-800">Saved:</p>
                    <p>${{ client.saved.toLocaleString() }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
const containerRef = ref(null)

// Client data based on your HTML
const clients = ref([
  {
    name: "Matthew Renner",
    location: "Coeur D Alene, ID",
    imageUrl: "//prod-taxattorney-bbb.azureedge.net/assets/images/shared/testimonials/Matthew.jpg",
    owed: 43341,
    paid: 6973,
    saved: 36368
  },
  {
    name: "Saiyed Abidi",
    location: "Chicago, IL",
    imageUrl: "//prod-taxattorney-bbb.azureedge.net/assets/images/shared/testimonials/Saiyed.jpg",
    owed: 71453,
    paid: 7449,
    saved: 64004
  },
  {
    name: "Denise Champion",
    location: "Prosper, TX",
    imageUrl: "//prod-taxattorney-bbb.azureedge.net/assets/images/shared/testimonials/Denise.jpg",
    owed: 18484,
    paid: 100,
    saved: 18384
  },
  {
    name: "Joseph Smith",
    location: "Pensacola, FL",
    imageUrl: "//prod-taxattorney-bbb.azureedge.net/assets/images/shared/testimonials/Joseph.jpg",
    owed: 186310,
    paid: 568,
    saved: 185742
  },
  {
    name: "Carla Swann",
    location: "Canton, GA",
    imageUrl: "//prod-taxattorney-bbb.azureedge.net/assets/images/shared/testimonials/Carla.jpg",
    owed: 67258,
    paid: 100,
    saved: 67158
  },
  {
    name: "Ronald Fuller II",
    location: "Dunwoody, GA",
    imageUrl: "//prod-taxattorney-bbb.azureedge.net/assets/images/shared/testimonials/Ron.jpg",
    owed: 378537,
    paid: 200,
    saved: 378337
  },
  {
    name: "Bruce Toliver",
    location: "Dumfries, VA",
    imageUrl: "//prod-taxattorney-bbb.azureedge.net/assets/images/shared/testimonials/Bruce.jpg",
    owed: 325553,
    paid: 687,
    saved: 324866
  },
  {
    name: "James Spyropoulos",
    location: "Lincolnwood, IL",
    imageUrl: "//prod-taxattorney-bbb.azureedge.net/assets/images/shared/testimonials/James.jpg",
    owed: 545827,
    paid: 9900,
    saved: 535927
  },
  {
    name: "Karen Dura",
    location: "Menominee, MI",
    imageUrl: "//prod-taxattorney-bbb.azureedge.net/assets/images/shared/testimonials/Karen.jpg",
    owed: 15553,
    paid: 100,
    saved: 15453
  },
  {
    name: "Tiffany Pickle",
    location: "San Antonio, TX",
    imageUrl: "//prod-taxattorney-bbb.azureedge.net/assets/images/shared/testimonials/Tiffany.jpg",
    owed: 19064,
    paid: 1424,
    saved: 17640
  },
  {
    name: "Roxie Rose",
    location: "Sacramento, CA",
    imageUrl: "//prod-taxattorney-bbb.azureedge.net/assets/images/shared/testimonials/Roxie.jpg",
    owed: 43971,
    paid: 400,
    saved: 43471
  },
  {
    name: "Valeka Luckey",
    location: "Huntersville, NC",
    imageUrl: "//prod-taxattorney-bbb.azureedge.net/assets/images/shared/testimonials/Valeka.jpg",
    owed: 37167,
    paid: 500,
    saved: 36667
  }
])
</script>

<style>
swiper-slide {
  width: auto;
  transition-timing-function: linear;
}

swiper-container {
  overflow: visible;
}
</style>
