<script setup lang="ts">
import { type QuestionnaireStoryblok } from "~/types/component-types-sb"
import { ref, computed } from "vue"

interface PropTypes {
  blok: QuestionnaireStoryblok
}

const questions = [
  {
    id: "Q1",
    text: "Are you currently self-employed?",
    tooltip: {
      title: "Why are we asking?",
      content:
        "To better assist you, please let us know if you are self-employed. This is a common situation for many clients who reach out to us."
    },
    type: "single_select",
    answers: [
      {
        id: "A1",
        text: "Yes"
      },
      {
        id: "A2",
        text: "No"
      },
      {
        id: "A3",
        text: "I prefer not to say"
      }
    ]
  },
  {
    id: "Q2",
    text: "How much do you owe to the IRS?",
    tooltip: {
      title: "Why are we asking?",
      content:
        "It's okay if you're not certain about the amount you owe the IRS. Just give us your best estimate and we'll figure it out during the call."
    },
    type: "single_select",
    answers: [
      {
        id: "A1",
        text: "$0 – $9,999"
      },
      {
        id: "A2",
        text: "$10,000 – $49,999"
      },
      {
        id: "A3",
        text: "$50,000 – $99,999"
      },
      {
        id: "A4",
        text: "$100,000 or more"
      },
      {
        id: "A5",
        text: "I don't know"
      },
      {
        id: "A6",
        text: "I prefer not to say"
      }
    ]
  },
  {
    id: "Q3",
    text: "Do any of the following apply to your situation?",
    tooltip: {
      content:
        "Check any issues that apply. Recognizing these give us a head start in finding the urgent tax resolutions you might need."
    },
    type: "multi_select",
    answers: [
      {
        id: "A1",
        text: "I have more than 3+ years of unfilled taxes"
      },
      {
        id: "A2",
        text: "My wages or bank account is being levied"
      },
      {
        id: "A3",
        text: "I've been contacted by a Revenue Officer"
      },
      {
        id: "A4",
        text: "I prefer not to say or none of these"
      }
    ]
  }
]

const props = defineProps<PropTypes>()

// Questionnaire state management
const currentStep = ref(0)
const userAnswers = ref<Record<string, string | string[]>>({})
const isCompleted = ref(false)

// Track selected answers for multi-select questions
const selectedMultiAnswers = ref<Record<string, boolean>>({})

// Computed properties
const currentQuestion = computed(() => {
  return currentStep.value < questions.length ? questions[currentStep.value] : null
})

// Method to select an answer for single-select questions
const selectSingleAnswer = (questionId: string, answerId: string, answerText: string) => {
  userAnswers.value[questionId] = answerText
  moveToNextStep()
}

// Method to handle multi-select questions
const toggleMultiAnswer = (questionId: string, answerId: string, answerText: string) => {
  // Initialize array if not exists
  if (!userAnswers.value[questionId]) {
    userAnswers.value[questionId] = []
  }

  // Toggle selection
  const answerArray = userAnswers.value[questionId] as string[]
  const index = answerArray.indexOf(answerText)

  if (index === -1) {
    answerArray.push(answerText)
  } else {
    answerArray.splice(index, 1)
  }

  // Update the tracking object for UI
  selectedMultiAnswers.value[`${questionId}-${answerId}`] = index === -1
}

// Method to submit multi-select answers and move to next step
const submitMultiAnswers = () => {
  moveToNextStep()
}

