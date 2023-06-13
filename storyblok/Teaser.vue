<template>
  <div v-editable="blok" class="py-32 text-center text-6xl font-bold text-[#50b0ae]">
    {{ blok.headline }}
  </div>
</template>

<script setup>
defineProps({ blok: Object })
</script>
