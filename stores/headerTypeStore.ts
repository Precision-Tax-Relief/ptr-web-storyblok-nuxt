import { defineStore } from "pinia"
import { ref } from "vue"
import type { Ref } from "vue"

type HeaderType = Ref<"default" | "overlay" | "">

export const headerTypeStore = defineStore("HeaderType", () => {
  const headerType: HeaderType = ref("")
  return { headerType }
})
