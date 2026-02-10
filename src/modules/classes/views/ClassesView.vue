<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'

// Componentes
import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'
import Dialog from 'primevue/dialog'
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'

const toast = useToast()

// --- MOCKS (Turmas com lista de alunos interna) ---
const CLASSES_DATA = [
  {
    id: 1,
    name: 'Segunda e Quarta - 09:00',
    level: 'Acqua Aprendizado',
    color: 'bg-orange-100 text-orange-700',
    icon: 'pi-star',
    students: [
      { id: 1, name: 'Davi Rocha', status: 'ativo' },
      { id: 2, name: 'João Pedro', status: 'inativo' },
      { id: 3, name: 'Beatriz Lima', status: 'ativo' },
    ],
  },
  {
    id: 2,
    name: 'Terça e Quinta - 15:00',
    level: 'Acqua Iniciante',
    color: 'bg-red-100 text-red-700',
    icon: 'pi-heart',
    students: [
      { id: 4, name: 'Maria Silva', status: 'ativo' },
      { id: 5, name: 'Lucas Souza', status: 'ativo' },
      { id: 6, name: 'Ana Clara', status: 'ativo' },
      { id: 7, name: 'Pedro Henrique', status: 'ativo' },
      { id: 8, name: 'Julia Costa', status: 'ativo' },
    ],
  },
  {
    id: 3,
    name: 'Sábado - 10:00',
    level: 'Acqua Baby',
    color: 'bg-blue-100 text-blue-700',
    icon: 'pi-user',
    students: [
      { id: 9, name: 'Enzo Gabriel', status: 'ativo' },
      { id: 10, name: 'Valentina', status: 'ativo' },
    ],
  },
  {
    id: 4,
    name: 'Segunda e Quarta - 18:00',
    level: 'Acqua Expert',
    color: 'bg-gray-800 text-white',
    icon: 'pi-bolt',
    students: [], // Turma vazia para teste
  },
]

// Estados
const searchQuery = ref('')
const showClassDetails = ref(false)
const selectedClass = ref<any>(null)

// Filtro
const filteredClasses = computed(() => {
  return CLASSES_DATA.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.level.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Ações
function openClassDetails(turma: any) {
  selectedClass.value = turma
  showClassDetails.value = true
}

function handleEditClass() {
  toast.add({
    severity: 'info',
    summary: 'Em Breve',
    detail: 'Edição de turma será implementada.',
    life: 2000,
  })
}
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-800 tracking-tight">
          Minhas Turmas
        </h1>
        <p class="text-gray-500">
          Gerencie horários e visualize os alunos matriculados.
        </p>
      </div>
      <Button
        label="Nova Turma"
        icon="pi pi-plus"
        class="font-bold bg-brand-600 border-brand-600 shadow-md hover:shadow-lg transition-all"
      />
    </div>

    <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <IconField iconPosition="left" class="w-full">
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="searchQuery"
          placeholder="Pesquisar por horário ou nível..."
          class="w-full border-none shadow-none focus:ring-0"
        />
      </IconField>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="turma in filteredClasses"
        :key="turma.id"
        class="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden"
        @click="openClassDetails(turma)"
      >
        <div
          class="absolute top-0 left-0 w-full h-1"
          :class="turma.color.replace('text-', 'bg-').split(' ')[0]"
        ></div>

        <div class="flex justify-between items-start mb-4">
          <div class="p-3 rounded-xl" :class="turma.color">
            <i class="pi" :class="turma.icon"></i>
          </div>
          <div
            class="px-3 py-1 bg-gray-50 rounded-full text-xs font-bold text-gray-500 border border-gray-100"
          >
            {{ turma.students.length }} Alunos
          </div>
        </div>

        <h3
          class="text-xl font-bold text-gray-800 mb-1 group-hover:text-brand-600 transition-colors"
        >
          {{ turma.name }}
        </h3>
        <p class="text-sm text-gray-500 mb-6">{{ turma.level }}</p>

        <div
          class="flex items-center justify-between pt-4 border-t border-gray-50"
        >
          <AvatarGroup v-if="turma.students.length > 0">
            <Avatar
              v-for="student in turma.students.slice(0, 3)"
              :key="student.id"
              :label="student.name.substring(0, 1)"
              shape="circle"
              class="border-2 border-white bg-gray-200 text-gray-600 text-xs font-bold"
            />
            <Avatar
              v-if="turma.students.length > 3"
              :label="`+${turma.students.length - 3}`"
              shape="circle"
              class="border-2 border-white bg-gray-100 text-xs"
            />
          </AvatarGroup>
          <span v-else class="text-xs text-gray-400 italic">Nenhum aluno</span>

          <i
            class="pi pi-arrow-right text-gray-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all"
          ></i>
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="showClassDetails"
      modal
      :header="selectedClass?.name"
      :style="{ width: '90vw', maxWidth: '500px' }"
    >
      <div v-if="selectedClass" class="space-y-6">
        <div
          class="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between"
        >
          <div>
            <span
              class="text-xs font-bold text-gray-400 uppercase tracking-widest"
              >Metodologia</span
            >
            <p class="font-bold text-gray-800">{{ selectedClass.level }}</p>
          </div>
          <Button
            icon="pi pi-pencil"
            text
            rounded
            severity="secondary"
            @click="handleEditClass"
            v-tooltip="'Editar Turma'"
          />
        </div>

        <div>
          <h4 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <i class="pi pi-users text-brand-500"></i> Lista de Alunos
          </h4>

          <div class="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            <div
              v-for="student in selectedClass.students"
              :key="student.id"
              class="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center gap-3">
                <Avatar
                  :label="student.name.substring(0, 2)"
                  shape="circle"
                  class="bg-white border border-gray-200 text-gray-600 font-bold"
                />
                <span class="text-sm font-medium text-gray-700">{{
                  student.name
                }}</span>
              </div>
              <Tag
                :severity="student.status === 'ativo' ? 'success' : 'danger'"
                :value="student.status"
                class="text-[10px]"
              />
            </div>

            <div
              v-if="selectedClass.students.length === 0"
              class="text-center py-8 text-gray-400"
            >
              <i class="pi pi-inbox text-2xl mb-2"></i>
              <p class="text-sm">Esta turma ainda não tem alunos.</p>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <Button
            label="Fechar"
            severity="secondary"
            @click="showClassDetails = false"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>
