// composables/useContactFormPopUp.ts

import { ref } from "vue"

const showPopup = ref(false) // 🔁 shared reactive state

export const useContactFormPopUp = () => {
  const openPopup = () => {
    showPopup.value = true
  }

  const closePopup = () => {
    showPopup.value = false
  }

  return {
    showPopup,
    openPopup,
    closePopup
  }
}
