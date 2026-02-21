<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import api from '@/core/services/api'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import Select from 'primevue/select'
import Tabs from 'primevue/tabs'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import ConfirmDialog from 'primevue/confirmdialog'

const toast = useToast()
const confirm = useConfirm()

// ── Aba ativa ───────────────────────────────────────────────────────────
const abaAtiva = ref('professores')

// ── Professores ─────────────────────────────────────────────────────────
const professores = ref<any[]>([])
const academias = ref<any[]>([])
const loadingProf = ref(false)
const buscaProf = ref('')

const modalProf = ref(false)
const submittingProf = ref(false)
const editandoProf = ref(false)
const uuidProf = ref<string | null>(null)

const formProf = ref({
  nome: '',
  email: '',
  senha: '',
  academiaId: '',
})

const errosProf = ref({ nome: '', email: '', senha: '', academiaId: '' })

// ── Academias ───────────────────────────────────────────────────────────
const loadingAcad = ref(false)
const buscaAcad = ref('')

const modalAcad = ref(false)
const submittingAcad = ref(false)
const editandoAcad = ref(false)
const uuidAcad = ref<string | null>(null)

const formAcad = ref({
  nome: '',
  endereco: '',
  telefone: '',
  email: '',
  cnpj: '',
})

const errosAcad = ref({ nome: '', endereco: '', telefone: '' })

// ── Computed ────────────────────────────────────────────────────────────
const professoresFiltrados = computed(() => {
  const q = buscaProf.value.toLowerCase()
  if (!q) return professores.value
  return professores.value.filter(
    (p) =>
      p.nome?.toLowerCase().includes(q) ||
      p.email?.toLowerCase().includes(q) ||
      p.nomeAcademia?.toLowerCase().includes(q)
  )
})

const academiasFiltradas = computed(() => {
  const q = buscaAcad.value.toLowerCase()
  if (!q) return academias.value
  return academias.value.filter(
    (a) =>
      a.nome?.toLowerCase().includes(q) ||
      a.endereco?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q)
  )
})

const academiaOptions = computed(() =>
  academias.value.map((a) => ({ label: a.nome, value: a.uuid }))
)

onMounted(async () => {
  await Promise.all([carregarProfessores(), carregarAcademias()])
})

// ── Professores: funções ─────────────────────────────────────────────────
async function carregarProfessores() {
  loadingProf.value = true
  try {
    const { data } = await api.get('/api/professores')
    professores.value = data
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao carregar professores.',
    })
  } finally {
    loadingProf.value = false
  }
}

function abrirCriarProf() {
  editandoProf.value = false
  uuidProf.value = null
  formProf.value = {
    nome: '',
    email: '',
    senha: '',
    academiaId: academias.value[0]?.uuid || '',
  }
  errosProf.value = { nome: '', email: '', senha: '', academiaId: '' }
  modalProf.value = true
}

function abrirEditarProf(prof: any) {
  editandoProf.value = true
  uuidProf.value = prof.uuid
  formProf.value = {
    nome: prof.nome,
    email: prof.email,
    senha: '',
    academiaId: '',
  }
  errosProf.value = { nome: '', email: '', senha: '', academiaId: '' }
  modalProf.value = true
}

function validarProf(): boolean {
  let ok = true
  errosProf.value = { nome: '', email: '', senha: '', academiaId: '' }

  if (!formProf.value.nome.trim()) {
    errosProf.value.nome = 'Nome é obrigatório.'
    ok = false
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formProf.value.email.trim()) {
    errosProf.value.email = 'E-mail é obrigatório.'
    ok = false
  } else if (!emailRe.test(formProf.value.email)) {
    errosProf.value.email = 'E-mail inválido.'
    ok = false
  }

  if (!editandoProf.value) {
    if (!formProf.value.senha) {
      errosProf.value.senha = 'Senha é obrigatória.'
      ok = false
    } else if (formProf.value.senha.length < 6) {
      errosProf.value.senha = 'Mínimo 6 caracteres.'
      ok = false
    }
    if (!formProf.value.academiaId) {
      errosProf.value.academiaId = 'Selecione uma academia.'
      ok = false
    }
  }
  return ok
}

async function salvarProf() {
  if (!validarProf()) return
  submittingProf.value = true
  try {
    if (editandoProf.value && uuidProf.value) {
      await api.put(`/api/professores/${uuidProf.value}`, {
        nome: formProf.value.nome,
        email: formProf.value.email,
      })
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Professor atualizado!',
      })
    } else {
      await api.post('/api/professores', {
        nome: formProf.value.nome,
        email: formProf.value.email,
        senha: formProf.value.senha,
        academiaId: formProf.value.academiaId,
      })
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Professor cadastrado!',
      })
    }
    modalProf.value = false
    await carregarProfessores()
  } catch (e: any) {
    const msg =
      e.response?.data?.message || 'Verifique os dados e tente novamente.'
    toast.add({ severity: 'error', summary: 'Erro ao salvar', detail: msg })
  } finally {
    submittingProf.value = false
  }
}

