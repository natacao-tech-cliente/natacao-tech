<script setup lang="ts">
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";

// UI Components
import Select from "primevue/select";
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Tag from "primevue/tag";
import Dialog from "primevue/dialog";

const toast = useToast();

// --- MOCKS (Simulando o banco de dados) ---
const CLASSES = [
  { name: "Todas as Turmas", code: "all" },
  { name: "Segunda/Quarta - 09:00", code: "T1" },
  { name: "Terça/Quinta - 15:00", code: "T2" },
  { name: "Sábado - 10:00", code: "T3" },
];

const LEVELS = [
  { name: "Acqua Baby", code: "baby" },
  { name: "Touca Laranja", code: "laranja" },
  { name: "Touca Vermelha", code: "vermelha" },
  { name: "Touca Preta", code: "expert" },
];

const STUDENTS_DATA = [
  {
    id: "1",
    name: "Davi Rocha",
    class_code: "T1",
    level: "laranja",
    active: true,
    photo: null,
  },
  {
    id: "2",
    name: "Maria Silva",
    class_code: "T2",
    level: "vermelha",
    active: true,
    photo: null,
  },
  {
    id: "3",
    name: "João Pedro",
    class_code: "T1",
    level: "laranja",
    active: false,
    photo: null,
  },
  {
    id: "4",
    name: "Ana Clara",
    class_code: "T3",
    level: "baby",
    active: true,
    photo: null,
  },
  {
    id: "5",
    name: "Lucas Souza",
    class_code: "T2",
    level: "expert",
    active: true,
    photo: null,
  },
  {
    id: "6",
    name: "Beatriz Lima",
    class_code: "T1",
    level: "laranja",
    active: true,
    photo: null,
  },
];

// --- ESTADO ---
const selectedClass = ref(CLASSES[0]);
const searchQuery = ref("");
const students = ref(STUDENTS_DATA);

// Estado do Modal de Movimentação
const showMoveModal = ref(false);
const studentToMove = ref<any>(null);
const targetClass = ref();
const targetLevel = ref();

// --- FILTROS ---
const filteredStudents = computed(() => {
  return students.value.filter((student) => {
    // Filtro por Texto
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    // Filtro por Turma
    const matchesClass =
      selectedClass.value.code === "all" ||
      student.class_code === selectedClass.value.code;

    return matchesSearch && matchesClass;
  });
});

// --- AÇÕES ---
function getLevelName(code: string) {
  return LEVELS.find((l) => l.code === code)?.name || code;
}

function openMoveModal(student: any) {
  studentToMove.value = student;
  targetClass.value = null;
  targetLevel.value = null;
  showMoveModal.value = true;
}

function saveMove() {
  if (!targetClass.value) return;

  // Simula a atualização no "Banco"
  const index = students.value.findIndex(
    (s) => s.id === studentToMove.value.id,
  );
  if (index !== -1) {
    students.value[index].class_code = targetClass.value.code;
    if (targetLevel.value) {
      students.value[index].level = targetLevel.value.code;
    }
  }

  toast.add({
    severity: "success",
    summary: "Aluno Transferido",
    detail: `${studentToMove.value.name} foi movido para ${targetClass.value.name}`,
    life: 3000,
  });

  showMoveModal.value = false;
}
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-800 tracking-tight">
          Gestão de Alunos
        </h1>
        <p class="text-gray-500">Visualize turmas e realize trocas de nível.</p>
      </div>
      <Button
        label="Novo Aluno"
        icon="pi pi-plus"
        class="font-bold bg-brand-600 border-brand-600"
      />
    </div>

    <div
      class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4"
    >
      <div class="w-full md:w-64">
        <label class="text-xs font-bold text-gray-500 ml-1"
          >Filtrar por Turma</label
        >
        <Select
          v-model="selectedClass"
          :options="CLASSES"
          optionLabel="name"
          class="w-full mt-1"
        />
      </div>

      <div class="flex-1">
        <label class="text-xs font-bold text-gray-500 ml-1">Buscar Aluno</label>
        <IconField iconPosition="left" class="mt-1 w-full">
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="searchQuery"
            placeholder="Nome do aluno..."
            class="w-full"
          />
        </IconField>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="student in filteredStudents"
        :key="student.id"
        class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
      >
        <div
          class="absolute top-0 left-0 w-1 h-full"
          :class="student.active ? 'bg-green-500' : 'bg-gray-300'"
        ></div>

        <div class="flex items-start justify-between mb-4 pl-3">
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg border border-brand-100"
            >
              {{ student.name.substring(0, 2).toUpperCase() }}
            </div>
            <div>
              <h3 class="font-bold text-gray-800">{{ student.name }}</h3>
              <Tag
                :value="student.active ? 'Ativo' : 'Inativo'"
                :severity="student.active ? 'success' : 'secondary'"
                class="text-[10px]"
              />
            </div>
          </div>

          <Button
            icon="pi pi-sync"
            text
            rounded
            severity="secondary"
            v-tooltip.top="'Trocar de Turma/Nível'"
            @click="openMoveModal(student)"
          />
        </div>

        <div class="pl-3 space-y-2 text-sm text-gray-600">
          <div class="flex items-center gap-2">
            <i class="pi pi-bookmark text-brand-500"></i>
            <span class="font-medium">Nível:</span>
            <span>{{ getLevelName(student.level) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-calendar text-brand-500"></i>
            <span class="font-medium">Turma:</span>
            <span>{{ student.class_code }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredStudents.length === 0" class="text-center py-12">
      <i class="pi pi-users text-4xl text-gray-300 mb-3"></i>
      <p class="text-gray-500">Nenhum aluno encontrado.</p>
    </div>

    <Dialog
      v-model:visible="showMoveModal"
      modal
      header="Mover Aluno"
      :style="{ width: '90vw', maxWidth: '450px' }"
    >
      <div v-if="studentToMove" class="space-y-6 pt-2">
        <div class="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
          <i class="pi pi-info-circle text-blue-500 text-xl"></i>
          <p class="text-sm text-blue-700">
            Você está movendo <b>{{ studentToMove.name }}</b> da turma
            {{ studentToMove.class_code }}.
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-bold text-gray-700">Nova Turma</label>
          <Select
            v-model="targetClass"
            :options="CLASSES.filter((c) => c.code !== 'all')"
            optionLabel="name"
            placeholder="Selecione o destino..."
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-bold text-gray-700">Novo Nível (Opcional)</label>
          <Select
            v-model="targetLevel"
            :options="LEVELS"
            optionLabel="name"
            placeholder="Manter atual..."
            class="w-full"
          />
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <Button
            label="Cancelar"
            severity="secondary"
            text
            @click="showMoveModal = false"
          />
          <Button
            label="Confirmar Transferência"
            icon="pi pi-check"
            @click="saveMove"
            :disabled="!targetClass"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>
