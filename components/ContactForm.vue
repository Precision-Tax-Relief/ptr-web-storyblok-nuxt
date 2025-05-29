<script setup lang="ts">
import { ref, reactive } from "vue"
import type { ContactAnswerInput, ContactApiResponse, ContactPayload, ServerErrorResponse } from "#shared/types/api"
import { ContactApiResponseSchema, ContactFormSchema } from "#shared/utils/validators/contact"
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput"
import MazInput from "maz-ui/components/MazInput"
import { useLeadIdCookie } from "~/utils/cookies"

import { formatZodErrors } from "#shared/utils/validators/errorFormaters"

// Props for the component
interface Props {
  title?: string
  submitText?: string
  phoneNumber?: string
  apiEndpoint?: string
  showPhoneNumber?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: "Set up your FREE Consultation",
  submitText: "Get My Free Consultation",
  phoneNumber: "1-855-444-7551",
  apiEndpoint: "/api/contact",
  showPhoneNumber: true
})

// Form state
const formData = reactive<ContactAnswerInput>({
  name: "",
  email: "",
  phone: ""
})

// Form state management
const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref("")

// Form validation
let errors: { [key: string]: string | undefined } = reactive({})

const validateForm = (): boolean => {
  errors.name = undefined
  errors.email = undefined
  errors.phone = undefined

  const result = ContactFormSchema.safeParse(formData)

  if (!result.success) {
    let zodErrors = formatZodErrors<typeof errors>(result.error)
    console.log(zodErrors)
    errors.name = zodErrors?.name
    errors.email = zodErrors?.email
    errors.phone = zodErrors?.phone
    return false
  }
  return true
}

async function submitContactForm(data: ContactPayload): Promise<ContactApiResponse> {
  try {
    const response = await fetch(props.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const jsonResponse = await response.json()

    // Use safeParse instead of parse
    const result = ContactApiResponseSchema.safeParse(jsonResponse)

    if (result.data === undefined) throw new Error("Server returned empty response")

    return result.data
  } catch (error) {
    // Handle any other errors (network errors, etc.)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred"
    } satisfies ServerErrorResponse
  }
}

// Form submission
const submitForm = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  isSuccess.value = false
  errorMessage.value = ""

  const contextData = useContextData()
  const resp = await submitContactForm({ form: formData, context: contextData() })

  if (!resp.success) {
    if (resp?.errors?.form && typeof resp.errors.form !== "string") {
      errors = resp.errors.form
    } else {
      errorMessage.value = resp.message
    }
    isSubmitting.value = false
    return
  }

  isSuccess.value = true

  const router = useRouter()
  const leadIdCookie = useLeadIdCookie()
  leadIdCookie.value = resp.lead_id
  await router.push({ path: "questionnaire", query: { form_id: resp.lead_id } })
}
const route = useRoute()
</script>

<template>
  <div class="relative z-20 -mt-28 ml-auto pt-28 lg:block" id="contact">
    <div
      class="absolute inset-0 -z-10 mt-28 bg-primaryLight shadow-lg shadow-slate-300"
      :class="{ 'scale-[1.02]': route.hash === '#contact' }"
    />
    <div class="bg-secondary px-1 py-2 text-center font-bold text-white">
      <h3 class="m-0 py-1 text-center text-xl font-bold lg:text-xl">{{ title }}</h3>
    </div>
    <div class="bg-white px-4 py-6">
      <div id="main-form" class="main-form">
        <!-- Success message -->
        <div v-if="isSuccess" class="mb-6 rounded border-l-4 border-green-500 bg-green-100 p-4 text-green-700">
          <p>Thank you for your message!<br />We'll get back to you soon.</p>
        </div>

        <!-- Error message -->
        <div v-if="!!errorMessage" class="mb-6 rounded border-l-4 border-red-500 bg-red-100 p-4 text-red-700">
          <p>{{ errorMessage || "An error occurred. Please try again." }}</p>
        </div>
        <form onsubmit="return false" class="space-y-2">
          <!-- Name -->
          <div class="mb-2">
            <MazInput
              v-model="formData.name"
              label="Name"
              :assistive-text="errors.name"
              :block="true"
              :error="!!errors.name"
              class="mr-0"
              :size="'md'"
            >
              <template #left-icon>
                <Icon name="fa-solid:user-alt" class="h-5 w-5 text-gray-300" />
              </template>
            </MazInput>
          </div>

          <!-- Phone -->
          <div>
            <MazPhoneNumberInput
              class="w-full"
              v-model="formData.phone"
              country-code="US"
              show-code-on-list
              :preferred-countries="['US']"
              :error="!!errors.phone"
              :size="'md'"
              countrySelectorWidth="7.75rem"
              block
            />
          </div>

          <!-- Email -->
          <div class="pb-2">
            <MazInput
              v-model="formData.email"
              label="Email"
              :assistive-text="errors.email"
              :error="!!errors.email"
              :block="true"
              :size="'md'"
            >
              <template #left-icon>
                <Icon name="fa-solid:envelope" class="h-5 w-5 text-gray-300" />
              </template>
            </MazInput>
          </div>

          <!-- Submit -->
          <button
            id="btn-submit"
            @click.prevent="submitForm"
            class="w-full rounded bg-green-500 px-3 py-2 text-lg font-bold text-white hover:bg-green-600"
            :disabled="isSubmitting"
            :class="{ 'opacity-70': isSubmitting }"
            data-click-name="ClickForm - Submit"
          >
            <span v-if="isSubmitting">Sending...</span>
            <span v-else>{{ submitText }}</span>
          </button>
          <div class="mb-14">
            <p class="mb-4 mt-8 text-center text-sm font-bold text-black">
              <strong>A licensed tax professional</strong>&nbsp;will contact&nbsp;you within&nbsp;
              <strong>one business day</strong>
            </p>
          </div>
          <!-- Phone display -->

          <div v-if="showPhoneNumber" class="mt-12 text-center text-xl font-bold text-black">
            <div class="mt-8 text-2xl font-extrabold text-green-500">
              Or Call <b>{{ phoneNumber }}</b>
            </div>
          </div>
          <div v-else class="mt-12 text-center text-black"></div>
        </form>
      </div>
    </div>
  </div>
</template>