function excluirProf(prof: any) {
  confirm.require({
    message: `Remover "${prof.nome}"? Esta ação não pode ser desfeita.`,
    header: 'Remover Professor',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Remover',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await api.delete(`/api/professores/${prof.uuid}`)
        professores.value = professores.value.filter(
          (p) => p.uuid !== prof.uuid
        )
        toast.add({
          severity: 'success',
          summary: 'Removido',
          detail: `${prof.nome} removido.`,
        })
      } catch {
        toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível remover.',
        })
      }
    },
  })
}

async function carregarAcademias() {
  loadingAcad.value = true
  try {
    const { data } = await api.get('/api/academias')
    academias.value = data
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao carregar academias.',
    })
  } finally {
    loadingAcad.value = false
  }
}

function abrirCriarAcad() {
  editandoAcad.value = false
  uuidAcad.value = null
  formAcad.value = { nome: '', endereco: '', telefone: '', email: '', cnpj: '' }
  errosAcad.value = { nome: '', endereco: '', telefone: '' }
  modalAcad.value = true
}

function abrirEditarAcad(acad: any) {
  editandoAcad.value = true
  uuidAcad.value = acad.uuid
  formAcad.value = {
    nome: acad.nome,
    endereco: acad.endereco,
    telefone: acad.telefone,
    email: acad.email || '',
    cnpj: acad.cnpj || '',
  }
  errosAcad.value = { nome: '', endereco: '', telefone: '' }
  modalAcad.value = true
}

function validarAcad(): boolean {
  let ok = true
  errosAcad.value = { nome: '', endereco: '', telefone: '' }
  if (!formAcad.value.nome.trim()) {
    errosAcad.value.nome = 'Nome é obrigatório.'
    ok = false
  }
  if (!formAcad.value.endereco.trim()) {
    errosAcad.value.endereco = 'Endereço é obrigatório.'
    ok = false
  }
  if (!formAcad.value.telefone.trim()) {
    errosAcad.value.telefone = 'Telefone é obrigatório.'
    ok = false
  }
  return ok
}

async function salvarAcad() {
  if (!validarAcad()) return
  submittingAcad.value = true
  try {
    const payload = {
      nome: formAcad.value.nome,
      endereco: formAcad.value.endereco,
      telefone: formAcad.value.telefone,
      email: formAcad.value.email || null,
      cnpj: formAcad.value.cnpj || null,
    }

    if (editandoAcad.value && uuidAcad.value) {
      await api.put(`/api/academias/${uuidAcad.value}`, payload)
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Academia atualizada!',
      })
    } else {
      await api.post('/api/academias', payload)
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Academia cadastrada!',
      })
    }
    modalAcad.value = false
    await carregarAcademias()
  } catch (e: any) {
    const msg =
      e.response?.data?.message || 'Verifique os dados e tente novamente.'
    toast.add({ severity: 'error', summary: 'Erro ao salvar', detail: msg })
  } finally {
    submittingAcad.value = false
  }
}

function excluirAcad(acad: any) {
  confirm.require({
    message: `Remover a academia "${acad.nome}"? Todos os dados vinculados serão afetados.`,
    header: 'Remover Academia',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Remover',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await api.delete(`/api/academias/${acad.uuid}`)
        academias.value = academias.value.filter((a) => a.uuid !== acad.uuid)
        toast.add({
          severity: 'success',
          summary: 'Removida',
          detail: `${acad.nome} removida.`,
        })
      } catch {
        toast.add({
          severity: 'error',
          summary: 'Erro',
          detail:
            'Não foi possível remover. Verifique se há professores ou turmas vinculados.',
        })
      }
    },
  })
}

