<script setup lang="ts">
import { ref, reactive } from "vue"

// Form fields type definition
interface FormData {
  name: string
  email: string
  message: string
  newsletter: boolean
}

// Form state
const formData = reactive<FormData>({
  name: "",
  email: "",
  message: "",
  newsletter: false
})

// Form state management
const isSubmitting = ref(false)
const isSuccess = ref(false)
const isError = ref(false)
const errorMessage = ref("")

// Form validation
const errors = reactive({
  name: "",
  email: "",
  message: ""
})

const validateForm = (): boolean => {
  let isValid = true

  // Reset errors
  errors.name = ""
  errors.email = ""
  errors.message = ""

  // Validate name
  if (!formData.name.trim()) {
    errors.name = "Name is required"
    isValid = false
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    errors.email = "Email is required"
    isValid = false
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email address"
    isValid = false
  }

  // Validate message
  if (!formData.message.trim()) {
    errors.message = "Message is required"
    isValid = false
  }

  return isValid
}

// Form submission
const submitForm = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  isSuccess.value = false
  isError.value = false
  errorMessage.value = ""

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Something went wrong")
    }

    // Reset form on success
    formData.name = ""
    formData.email = ""
    formData.message = ""
    formData.newsletter = false
    isSuccess.value = true
  } catch (error: any) {
    isError.value = true
    errorMessage.value = error.message || "Failed to submit form"
    console.error("Form submission error:", error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="contact-form">
    <form @submit.prevent="submitForm" class="w-full max-w-2xl mx-auto">
      <!-- Success message -->
      <div v-if="isSuccess" class="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
        <p>Thank you for your message! We'll get back to you soon.</p>
      </div>

      <!-- Error message -->
      <div v-if="isError" class="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
        <p>{{ errorMessage || "An error occurred. Please try again." }}</p>
      </div>

      <!-- Name field -->
      <div class="mb-6">
        <label for="name" class="block text-charcoal-700 font-medium mb-2">Name</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          class="w-full px-4 py-2 border border-charcoal-200 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          :class="{ 'border-red-500': errors.name }"
        />
        <p v-if="errors.name" class="mt-1 text-red-500 text-sm">{{ errors.name }}</p>
      </div>

      <!-- Email field -->
      <div class="mb-6">
        <label for="email" class="block text-charcoal-700 font-medium mb-2">Email</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          class="w-full px-4 py-2 border border-charcoal-200 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          :class="{ 'border-red-500': errors.email }"
        />
        <p v-if="errors.email" class="mt-1 text-red-500 text-sm">{{ errors.email }}</p>
      </div>

      <!-- Message field -->
      <div class="mb-6">
        <label for="message" class="block text-charcoal-700 font-medium mb-2">Message</label>
        <textarea
          id="message"
          v-model="formData.message"
          rows="5"
          class="w-full px-4 py-2 border border-charcoal-200 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          :class="{ 'border-red-500': errors.message }"
        ></textarea>
        <p v-if="errors.message" class="mt-1 text-red-500 text-sm">{{ errors.message }}</p>
      </div>

      <!-- Newsletter checkbox -->
      <div class="mb-6">
        <div class="flex items-center">
          <input
            id="newsletter"
            v-model="formData.newsletter"
            type="checkbox"
            class="h-4 w-4 text-primary focus:ring-primary border-charcoal-300 rounded"
          />
          <label for="newsletter" class="ml-2 block text-sm text-charcoal-700"> Subscribe to our newsletter </label>
        </div>
      </div>

      <!-- Submit button -->
      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-6 py-2 bg-primary hover:bg-primaryDark text-white rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          :class="{ 'opacity-70 cursor-not-allowed': isSubmitting }"
        >
          <span v-if="isSubmitting">Sending...</span>
          <span v-else>Send Message</span>
        </button>
      </div>
    </form>
  </div>
</template>
