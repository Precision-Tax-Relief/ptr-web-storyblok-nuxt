<script setup lang="ts">
import { ref, computed } from 'vue';
import { useWindowSize } from '@vueuse/core'; // Optional, you can implement your own instead

const activeCompetitor = ref('optima'); // Default competitor for mobile view
const { width } = useWindowSize(); // For responsive design
const isDesktop = computed(() => width.value >= 1024); // Desktop breakpoint at 1024px

const competitors = {
  optima: {
    name: "OPTIMA TAX",
    bbbRating: "A+",
    bbbComplaints: "752",
    torchAward: "Yes",
    googleRating: "4.1",
    trustpilotRating: "4.3",
    experience: "2010",
    links: {
      bbb: "https://www.bbb.org/us/ca/santa-ana/profile/tax-return-preparation/optima-tax-relief-1126-100115586",
      google: "https://www.google.com/maps/place/Optima+Tax+Relief/",
      trustpilot: "https://www.trustpilot.com/review/optimataxrelief.com",
    },
  },
  taxDefense: {
    name: "TAX DEFENSE NETWORK",
    bbbRating: "A+",
    bbbComplaints: "191",
    torchAward: "No",
    googleRating: "4.0",
    trustpilotRating: "3.4",
    experience: "2007",
    links: {
      bbb: "https://www.bbb.org/us/fl/jacksonville/profile/tax-consultant/tax-defense-network-%E2%84%A2-0403-184747163",
      google: "https://www.google.com/maps/place/Tax+Defense+Network/",
      trustpilot: "https://www.trustpilot.com/review/taxdefensenetwork.com",
    },
  },
  anthem: {
    name: "ANTHEM TAX SERVICES",
    bbbRating: "A+",
    bbbComplaints: "76",
    torchAward: "No",
    googleRating: "4.3",
    trustpilotRating: "4.1",
    experience: "2010",
    links: {
      bbb: "https://www.bbb.org/us/ca/westlake-village/profile/tax-negotiators/anthem-tax-services-1236-92020364",
      google: "https://www.google.com/maps/place/Anthem+Tax+Services/",
      trustpilot: "https://www.trustpilot.com/review/anthemtaxservices.com",
    },
  },
};

function setCompetitor(competitor: string) {
  activeCompetitor.value = competitor;
}

// Fallback method if you don't want to use @vueuse/core
// You'd need to add window resize listener in onMounted and clean it up in onUnmounted
/*
const isDesktop = ref(window.innerWidth >= 1024);

function checkScreenSize() {
  isDesktop.value = window.innerWidth >= 1024;
}

onMounted(() => {
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
*/
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <h3 class="font-bold text-primary text-3xl px-4 lg:px-0 mb-5">
      Why Precision Tax Relief Is Trusted by the BBB Over Competitors
    </h3>

    <!-- Mobile View (Button Selector) -->
    <div v-if="!isDesktop" class="border-b-2 pb-1">
  <table class="w-full text-center">
    <thead class="text-sm text-white">
      <tr>
        <th class="bg-[#77A6E9] font-semibold text-left p-2 uppercase border-e border-white w-1/3">
          <span class="flex items-center gap-1">
            <Icon name="material-symbols-light:verified-outline" class="h-6 w-6" />
            <span>The Choice is Clear</span>
          </span>
        </th>
        <th class="w-1/3 bg-[#4A924D] font-semibold p-2 border-e border-white text-sm">
          PRECISION TAX
        </th>
        <th class="w-1/3 bg-gray-600 font-semibold p-2 border-e border-white text-sm">
          {{ competitors[activeCompetitor].name}}
        </th>
      </tr>
    </thead>
    <tbody class="text-base">
      <tr class="bg-white">
        <td class="p-2 text-left">BBB Rating</td>
        <td class="p-2">
          <span class="text-green-600 font-bold">A+</span>
        </td>
        <td class="p-2">
          <a :href="competitors[activeCompetitor].links.bbb" target="_blank" class="border-b border-gray-300">
            {{ competitors[activeCompetitor].bbbRating }}
          </a>
        </td>
      </tr>
      <!-- Other rows similar - change p-4 to p-2 -->
      <tr>
        <td class="p-2 text-left">BBB Complaints</td>
        <td class="p-2">
          <span class="text-green-600 font-bold">2</span>
        </td>
        <td class="p-2">
          {{ competitors[activeCompetitor].bbbComplaints }}
        </td>
      </tr>
      <tr class="bg-white">
        <td class="p-2 text-left">BBB Torch Award</td>
        <td class="p-2">
          <span class="text-green-600 font-bold">Yes</span>
        </td>
        <td class="p-2">
          {{ competitors[activeCompetitor].torchAward }}
        </td>
      </tr>
      <tr>
        <td class="p-2 text-left">Google Rating</td>
        <td class="p-2">
          <span class="text-green-600 font-bold">5.0</span>
        </td>
        <td class="p-2">
          <a :href="competitors[activeCompetitor].links.google" target="_blank" class="border-b border-gray-300">
            {{ competitors[activeCompetitor].googleRating }}
          </a>
        </td>
      </tr>
      <tr class="bg-white">
        <td class="p-2 text-left">Trustpilot Rating</td>
        <td class="p-2">
          <span class="text-green-600 font-bold">5.0</span>
        </td>
        <td class="p-2">
          <a :href="competitors[activeCompetitor].links.trustpilot" target="_blank" class="border-b border-gray-300">
            {{ competitors[activeCompetitor].trustpilotRating }}
          </a>
        </td>
      </tr>
      <tr>
        <td class="p-2 text-left">Experience</td>
        <td class="p-2">
          <span class="text-green-600 font-bold">1967</span>
        </td>
        <td class="p-2">
          {{ competitors[activeCompetitor].experience }}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex justify-center gap-2 my-2">
    <button v-for="(data, key) in competitors" :key="key" @click="setCompetitor(key)"
      class="px-2 py-1 text-xs text-white rounded-md transition"
      :class="activeCompetitor === key ? 'bg-blue-700' : 'bg-gray-500 hover:bg-gray-700'">
      {{ data.name }}
    </button>
  </div>