function iniciais(nome: string) {
  return (
    nome
      ?.split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase() || '?'
  )
}
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6 p-4">
    <ConfirmDialog />

    <div class="flex items-start justify-between">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span
            class="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
          >
            <i class="pi pi-lock mr-1 text-[10px]"></i>Somente Admin
          </span>
        </div>
        <h1
          class="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight"
        >
          Gestão de Usuários
        </h1>
        <p class="text-slate-500 text-sm mt-1">
          Cadastre professores e academias do sistema.
        </p>
      </div>
    </div>

    <Tabs v-model:value="abaAtiva">
      <TabList>
        <Tab value="professores">
          <i class="pi pi-users mr-2"></i>
          Professores
          <span
            class="ml-2 bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full"
          >
            {{ professores.length }}
          </span>
        </Tab>
        <Tab value="academias">
          <i class="pi pi-building mr-2"></i>
          Academias
          <span
            class="ml-2 bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full"
          >
            {{ academias.length }}
          </span>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel value="professores">
          <div class="space-y-4 pt-4">
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            >
              <IconField iconPosition="left" class="w-full sm:w-72">
                <InputIcon class="pi pi-search" />
                <InputText
                  v-model="buscaProf"
                  placeholder="Buscar por nome, e-mail ou academia..."
                  class="w-full"
                />
              </IconField>
              <Button
                label="Novo Professor"
                icon="pi pi-user-plus"
                @click="abrirCriarProf"
                class="w-full sm:w-auto shrink-0"
              />
            </div>

            <div v-if="loadingProf" class="flex justify-center py-16">
              <i class="pi pi-spin pi-spinner text-3xl text-sky-500"></i>
            </div>

            <div
              v-else-if="professoresFiltrados.length === 0"
              class="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200"
            >
              <i class="pi pi-users text-4xl text-slate-300 mb-3 block"></i>
              <p class="text-slate-500 font-medium">
                Nenhum professor encontrado
              </p>
              <Button
                label="Cadastrar primeiro professor"
                size="small"
                text
                class="mt-3"
                @click="abrirCriarProf"
              />
            </div>

            <div
              v-else
              class="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <div class="divide-y divide-slate-50">
                <div
                  v-for="prof in professoresFiltrados"
                  :key="prof.uuid"
                  class="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors group"
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0"
                    >
                      {{ iniciais(prof.nome) }}
                    </div>
                    <div>
                      <p class="font-semibold text-slate-800 text-sm">
                        {{ prof.nome }}
                      </p>
                      <div class="flex items-center gap-3 mt-0.5 flex-wrap">
                        <span class="text-xs text-slate-500">
                          <i class="pi pi-envelope mr-1"></i>{{ prof.email }}
                        </span>
                        <span
                          v-if="prof.nomeAcademia"
                          class="text-xs text-sky-600 font-medium"
                        >
                          <i class="pi pi-building mr-1"></i
                          >{{ prof.nomeAcademia }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  >
                    <Button
                      icon="pi pi-pencil"
                      text
                      rounded
                      size="small"
                      severity="secondary"
                      v-tooltip.top="'Editar'"
                      @click="abrirEditarProf(prof)"
                    />
                    <Button
                      icon="pi pi-trash"
                      text
                      rounded
                      size="small"
                      severity="danger"
                      v-tooltip.top="'Remover'"
                      @click="excluirProf(prof)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="academias">
          <div class="space-y-4 pt-4">
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            >
              <IconField iconPosition="left" class="w-full sm:w-72">
                <InputIcon class="pi pi-search" />
                <InputText
                  v-model="buscaAcad"
                  placeholder="Buscar academia..."
                  class="w-full"
                />
              </IconField>
              <Button
                label="Nova Academia"
                icon="pi pi-building"
                @click="abrirCriarAcad"
                class="w-full sm:w-auto shrink-0"
              />
            </div>

            <div v-if="loadingAcad" class="flex justify-center py-16">
              <i class="pi pi-spin pi-spinner text-3xl text-sky-500"></i>
            </div>

            <div
              v-else-if="academiasFiltradas.length === 0"
              class="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200"
            >
              <i class="pi pi-building text-4xl text-slate-300 mb-3 block"></i>
              <p class="text-slate-500 font-medium">
                Nenhuma academia encontrada
              </p>
              <Button
                label="Cadastrar primeira academia"
                size="small"
                text
                class="mt-3"
                @click="abrirCriarAcad"
              />
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="acad in academiasFiltradas"
                :key="acad.uuid"
                class="bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow group"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shrink-0"
                    >
                      <i class="pi pi-building text-sm"></i>
                    </div>
                    <div>
                      <p class="font-semibold text-slate-800 text-sm">
                        {{ acad.nome }}
                      </p>
                      <p v-if="acad.cnpj" class="text-xs text-slate-400">
                        {{ acad.cnpj }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Button
                      icon="pi pi-pencil"
                      text
                      rounded
                      size="small"
                      severity="secondary"
                      v-tooltip.top="'Editar'"
                      @click="abrirEditarAcad(acad)"
                    />
                    <Button
                      icon="pi pi-trash"
                      text
                      rounded
                      size="small"
                      severity="danger"
                      v-tooltip.top="'Remover'"
                      @click="excluirAcad(acad)"
                    />
                  </div>
                </div>

                <div class="space-y-1.5 text-xs text-slate-500">
                  <p>
                    <i class="pi pi-map-marker mr-2 text-slate-400"></i
                    >{{ acad.endereco }}
                  </p>
                  <p>
                    <i class="pi pi-phone mr-2 text-slate-400"></i
                    >{{ acad.telefone }}
                  </p>
                  <p v-if="acad.email">
                    <i class="pi pi-envelope mr-2 text-slate-400"></i
                    >{{ acad.email }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <Dialog
      v-model:visible="modalProf"
      modal
      :header="editandoProf ? 'Editar Professor' : 'Novo Professor'"
      :style="{ width: '28rem' }"
      :closable="!submittingProf"
    >
      <div class="flex flex-col gap-4 pt-2">
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-semibold text-slate-700">
            Nome Completo <span class="text-red-500">*</span>
          </label>
          <InputText
            v-model="formProf.nome"
            placeholder="Ex: Ana Paula Silva"
            :class="{ 'p-invalid': errosProf.nome }"
            class="w-full"
            autocomplete="off"
          />
          <small v-if="errosProf.nome" class="text-red-500 text-xs">{{
            errosProf.nome
          }}</small>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-semibold text-slate-700">
            E-mail <span class="text-red-500">*</span>
          </label>
          <InputText
            v-model="formProf.email"
            placeholder="professor@academia.com"
            type="email"
            :class="{ 'p-invalid': errosProf.email }"
            class="w-full"
            autocomplete="off"
          />
          <small v-if="errosProf.email" class="text-red-500 text-xs">{{
            errosProf.email
          }}</small>
        </div>

        <template v-if="!editandoProf">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">
              Senha <span class="text-red-500">*</span>
            </label>
            <InputText
              v-model="formProf.senha"
              placeholder="Mínimo 6 caracteres"
              type="password"
              :class="{ 'p-invalid': errosProf.senha }"
              class="w-full"
              autocomplete="new-password"
            />
            <small v-if="errosProf.senha" class="text-red-500 text-xs">{{
              errosProf.senha
            }}</small>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">
              Academia <span class="text-red-500">*</span>
            </label>
            <Select
              v-model="formProf.academiaId"
              :options="academiaOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Selecione a academia"
              :class="{ 'p-invalid': errosProf.academiaId }"
              class="w-full"
            />
            <small v-if="errosProf.academiaId" class="text-red-500 text-xs">{{
              errosProf.academiaId
            }}</small>
          </div>
        </template>

        <div
          v-if="editandoProf"
          class="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-700"
        >
          <i class="pi pi-info-circle mr-1"></i>
          Apenas nome e e-mail podem ser alterados aqui. A senha é gerenciada
          pelo próprio professor.
        </div>

        <div class="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <Button
            label="Cancelar"
            severity="secondary"
            outlined
            :disabled="submittingProf"
            @click="modalProf = false"
          />
          <Button
            :label="editandoProf ? 'Salvar' : 'Cadastrar'"
            icon="pi pi-check"
            :loading="submittingProf"
            @click="salvarProf"
          />
        </div>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="modalAcad"
      modal
      :header="editandoAcad ? 'Editar Academia' : 'Nova Academia'"
      :style="{ width: '30rem' }"
      :closable="!submittingAcad"
    >
      <div class="flex flex-col gap-4 pt-2">
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-semibold text-slate-700">
            Nome da Academia <span class="text-red-500">*</span>
          </label>
          <InputText
            v-model="formAcad.nome"
            placeholder="Ex: Connect Acqua Kids"
            :class="{ 'p-invalid': errosAcad.nome }"
            class="w-full"
          />
          <small v-if="errosAcad.nome" class="text-red-500 text-xs">{{
            errosAcad.nome
          }}</small>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-semibold text-slate-700">
            Endereço <span class="text-red-500">*</span>
          </label>
          <InputText
            v-model="formAcad.endereco"
            placeholder="Ex: Rua das Piscinas, 100 - Centro"
            :class="{ 'p-invalid': errosAcad.endereco }"
            class="w-full"
          />
          <small v-if="errosAcad.endereco" class="text-red-500 text-xs">{{
            errosAcad.endereco
          }}</small>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">
              Telefone <span class="text-red-500">*</span>
            </label>
            <InputText
              v-model="formAcad.telefone"
              placeholder="(11) 99999-0000"
              :class="{ 'p-invalid': errosAcad.telefone }"
              class="w-full"
            />
            <small v-if="errosAcad.telefone" class="text-red-500 text-xs">{{
              errosAcad.telefone
            }}</small>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">CNPJ</label>
            <InputText
              v-model="formAcad.cnpj"
              placeholder="00.000.000/0001-00"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-semibold text-slate-700"
            >E-mail da Academia</label
          >
          <InputText
            v-model="formAcad.email"
            placeholder="contato@academia.com"
            type="email"
            class="w-full"
          />
        </div>

        <div class="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <Button
            label="Cancelar"
            severity="secondary"
            outlined
            :disabled="submittingAcad"
            @click="modalAcad = false"
          />
          <Button
            :label="editandoAcad ? 'Salvar' : 'Cadastrar'"
            icon="pi pi-check"
            :loading="submittingAcad"
            @click="salvarAcad"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>
