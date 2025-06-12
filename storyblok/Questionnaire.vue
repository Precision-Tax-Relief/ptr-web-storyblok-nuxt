<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { TransitionRoot } from "@headlessui/vue"
import type { QuestionnairePayloadInput, QuestionnaireAnswerInput } from "#shared/types/api"
import { useLeadIdCookie } from "~/utils/cookies"

interface PropTypes {
  blok: QuestionnaireStoryblok
}

const props = defineProps<PropTypes>()

// Questionnaire state management
const isValid = ref(false) // Default to false until validated
const currentStep = ref(0)
const userAnswers = ref<QuestionnaireAnswerInput>({
  "3_plus_unfiled": false,
  levied: false,
  contacted_by_ro: false,
  "self-employed": "undefined",
  owe_irs: "7",
  lead_id: ""
})
const isCompleted = ref(false)
const isLoading = ref(true) // Start with loading state
const hasError = ref(false)
const errorMessage = ref("")

// Height management for smooth transitions
const containerHeight = ref(500) // Default minimum height
const q1Ref = ref<HTMLElement | null>(null)
const q2Ref = ref<HTMLElement | null>(null)
const q3Ref = ref<HTMLElement | null>(null)
const loadingRef = ref<HTMLElement | null>(null)
const errorRef = ref<HTMLElement | null>(null)
const completedRef = ref<HTMLElement | null>(null)
const invalidRef = ref<HTMLElement | null>(null)

// Track selected answers for multi-select questions
const selectedMultiAnswers = ref<Record<string, boolean>>({
  "your_situation-3_plus_unfiled": false,
  "your_situation-levied": false,
  "your_situation-contacted_by_ro": false,
  "your_situation-no_answer": false
})

// Method to select an answer for single-select questions
const selectSingleAnswer = (questionId: string, answerId: string | number) => {
  userAnswers.value[questionId] = answerId
  moveToNextStep()
}

// Method to handle multi-select questions
const toggleMultiAnswer = (questionId: string, answerId: string) => {
  // If "no_answer" is selected, deselect all other options
  if (answerId === "no_answer") {
    // Set all options to false
    userAnswers.value["3_plus_unfiled"] = false
    userAnswers.value["levied"] = false
    userAnswers.value["contacted_by_ro"] = false

    selectedMultiAnswers.value["your_situation-3_plus_unfiled"] = false
    selectedMultiAnswers.value["your_situation-levied"] = false
    selectedMultiAnswers.value["your_situation-contacted_by_ro"] = false

    // Toggle the no_answer visual selection for UI purposes only
    selectedMultiAnswers.value[`${questionId}-${answerId}`] = !selectedMultiAnswers.value[`${questionId}-${answerId}`]
    return
  }

  // Deselect "no_answer" if any other option is selected
  selectedMultiAnswers.value[`${questionId}-no_answer`] = false

  // Toggle the current answer
  userAnswers.value[answerId] = !userAnswers.value[answerId]
  selectedMultiAnswers.value[`${questionId}-${answerId}`] = userAnswers.value[answerId]
}

// Method to submit multi-select answers and move to next step
const submitMultiAnswers = () => {
  moveToNextStep()
}

// Navigation methods
const moveToNextStep = () => {
  if (currentStep.value < 2) {
    // 3 questions (0-indexed)
    currentStep.value++
  } else {
    completeQuestionnaire()
  }
}

const moveToPrevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submitQuestionnaire = async (data: QuestionnairePayloadInput) => {
  isLoading.value = true
  hasError.value = false
  errorMessage.value = ""

  try {
    const response = await fetch("/api/questionnaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Something went wrong")
    }

    useLeadIdCookie().value = null
  } catch (error: any) {
    hasError.value = true
    errorMessage.value = error.message || "Failed to submit form"
    console.error("Form submission error:", error)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
}

const completeQuestionnaire = async () => {
  isCompleted.value = true

  await submitQuestionnaire({
    form: userAnswers.value,
    context: useContextData()()
  })
}