</div>

    <!-- Desktop View (All Competitors Side by Side) -->
    <div v-else class="border-b-2 pb-1">
      <table class="w-full text-center">
        <thead class="text-md text-white">
          <tr>
            <th class="bg-[#77A6E9] text-md font-semibold text-left p-3 uppercase border-e border-white">
              <span class="flex items-center gap-2">
                <Icon name="material-symbols-light:verified-outline" class="h-8 w-8" />
                <span>The Choice is Clear</span>
              </span>
            </th>
            <th class="bg-[#4A924D] text-md font-semibold p-3 border-e border-white">
              PRECISION TAX RELIEF
            </th>
            <th v-for="(data, key) in competitors" :key="key" class="bg-gray-600 text-md font-semibold p-3 border-e border-white">
              {{ data.name }}
            </th>
          </tr>
        </thead>
        <tbody class="text-lg">
          <tr class="bg-white">
            <td class="p-4 text-left">BBB Rating</td>
            <td class="p-4">
              <span class="text-green-600 font-bold">A+</span>
            </td>
            <td v-for="(data, key) in competitors" :key="key" class="p-4">
              <a :href="data.links.bbb" target="_blank" class="border-b-2 border-gray-300">
                {{ data.bbbRating }}
              </a>
            </td>
          </tr>
          <tr>
            <td class="p-4 text-left">BBB Complaints</td>
            <td class="p-4">
              <span class="text-green-600 font-bold">2</span>
            </td>
            <td v-for="(data, key) in competitors" :key="key" class="p-4">
              {{ data.bbbComplaints }}
            </td>
          </tr>
          <tr class="bg-white">
            <td class="p-4 text-left">BBB Torch Award</td>
            <td class="p-4">
              <span class="text-green-600 font-bold">Yes</span>
            </td>
            <td v-for="(data, key) in competitors" :key="key" class="p-4">
              {{ data.torchAward }}
            </td>
          </tr>
          <tr>
            <td class="p-4 text-left">Google Rating</td>
            <td class="p-4">
              <span class="text-green-600 font-bold">5.0</span>
            </td>
            <td v-for="(data, key) in competitors" :key="key" class="p-4">
              <a :href="data.links.google" target="_blank" class="border-b-2 border-gray-300">
                {{ data.googleRating }}
              </a>
            </td>
          </tr>
          <tr class="bg-white">
            <td class="p-4 text-left">Trustpilot Rating</td>
            <td class="p-4">
              <span class="text-green-600 font-bold">5.0</span>
            </td>
            <td v-for="(data, key) in competitors" :key="key" class="p-4">
              <a :href="data.links.trustpilot" target="_blank" class="border-b-2 border-gray-300">
                {{ data.trustpilotRating }}
              </a>
            </td>
          </tr>
          <tr>
            <td class="p-4 text-left">Experience</td>
            <td class="p-4">
              <span class="text-green-600 font-bold">1967</span>
            </td>
            <td v-for="(data, key) in competitors" :key="key" class="p-4">
              {{ data.experience }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>