// Navigation methods
const moveToNextStep = () => {
  if (currentStep.value < questions.length - 1) {
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

const completeQuestionnaire = () => {
  isCompleted.value = true
  // Here you could add API calls to submit the data
}
</script>

<template>
  <div v-editable="props.blok">
    <div class="px-0 sm:px-4 md:px-8 py-16 mx-auto container text-center">
      <h1 class="text-3xl md:text-4xl text-primary font-bold">Thank you for trusting Precision Tax Relief!</h1>
      <p class="mt-4 text-xl md:text-2xl">
        In the next 2 minutes, you'll receive a text from us.<br />Please respond with the best time for us to reach
        you.
      </p>
    </div>
    <section class="container mx-auto">
      <div class="mx-auto max-w-4xl text-center bg-neutral-100 border border-primaryLight rounded-md p-8">
        <p class="text-xl mb-8">
          Our team of 50+ specialized experts includes CPAs, tax attorneys, and enrolled agents. To
          <b>save you time</b> and ensure you <b>get the most personalized solution,</b> answer 3 simple questions; it
          takes 30 seconds.
        </p>
        <div class="text-left">
          <div class="bg-primary p-3">
            <h3 class="text-white font-bold flex items-center gap-1 text-2xl">
              Question
              <span class="w-10 h-10 rounded-full bg-[#78A7E9] flex items-center justify-center">
                {{ currentStep + 1 }}
              </span>
              of 3
            </h3>
          </div>

          <div class="bg-slate-200 text-center">
            <!-- Questions Area -->

            <div v-if="!isCompleted" :key="currentStep">
              <div class="flex justify-center items-center relative text-slate-900">
                <h4 class="text-2xl font-bold px-2 py-10">{{ currentQuestion?.text }}</h4>
                <div class="flex justify-center" v-if="currentQuestion?.tooltip">
                  <div class="group has-tooltip flex justify-center">
                    <div
                      class="tooltip z-50 absolute left-0 bottom-20 md:left-auto rounded-md bg-white md:max-w-sm border border-black shadow-lg p-4 hidden group-hover:block"
                    >
                      <p
                        v-if="currentQuestion.tooltip.title"
                        class="text-blue-800 text-left text-lg tracking-wide font-bold pb-2"
                      >
                        {{ currentQuestion.tooltip.title }}
                      </p>
                      <p class="text-left">
                        {{ currentQuestion.tooltip.content }}
                      </p>
                    </div>
                    <span>
                      <Icon name="mdi:question-mark-circle-outline" class="text-lg" />
                    </span>
                  </div>
                </div>
              </div>

              <!-- Single Select Answers -->
              <div v-if="currentQuestion?.type === 'single_select'" class="mx-auto mb-8">
                <div class="grid grid-cols-2 justify-center gap-6 max-w-2xl mx-auto px-4">
                  <button
                    v-for="(answer, index) in currentQuestion.answers"
                    :key="answer.id"
                    :class="[
                      'text-lg lg:text-2xl py-4 lg:py-5 bg-white  hover:bg-primaryDark hover:text-white border border-gray-300 rounded-lg transition-colors',
                      'col-span-2',
                      {
                        'sm:col-span-2':
                          index === currentQuestion.answers.length - 1 && currentQuestion.answers.length % 2 === 1
                      },
                      {
                        'sm:col-span-1': !(
                          index === currentQuestion.answers.length - 1 && currentQuestion.answers.length % 2 === 1
                        )
                      }
                    ]"
                    @click="selectSingleAnswer(currentQuestion.id, answer.id, answer.text)"
                  >
                    {{ answer.text }}
                  </button>
                </div>
              </div>

              <!-- Multi Select Answers -->
              <div v-if="currentQuestion?.type === 'multi_select'" class="mx-auto mb-8">
                <div class="grid grid-cols-1 justify-center gap-4 max-w-2xl mx-auto px-4">
                  <button
                    v-for="answer in currentQuestion.answers"
                    :key="answer.id"
                    class="text-left p-4 border rounded-lg transition-colors flex items-center"
                    :class="[
                      selectedMultiAnswers[`${currentQuestion.id}-${answer.id}`]
                        ? 'bg-primary bg-opacity-10 border-primary'
                        : 'bg-white border-gray-300'
                    ]"
                    @click="toggleMultiAnswer(currentQuestion.id, answer.id, answer.text)"
                  >
                    <div
                      class="w-6 h-6 border rounded mr-4 flex items-center justify-center"
                      :class="[
                        selectedMultiAnswers[`${currentQuestion.id}-${answer.id}`]
                          ? 'bg-primary border-primary'
                          : 'border-gray-400'
                      ]"
                    >
                      <Icon
                        v-if="selectedMultiAnswers[`${currentQuestion.id}-${answer.id}`]"
                        name="mdi:check"
                        class="text-white"
                      />
                    </div>
                    {{ answer.text }}
                  </button>
                </div>

                <!-- Continue button for multi-select -->
                <div class="flex justify-center mt-6">
                  <button
                    class="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    @click="submitMultiAnswers"
                  >
                    Continue
                  </button>
                </div>
              </div>

              <!-- Navigation buttons -->
              <div class="flex justify-between px-8 py-4" v-if="currentStep > 0">
                <button class="text-primary underline" @click="moveToPrevStep">Back</button>
                <div></div>
                <!-- Spacer -->
              </div>
            </div>

            <!-- Thank You / Completion Screen -->
            <div v-else class="py-8">
              <div class="w-[90%] md:w-auto mx-auto text-center py-8 max-w-xl px-4 sm:px-8 mx-auto">
                <div class="flex justify-center mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66" fill="none">
                    <path
                      d="M63.7272 2.27313C63.0202 1.56601 62.1376 1.06009 61.1702 0.807478C60.2028 0.554867 59.1855 0.564693 58.2231 0.835944L58.1612 0.855631L4.18653 17.2188C3.09021 17.5366 2.11655 18.1805 1.39486 19.0649C0.67317 19.9493 0.237619 21.0323 0.146059 22.1701C0.0544981 23.3079 0.311261 24.4466 0.882243 25.435C1.45323 26.4234 2.3114 27.2147 3.34278 27.7038L27.0578 38.9538L38.3078 62.6688C38.7568 63.6321 39.4721 64.4468 40.3691 65.0169C41.2661 65.587 42.3074 65.8887 43.3703 65.8863C43.5306 65.8863 43.6937 65.8863 43.8568 65.8666C44.9937 65.7759 46.0755 65.3388 46.9561 64.6141C47.8367 63.8893 48.4738 62.9119 48.7815 61.8138L65.1447 7.83907C65.1529 7.81901 65.1595 7.79832 65.1643 7.77719C65.4356 6.81482 65.4454 5.79753 65.1928 4.83009C64.9402 3.86266 64.4343 2.98004 63.7272 2.27313ZM43.1565 57.1338L33.6728 37.1116L46.3993 24.385C47.0334 23.751 47.3896 22.891 47.3896 21.9944C47.3896 21.0977 47.0334 20.2378 46.3993 19.6038C45.7653 18.9697 44.9054 18.6135 44.0087 18.6135C43.1121 18.6135 42.2521 18.9697 41.6181 19.6038L28.8915 32.3303L8.86653 22.8438L58.0628 7.93751L43.1565 57.1338Z"
                      fill="#093E8A"
                    ></path>
                  </svg>
                </div>
                <h4 class="text-2xl leading-8 my-8 font-bold">Thank you for answering.</h4>
                <p class="text-lg lg:text-xl leading-7 lg:leading-8">
                  This information will be used to assign you to the right tax specialist for your situation. If you
                  haven't already, <b> please respond to our text with the best time for us to reach you,</b> or call us
                  now at <b>(877) 686-6539,</b> and speak with someone immediately.
                </p>
              </div>
            </div>

            <div class="flex py-6 mx-auto items-start justify-center gap-2 md:px-16">
              <Icon name="mdi:shield-account" class="w-12 h-12 shrink-0 text-slate-600" />
              <p class="text-center text-slate-800">
                Your data is completely confidential. We will NEVER share your answers with 3rd parties. Please read our
                <a class="underline decoration-1 decoration-black/50 open-privacy-modal" href="#">Privacy Policy</a>
                for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
