import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

type LoadState = Ref<'inital' | 'loaded'>

export const loadStateStore = defineStore('HeaderType', () => {
  const loadState: LoadState = ref('inital')
  return { loadState }
})