// Function to update container height based on current view
const updateContainerHeight = () => {
  let currentHeight = 500 // Default minimum height

  if (isLoading.value && loadingRef.value) {
    currentHeight = loadingRef.value.scrollHeight + 20
  } else if (!isValid.value && invalidRef.value) {
    currentHeight = invalidRef.value.scrollHeight + 20
  } else if (hasError.value && errorRef.value) {
    currentHeight = errorRef.value.scrollHeight + 20
  } else if (isCompleted.value && completedRef.value) {
    currentHeight = completedRef.value.scrollHeight + 20
  } else if (currentStep.value === 0 && q1Ref.value) {
    currentHeight = q1Ref.value.scrollHeight + 60 // Added extra padding for back button
  } else if (currentStep.value === 1 && q2Ref.value) {
    currentHeight = q2Ref.value.scrollHeight + 60 // Added extra padding for back button
  } else if (currentStep.value === 2 && q3Ref.value) {
    currentHeight = q3Ref.value.scrollHeight + 60 // Added extra padding for back button
  }

  containerHeight.value = Math.max(currentHeight, 500)
}

// Watch for changes that would affect container height
watch([currentStep, isLoading, isValid, isCompleted, hasError], () => {
  // Longer delay to ensure DOM has updated
  setTimeout(updateContainerHeight, 200)
})

// Watch for changes that would affect container height
watch([currentStep, isLoading, isValid, isCompleted, hasError], () => {
  // Small delay to ensure DOM has updated
  setTimeout(updateContainerHeight, 50)
})

onMounted(() => {
  let lead_id = useLeadIdCookie().value
  const route = useRoute()
  let q_lead_id = route.query.form_id
  if (typeof q_lead_id !== "string") {
    throw new Error("Invalid or missing form_id parameter")
  }
  userAnswers.value.lead_id = q_lead_id

  // Validate lead_id after a short delay to simulate checking
  setTimeout(() => {
    isValid.value = q_lead_id === lead_id
    isLoading.value = false

    // Update container height after state changes
    setTimeout(updateContainerHeight, 300)
  }, 500)

  // Initial height calculation
  window.addEventListener("resize", updateContainerHeight)

  // Run height calculation after initial render
  setTimeout(updateContainerHeight, 300)
})
</script>

