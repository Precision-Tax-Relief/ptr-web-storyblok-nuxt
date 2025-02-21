<script setup lang="ts">
provideHeadlessUseId(() => useId())
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
