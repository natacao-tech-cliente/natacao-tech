<script setup lang="ts">
import { ref, computed } from 'vue'
import { MOCK_QUESTIONS, MOCK_STUDENTS_BATCH } from '../mocks/mockData'

const emit = defineEmits(['finish', 'cancel'])

const currentQuestionIndex = ref(0)
const answers = ref<Record<string, boolean>>({})

// Computados
const currentQuestion = computed(() => {
  return MOCK_QUESTIONS[currentQuestionIndex.value]
})

const isLastQuestion = computed(
  () => currentQuestionIndex.value === MOCK_QUESTIONS.length - 1
)

const progress = computed(
  () => ((currentQuestionIndex.value + 1) / MOCK_QUESTIONS.length) * 100
)

function nextStep() {
  if (!isLastQuestion.value) {
    currentQuestionIndex.value++
  } else {
    emit('finish', answers.value)
  }
}

function prevStep() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
  >
    <div class="h-2 bg-gray-100 w-full">
      <div
        class="h-full bg-brand-500 transition-all duration-300"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>

    <div v-if="currentQuestion" class="p-6">
      <div class="text-center mb-8">
        <span
          class="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full"
        >
          Pergunta {{ currentQuestionIndex + 1 }} de {{ MOCK_QUESTIONS.length }}
        </span>
        <h2
          class="text-2xl md:text-3xl font-bold text-gray-800 mt-4 leading-tight"
        >
          {{ currentQuestion.text }}
        </h2>
        <p class="text-gray-400 text-sm mt-2">
          Categoria: {{ currentQuestion.category }}
        </p>
      </div>

      <div class="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        <div
          v-for="student in MOCK_STUDENTS_BATCH"
          :key="student.id"
          class="flex items-center justify-between p-4 rounded-xl border transition-all duration-200"
          :class="
            answers[`${student.id}_${currentQuestion.id}`] !== undefined
              ? 'border-gray-200 bg-white'
              : 'border-orange-200 bg-orange-50'
          "
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm"
            >
              {{ student.name.substring(0, 2).toUpperCase() }}
            </div>
            <span class="font-bold text-gray-700">{{ student.name }}</span>
          </div>

          <div class="flex bg-gray-100 p-1 rounded-lg">
            <button
              @click="answers[`${student.id}_${currentQuestion.id}`] = false"
              class="px-4 py-2 rounded-md text-sm font-bold transition-all"
              :class="
                answers[`${student.id}_${currentQuestion.id}`] === false
                  ? 'bg-red-500 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              "
            >
              NÃO
            </button>
            <button
              @click="answers[`${student.id}_${currentQuestion.id}`] = true"
              class="px-4 py-2 rounded-md text-sm font-bold transition-all"
              :class="
                answers[`${student.id}_${currentQuestion.id}`] === true
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              "
            >
              SIM
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3"
    >
      <button
        v-if="currentQuestionIndex > 0"
        @click="prevStep"
        class="order-2 sm:order-1 w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-white transition-colors"
      >
        Voltar
      </button>

      <button
        @click="nextStep"
        class="order-1 sm:order-2 w-full sm:flex-1 py-3 rounded-xl bg-brand-600 text-white font-bold text-lg shadow-md hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <span>{{
          isLastQuestion ? 'Finalizar Avaliação' : 'Próxima Pergunta'
        }}</span>
        <i v-if="!isLastQuestion" class="pi pi-arrow-right"></i>
        <i v-else class="pi pi-check-circle"></i>
      </button>
    </div>
  </div>
</template>
