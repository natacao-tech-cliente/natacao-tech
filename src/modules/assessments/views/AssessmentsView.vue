<script setup lang="ts">
import { ref } from "vue";
import BatchEvaluationWizard from "../components/BatchEvaluationWizard.vue";

// Componentes PrimeVue
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Card from "primevue/card";

// --- MOCKS (Dados Falsos para a Seleção) ---
const MOCK_CLASSES = [
  { name: "Segunda e Quarta - 09:00", code: "T1" },
  { name: "Terça e Quinta - 15:00", code: "T2" },
  { name: "Sábado - 10:00", code: "T3" },
];

const MOCK_LEVELS = [
  { name: "Acqua Baby (Touca Branca)", code: "baby" },
  { name: "Acqua Aprendizado (Touca Laranja)", code: "laranja" },
  { name: "Acqua Iniciante (Touca Vermelha)", code: "vermelha" },
  { name: "Acqua Expert (Touca Preta)", code: "expert" },
];

// --- ESTADO ---
const step = ref<"selection" | "wizard" | "success">("selection");
const selectedClass = ref();
const selectedLevel = ref();
const loading = ref(false);

// --- AÇÕES ---
function startEvaluation() {
  if (selectedClass.value && selectedLevel.value) {
    loading.value = true;
    // Simulando um "carregamento" dos alunos
    setTimeout(() => {
      loading.value = false;
      step.value = "wizard";
    }, 800);
  }
}

function handleWizardFinish(answers: any) {
  console.log("Respostas capturadas:", answers);
  // Aqui enviaríamos para o Supabase
  step.value = "success";
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div
      class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-800 tracking-tight">
          Avaliações
        </h1>
        <p class="text-gray-500">Gerencie o progresso dos alunos na piscina</p>
      </div>

      <Button
        v-if="step === 'wizard'"
        label="Cancelar Avaliação"
        icon="pi pi-times"
        severity="secondary"
        text
        @click="step = 'selection'"
      />
    </div>

    <transition name="fade" mode="out-in">
      <div
        v-if="step === 'selection'"
        class="grid md:grid-cols-2 gap-8 items-start"
      >
        <Card class="shadow-sm border border-gray-100">
          <template #title>Nova Avaliação em Lote</template>
          <template #subtitle>Selecione os parâmetros para começar</template>
          <template #content>
            <div class="space-y-6 mt-4">
              <div class="flex flex-col gap-2">
                <label class="font-bold text-gray-700">Selecione a Turma</label>
                <Dropdown
                  v-model="selectedClass"
                  :options="MOCK_CLASSES"
                  optionLabel="name"
                  placeholder="Ex: Terça e Quinta..."
                  class="w-full"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="font-bold text-gray-700"
                  >Metodologia / Nível</label
                >
                <Dropdown
                  v-model="selectedLevel"
                  :options="MOCK_LEVELS"
                  optionLabel="name"
                  placeholder="Ex: Acqua Expert"
                  class="w-full"
                />
                <small class="text-gray-500">
                  Isso carregará as perguntas específicas deste nível.
                </small>
              </div>

              <Button
                label="Iniciar Avaliação"
                icon="pi pi-play"
                class="w-full p-button-lg font-bold"
                :loading="loading"
                :disabled="!selectedClass || !selectedLevel"
                @click="startEvaluation"
              />
            </div>
          </template>
        </Card>

        <div class="hidden md:block bg-brand-50 rounded-2xl p-8 text-center">
          <div
            class="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-brand-500"
          >
            <i class="pi pi-check-circle text-5xl"></i>
          </div>
          <h3 class="text-xl font-bold text-brand-900 mb-2">
            Avaliação Rápida
          </h3>
          <p class="text-brand-700 leading-relaxed">
            Otimize seu tempo na piscina. Avalie até 10 alunos simultaneamente
            seguindo o fluxo de perguntas da metodologia Acqua Kids.
          </p>
        </div>
      </div>

      <div v-else-if="step === 'wizard'">
        <BatchEvaluationWizard @finish="handleWizardFinish" />
      </div>

      <div
        v-else-if="step === 'success'"
        class="text-center py-20 bg-white rounded-2xl border border-green-100 shadow-sm"
      >
        <div
          class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <i class="pi pi-check text-4xl font-bold"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-800">Avaliação Salva!</h2>
        <p class="text-gray-500 mb-8">
          Os dados foram registrados com sucesso.
        </p>
        <Button label="Voltar ao Início" @click="step = 'selection'" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
