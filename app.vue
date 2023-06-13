<script setup lang="ts">
import { onMounted } from 'vue'
import { loadStateStore } from '~/stores/loadState'
const loadStore = loadStateStore()

onMounted(() => {
  setTimeout(() => {
    loadStore.loadState = 'loaded'
  }, 1000)
})
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