<template>
  <div v-editable="props.blok" class="py-16">
    <div class="container mx-auto pb-16 text-center sm:px-4 md:px-8">
      <h1 class="text-3xl font-bold text-primary md:text-4xl">Thank you for trusting Precision Tax Relief!</h1>
      <p class="mt-4 text-xl md:text-2xl">
        In the next 2 minutes, you'll receive a text from us.<br />Please respond with the best time for us to reach
        you.
      </p>
    </div>

    <section class="container mx-auto bg-neutral-100 px-0 md:bg-white md:py-8">
      <div
        class="mx-auto max-w-4xl border-y border-primaryLight bg-neutral-100 py-6 text-center md:rounded-md md:border md:p-8"
      >
        <p class="mb-8 px-6 text-xl md:px-0">
          Our team of 50+ specialized experts includes CPAs, tax attorneys, and enrolled agents. To
          <b>save you time</b> and ensure you <b>get the most personalized solution,</b> answer 3 simple questions; it
          takes 30 seconds.
        </p>

        <!-- Main component with state transitions -->
        <TransitionRoot
          appear
          :show="true"
          enter="transition-opacity duration-200"
          enter-from="opacity-0"
          enter-to="opacity-100"
        >
          <div
            class="relative bg-slate-200 text-left"
            :style="{ height: `${containerHeight}px`, transition: 'height 0.3s ease' }"
          >
            <!-- Loading state -->
            <TransitionRoot :show="isLoading && !isCompleted">
              <div class="bg-primary p-3">
                <h3 class="flex items-center gap-1 text-2xl font-bold text-white">Loading your questionnaire...</h3>
              </div>
              <div ref="loadingRef" class="py-8 text-center text-neutral-800">
                <div class="mt-4 flex justify-center">
                  <Icon name="eos-icons:three-dots-loading" class="h-24 w-24 py-32 text-slate-500" />
                </div>
              </div>
            </TransitionRoot>

            <!-- Invalid lead_id state -->
            <TransitionRoot
              :show="!isLoading && !isValid"
              enter="transition-opacity duration-200 delay-200"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity duration-200"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="z-10 w-full bg-primary p-3">
                <h3 class="flex items-center gap-1 text-2xl font-bold text-white">Questionnaire Unavailable</h3>
              </div>
              <div class="bg-slate-200 py-8 text-center text-neutral-800">
                <div class="mt-4 flex justify-center">
                  <Icon name="mdi:alert-circle" class="h-20 w-20 text-red-600" />
                </div>
                <h4 class="my-8 text-2xl font-bold leading-8">This questionnaire is no longer available.</h4>
                <p class="text-lg leading-7 lg:text-xl lg:leading-8">
                  It appears that this form has either already been submitted or the link is invalid. For immediate
                  assistance, please
                  <InvocaPhoneTrackingLink class="font-bold">
                    call us directly at (855) 444-7551
                  </InvocaPhoneTrackingLink>
                  to speak with a tax specialist who can help with your situation.
                </p>
              </div>
            </TransitionRoot>

            <!-- Active questionnaire -->
            <TransitionRoot
              :show="!isLoading && isValid && !isCompleted && !hasError"
              enter="transition-opacity duration-200 delay-200"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity duration-200"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="z-10 w-full bg-primary p-3">
                <h3 class="flex items-center gap-1 text-2xl font-bold text-white">
                  Question
                  <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#78A7E9]">
                    {{ currentStep + 1 }}
                  </span>
                  of 3
                </h3>
              </div>

              <!-- Questions Area -->
              <div class="relative text-center text-neutral-800">
                <!-- Question 1: Self-employed -->
                <TransitionRoot
                  :show="currentStep === 0"
                  enter="transition ease-out duration-200 delay-200"
                  enter-from="transform opacity-0 translate-y-4"
                  enter-to="transform opacity-100 translate-y-0"
                  leave="transition ease-in duration-200"
                  leave-from="transform opacity-100 translate-y-0"
                  leave-to="transform opacity-0 translate-y-4"
                >
                  <div ref="q1Ref" class="absolute inset-0 px-4 py-6">
                    <div class="relative flex items-center justify-center text-slate-900">
                      <h4 class="px-2 py-10 text-2xl font-bold">Are you currently self-employed?</h4>
                      <div class="flex justify-center">
                        <div class="has-tooltip group flex justify-center">
                          <div
                            class="tooltip absolute bottom-20 left-0 z-50 hidden rounded-md border border-black bg-white p-4 shadow-lg group-hover:block md:left-auto md:max-w-sm"
                          >
                            <p class="pb-2 text-left text-lg font-bold tracking-wide text-blue-800">
                              Why are we asking?
                            </p>
                            <p class="text-left">
                              To better assist you, please let us know if you are self-employed. This is a common
                              situation for many clients who reach out to us.
                            </p>
                          </div>
                          <span>
                            <Icon name="mdi:question-mark-circle-outline" class="text-lg" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Single Select Answers -->
                    <div class="mx-auto mb-8">
                      <div class="mx-auto grid max-w-2xl grid-cols-2 justify-center gap-6 px-4">
                        <button
                          class="col-span-2 rounded-lg border border-gray-300 bg-white py-4 text-lg transition-colors hover:bg-primaryDark hover:text-white sm:col-span-1 lg:py-5 lg:text-2xl"
                          @click="selectSingleAnswer('self-employed', 'true')"
                        >
                          Yes
                        </button>
                        <button
                          class="col-span-2 rounded-lg border border-gray-300 bg-white py-4 text-lg transition-colors hover:bg-primaryDark hover:text-white sm:col-span-1 lg:py-5 lg:text-2xl"
                          @click="selectSingleAnswer('self-employed', 'false')"
                        >
                          No
                        </button>
                        <button
                          class="col-span-2 rounded-lg border border-gray-300 bg-white py-4 text-lg transition-colors hover:bg-primaryDark hover:text-white lg:py-5 lg:text-2xl"
                          @click="selectSingleAnswer('self-employed', 'undefined')"
                        >
                          I prefer not to say
                        </button>
                      </div>
                    </div>
                  </div>
                </TransitionRoot>

                <!-- Question 2: Owe IRS -->
                <TransitionRoot
                  :show="currentStep === 1"
                  enter="transition ease-out duration-200 delay-200"
                  enter-from="transform opacity-0 translate-y-4"
                  enter-to="transform opacity-100 translate-y-0"
                  leave="transition ease-in duration-200"
                  leave-from="transform opacity-100 translate-y-0"
                  leave-to="transform opacity-0 translate-y-4"
                >
                  <div ref="q2Ref" class="absolute inset-0 px-4 py-6">
                    <div class="relative flex items-center justify-center text-slate-900">
                      <h4 class="px-2 py-10 text-2xl font-bold">How much do you owe to the IRS?</h4>
                      <div class="flex justify-center">
                        <div class="has-tooltip group flex justify-center">
                          <div
                            class="tooltip absolute bottom-20 left-0 z-50 hidden rounded-md border border-black bg-white p-4 shadow-lg group-hover:block md:left-auto md:max-w-sm"
                          >
                            <p class="pb-2 text-left text-lg font-bold tracking-wide text-blue-800">
                              Why are we asking?
                            </p>
                            <p class="text-left">
                              It's okay if you're not certain about the amount you owe the IRS. Just give us your best
                              estimate and we'll figure it out during the call.
                            </p>
                          </div>
                          <span>
                            <Icon name="mdi:question-mark-circle-outline" class="text-lg" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Single Select Answers -->
                    <div class="mx-auto mb-8">
                      <div class="mx-auto grid max-w-2xl grid-cols-2 justify-center gap-6 px-4">
                        <button
                          class="col-span-2 rounded-lg border border-gray-300 bg-white py-4 text-lg transition-colors hover:bg-primaryDark hover:text-white sm:col-span-1 lg:py-5 lg:text-2xl"
                          @click="selectSingleAnswer('owe_irs', '1')"
                        >
                          $0 – $9,999
                        </button>
                        <button
                          class="col-span-2 rounded-lg border border-gray-300 bg-white py-4 text-lg transition-colors hover:bg-primaryDark hover:text-white sm:col-span-1 lg:py-5 lg:text-2xl"
                          @click="selectSingleAnswer('owe_irs', '2')"
                        >
                          $10,000 – $49,999
                        </button>
                        <button
                          class="col-span-2 rounded-lg border border-gray-300 bg-white py-4 text-lg transition-colors hover:bg-primaryDark hover:text-white sm:col-span-1 lg:py-5 lg:text-2xl"
                          @click="selectSingleAnswer('owe_irs', '3')"
                        >
                          $50,000 – $99,999
                        </button>
                        <button
                          class="col-span-2 rounded-lg border border-gray-300 bg-white py-4 text-lg transition-colors hover:bg-primaryDark hover:text-white sm:col-span-1 lg:py-5 lg:text-2xl"
                          @click="selectSingleAnswer('owe_irs', '4')"
                        >
                          $100,000 or more
                        </button>
                        <button
                          class="col-span-2 rounded-lg border border-gray-300 bg-white py-4 text-lg transition-colors hover:bg-primaryDark hover:text-white sm:col-span-1 lg:py-5 lg:text-2xl"
                          @click="selectSingleAnswer('owe_irs', '5')"
                        >
                          I don't know
                        </button>
                        <button
                          class="col-span-2 rounded-lg border border-gray-300 bg-white py-4 text-lg transition-colors hover:bg-primaryDark hover:text-white sm:col-span-1 lg:py-5 lg:text-2xl"
                          @click="selectSingleAnswer('owe_irs', '6')"
                        >
                          I prefer not to say
                        </button>
                      </div>
                    </div>

                    <!-- Navigation buttons -->
                    <div class="mt-auto flex justify-between px-8 py-4">
                      <button class="text-primary underline" @click="moveToPrevStep">Back</button>
                    </div>
                  </div>
                </TransitionRoot>

                <!-- Question 3: Your situation (Multi-select) -->
                <TransitionRoot
                  :show="currentStep === 2"
                  enter="transition ease-out duration-200 delay-200"
                  enter-from="transform opacity-0 translate-y-4"
                  enter-to="transform opacity-100 translate-y-0"
                  leave="transition ease-in duration-200"
                  leave-from="transform opacity-100 translate-y-0"
                  leave-to="transform opacity-0 translate-y-4"
                >
                  <div ref="q3Ref" class="absolute inset-0 px-4 py-6">
                    <div class="relative flex items-center justify-center text-slate-900">
                      <h4 class="px-2 py-10 text-2xl font-bold">Do any of the following apply to your situation?</h4>
                      <div class="flex justify-center">
                        <div class="has-tooltip group flex justify-center">
                          <div
                            class="tooltip absolute bottom-20 left-0 z-50 hidden rounded-md border border-black bg-white p-4 shadow-lg group-hover:block md:left-auto md:max-w-sm"
                          >
                            <p class="text-left">
                              Check any issues that apply. Recognizing these give us a head start in finding the urgent
                              tax resolutions you might need.
                            </p>
                          </div>
                          <span>
                            <Icon name="mdi:question-mark-circle-outline" class="text-lg" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Multi Select Answers -->
                    <div class="mx-auto mb-8">
                      <div class="mx-auto grid max-w-2xl grid-cols-1 justify-center gap-4 px-4">
                        <button
                          class="flex items-center rounded-lg border p-4 text-left transition-colors"
                          :class="[
                            selectedMultiAnswers['your_situation-3_plus_unfiled']
                              ? 'border-primary bg-primary bg-opacity-10'
                              : 'border-gray-300 bg-white'
                          ]"
                          @click="toggleMultiAnswer('your_situation', '3_plus_unfiled')"
                        >
                          <div
                            class="mr-4 flex h-6 w-6 items-center justify-center rounded border"
                            :class="[
                              selectedMultiAnswers['your_situation-3_plus_unfiled']
                                ? 'border-primary bg-primary'
                                : 'border-gray-400'
                            ]"
                          >
                            <Icon
                              v-if="selectedMultiAnswers['your_situation-3_plus_unfiled']"
                              name="mdi:check"
                              class="text-white"
                            />
                          </div>
                          I have more than 3+ years of unfiled taxes
                        </button>
                        <button
                          class="flex items-center rounded-lg border p-4 text-left transition-colors"
                          :class="[
                            selectedMultiAnswers['your_situation-levied']
                              ? 'border-primary bg-primary bg-opacity-10'
                              : 'border-gray-300 bg-white'
                          ]"
                          @click="toggleMultiAnswer('your_situation', 'levied')"
                        >
                          <div
                            class="mr-4 flex h-6 w-6 items-center justify-center rounded border"
                            :class="[
                              selectedMultiAnswers['your_situation-levied']
                                ? 'border-primary bg-primary'
                                : 'border-gray-400'
                            ]"
                          >
                            <Icon
                              v-if="selectedMultiAnswers['your_situation-levied']"
                              name="mdi:check"
                              class="text-white"
                            />
                          </div>
                          My wages or bank account is being levied
                        </button>
                        <button
                          class="flex items-center rounded-lg border p-4 text-left transition-colors"
                          :class="[
                            selectedMultiAnswers['your_situation-contacted_by_ro']
                              ? 'border-primary bg-primary bg-opacity-10'
                              : 'border-gray-300 bg-white'
                          ]"
                          @click="toggleMultiAnswer('your_situation', 'contacted_by_ro')"
                        >
                          <div
                            class="mr-4 flex h-6 w-6 items-center justify-center rounded border"
                            :class="[
                              selectedMultiAnswers['your_situation-contacted_by_ro']
                                ? 'border-primary bg-primary'
                                : 'border-gray-400'
                            ]"
                          >
                            <Icon
                              v-if="selectedMultiAnswers['your_situation-contacted_by_ro']"
                              name="mdi:check"
                              class="text-white"
                            />
                          </div>
                          I've been contacted by a Revenue Officer
                        </button>
                        <button
                          class="flex items-center rounded-lg border p-4 text-left transition-colors"
                          :class="[
                            selectedMultiAnswers['your_situation-no_answer']
                              ? 'border-primary bg-primary bg-opacity-10'
                              : 'border-gray-300 bg-white'
                          ]"
                          @click="toggleMultiAnswer('your_situation', 'no_answer')"
                        >
                          <div
                            class="mr-4 flex h-6 w-6 items-center justify-center rounded border"
                            :class="[
                              selectedMultiAnswers['your_situation-no_answer']
                                ? 'border-primary bg-primary'
                                : 'border-gray-400'
                            ]"
                          >
                            <Icon
                              v-if="selectedMultiAnswers['your_situation-no_answer']"
                              name="mdi:check"
                              class="text-white"
                            />
                          </div>
                          I prefer not to say or none of these
                        </button>
                      </div>

                      <!-- Continue button for multi-select -->
                      <div class="mt-6 flex justify-center">
                        <button
                          class="hover:bg-primary-dark rounded-lg bg-primary px-8 py-3 text-white transition-colors"
                          @click="submitMultiAnswers"
                        >
                          Continue
                        </button>
                      </div>
                    </div>

                    <!-- Navigation buttons -->
                    <div class="mt-auto flex justify-between px-8 py-4">
                      <button class="text-primary underline" @click="moveToPrevStep">Back</button>
                    </div>
                  </div>
                </TransitionRoot>
              </div>
            </TransitionRoot>

            <!-- Submitting Screen-->
            <TransitionRoot
              :show="isLoading && isCompleted"
              enter="transition-opacity duration-200 delay-200"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity duration-200"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute z-10 w-full bg-primary p-3">
                <h3 class="flex items-center gap-1 text-2xl font-bold text-white">Submitting your responses...</h3>
              </div>
              <div ref="loadingRef" class="py-8 text-center text-neutral-800">
                <div class="mx-auto max-w-xl px-4 py-8 text-center sm:px-8">
                  <div class="mt-4 flex justify-center">
                    <Icon name="eos-icons:three-dots-loading" class="h-24 w-24 py-32 text-slate-500" />
                  </div>
                </div>
              </div>
            </TransitionRoot>

            <!-- Error Screen-->
            <TransitionRoot
              :show="hasError"
              enter="transition-opacity duration-200 delay-200"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity duration-200"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute z-10 w-full bg-primary p-3">
                <h3 class="flex items-center gap-1 text-2xl font-bold text-white">Error</h3>
              </div>
              <div ref="errorRef" class="py-8 text-center text-neutral-800">
                <div class="mx-auto max-w-xl px-4 py-8 text-center sm:px-8">
                  <div class="mt-4 flex justify-center">
                    <Icon name="ix:cloud-fail" class="h-20 w-20 text-black" />
                  </div>
                  <h4 class="my-8 text-2xl font-bold leading-8">Oops! Sorry something went wrong.</h4>
                  <p class="text-lg leading-7 lg:text-xl lg:leading-8">
                    We were unable to process your submission due to a technical issue. For immediate assistance, please
                    <InvocaPhoneTrackingLink class="font-bold">
                      call us directly at (855) 444-7551
                    </InvocaPhoneTrackingLink>
                    to speak with a tax specialist who can help with your situation. We apologize for the inconvenience.
                  </p>
                </div>
              </div>
            </TransitionRoot>

            <!-- Thank You / Completion Screen -->
            <TransitionRoot
              :show="isCompleted && !isLoading && !hasError"
              enter="transition-opacity duration-200 delay-250"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity duration-200"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute z-10 w-full bg-primary p-3">
                <h3 class="flex items-center gap-1 text-2xl font-bold text-white">Thank You</h3>
              </div>
              <div ref="completedRef" class="py-8 text-center text-neutral-800">
                <div class="mx-auto max-w-xl px-4 py-8 text-center sm:px-8">
                  <div class="mt-4 flex justify-center">
                    <Icon name="line-md:email-check" class="h-20 w-20 text-blue-700" />
                  </div>
                  <h4 class="my-8 text-2xl font-bold leading-8">Thank you for answering.</h4>
                  <p class="text-lg leading-7 lg:text-xl lg:leading-8">
                    This information will be used to assign you to the right tax specialist for your situation. If you
                    haven't already, <b> please respond to our text with the best time for us to reach you,</b> or call
                    us now at
                    <InvocaPhoneTrackingLink class="font-bold"> (855) 444-7551, </InvocaPhoneTrackingLink>
                    and speak with someone immediately.
                  </p>
                </div>
              </div>
            </TransitionRoot>
          </div>
        </TransitionRoot>

        <div class="mx-auto flex items-start justify-center gap-2 px-4 py-6 md:px-16">
          <Icon name="mdi:shield-account" class="h-12 w-12 shrink-0 text-slate-600" />
          <p class="text-center text-slate-800">
            Your data is completely confidential. We will NEVER share your answers with 3rd parties. Please read our
            <a class="open-privacy-modal underline decoration-black/50 decoration-1" href="#contact">Privacy Policy</a>
            for more information.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
