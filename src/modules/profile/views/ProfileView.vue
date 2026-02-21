<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '@/core/stores/auth'
import api from '@/core/services/api'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

const toast = useToast()
const authStore = useAuthStore()

const professorData = ref<any>(null)
const loading = ref(false)

const formDados = ref({ nome: '', email: '' })
const errosDados = ref({ nome: '', email: '' })
const salvandoDados = ref(false)

const formSenha = ref({ senhaAtual: '', novaSenha: '', confirmarSenha: '' })
const errosSenha = ref({ senhaAtual: '', novaSenha: '', confirmarSenha: '' })
const salvandoSenha = ref(false)
const senhaAlterada = ref(false)

// ── Computed ──────────────────────────────────────────────────────────────
const iniciais = computed(() => {
  const nome = professorData.value?.nome || authStore.user || ''
  return (
    nome
      .split(' ')
      .slice(0, 2)
      .map((n: string) => n[0])
      .join('')
      .toUpperCase() || '?'
  )
})

const nomeExibicao = computed(
  () => professorData.value?.nome || authStore.user || 'Usuário'
)

const roleLabel = computed(() =>
  authStore.userRole === 'ADMIN' ? 'Administrador' : 'Professor'
)

const roleColor = computed(() =>
  authStore.userRole === 'ADMIN'
    ? 'bg-red-100 text-red-700'
    : 'bg-sky-100 text-sky-700'
)

onMounted(async () => {
  await carregarPerfil()
})

async function carregarPerfil() {
  loading.value = true
  try {
    const { data } = await api.get('/api/professores/me')
    professorData.value = data
    formDados.value.nome = data.nome
    formDados.value.email = data.email
  } catch {
    formDados.value.email = authStore.user || ''
  } finally {
    loading.value = false
  }
}

// ── Validação: dados gerais ───────────────────────────────────────────────
function validarDados(): boolean {
  let ok = true
  errosDados.value = { nome: '', email: '' }

  if (!formDados.value.nome.trim()) {
    errosDados.value.nome = 'Nome é obrigatório.'
    ok = false
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formDados.value.email.trim()) {
    errosDados.value.email = 'E-mail é obrigatório.'
    ok = false
  } else if (!emailRe.test(formDados.value.email)) {
    errosDados.value.email = 'E-mail inválido.'
    ok = false
  }

  return ok
}

async function salvarDados() {
  if (!validarDados()) return
  salvandoDados.value = true
  try {
    await api.put(`/api/professores/${professorData.value?.uuid}`, {
      nome: formDados.value.nome,
      email: formDados.value.email,
    })

    if (formDados.value.email !== authStore.user) {
      localStorage.setItem('user', formDados.value.email)
      authStore.user = formDados.value.email
    }

    professorData.value = {
      ...professorData.value,
      nome: formDados.value.nome,
      email: formDados.value.email,
    }

    toast.add({
      severity: 'success',
      summary: 'Dados atualizados',
      detail: 'Suas informações foram salvas com sucesso.',
      life: 3000,
    })
  } catch (e: any) {
    const msg = e.response?.data?.message || 'Falha ao atualizar dados.'
    toast.add({ severity: 'error', summary: 'Erro', detail: msg })
  } finally {
    salvandoDados.value = false
  }
}

// ── Validação: senha ──────────────────────────────────────────────────────
function validarSenha(): boolean {
  let ok = true
  errosSenha.value = { senhaAtual: '', novaSenha: '', confirmarSenha: '' }

  if (!formSenha.value.senhaAtual) {
    errosSenha.value.senhaAtual = 'Informe sua senha atual.'
    ok = false
  }

  if (!formSenha.value.novaSenha) {
    errosSenha.value.novaSenha = 'Informe a nova senha.'
    ok = false
  } else if (formSenha.value.novaSenha.length < 6) {
    errosSenha.value.novaSenha = 'Mínimo de 6 caracteres.'
    ok = false
  } else if (formSenha.value.novaSenha === formSenha.value.senhaAtual) {
    errosSenha.value.novaSenha = 'A nova senha deve ser diferente da atual.'
    ok = false
  }

  if (!formSenha.value.confirmarSenha) {
    errosSenha.value.confirmarSenha = 'Confirme a nova senha.'
    ok = false
  } else if (formSenha.value.novaSenha !== formSenha.value.confirmarSenha) {
    errosSenha.value.confirmarSenha = 'As senhas não coincidem.'
    ok = false
  }

  return ok
}

async function salvarSenha() {
  if (!validarSenha()) return
  salvandoSenha.value = true
  try {
    await api.patch('/api/usuarios/alterar-senha', {
      senhaAtual: formSenha.value.senhaAtual,
      novaSenha: formSenha.value.novaSenha,
    })

    formSenha.value = { senhaAtual: '', novaSenha: '', confirmarSenha: '' }
    senhaAlterada.value = true

    toast.add({
      severity: 'success',
      summary: 'Senha alterada',
      detail: 'Sua senha foi atualizada com sucesso.',
      life: 3000,
    })

    setTimeout(() => {
      senhaAlterada.value = false
    }, 4000)
  } catch (e: any) {
    const status = e.response?.status
    let msg = 'Falha ao alterar senha.'
    if (status === 400 || status === 403) {
      msg = 'Senha atual incorreta. Verifique e tente novamente.'
      errosSenha.value.senhaAtual = msg
    }
    toast.add({ severity: 'error', summary: 'Erro', detail: msg })
  } finally {
    salvandoSenha.value = false
  }
}

function logout() {
  authStore.signOut()
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6 p-4">
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div
        class="h-24 bg-gradient-to-r from-sky-400 via-blue-500 to-blue-600 relative rounded-t-2xl"
      >
        <div
          class="absolute inset-0 opacity-20 z-0"
          style="
            background-image: repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.1) 10px,
              rgba(255, 255, 255, 0.1) 20px
            );
          "
        ></div>
      </div>

      <div class="px-6 pb-6 pt-4">
        <div class="flex items-start justify-between mb-4">
          <div
            class="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-sky-100 border-4 border-white -mt-12 z-10 relative"
          >
            {{ iniciais }}
          </div>
          <button
            @click="logout"
            class="flex items-center gap-2 text-sm text-slate-400 hover:text-red-500 transition-colors mt-2"
          >
            <i class="pi pi-sign-out text-sm"></i>
            Sair
          </button>
        </div>

        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h2 class="text-xl font-bold text-slate-800">{{ nomeExibicao }}</h2>
            <span
              :class="['text-xs font-bold px-2 py-0.5 rounded-full', roleColor]"
            >
              {{ roleLabel }}
            </span>
          </div>
          <p class="text-slate-400 text-sm mt-0.5">
            <i class="pi pi-envelope mr-1"></i>{{ authStore.user }}
          </p>
          <p
            v-if="professorData?.nomeAcademia"
            class="text-slate-400 text-sm mt-0.5"
          >
            <i class="pi pi-building mr-1"></i>{{ professorData.nomeAcademia }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-10">
      <i class="pi pi-spin pi-spinner text-3xl text-sky-400"></i>
    </div>

    <template v-else>
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div class="flex items-center gap-3 mb-6">
          <div
            class="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center"
          >
            <i class="pi pi-user text-sky-500 text-sm"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-800">Dados Pessoais</h3>
            <p class="text-xs text-slate-400">
              Atualize seu nome e e-mail de acesso
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">
              Nome Completo <span class="text-red-500">*</span>
            </label>
            <InputText
              v-model="formDados.nome"
              placeholder="Seu nome completo"
              :class="{ 'p-invalid': errosDados.nome }"
              class="w-full"
            />
            <small v-if="errosDados.nome" class="text-red-500 text-xs">{{
              errosDados.nome
            }}</small>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">
              E-mail <span class="text-red-500">*</span>
            </label>
            <InputText
              v-model="formDados.email"
              placeholder="seu@email.com"
              type="email"
              :class="{ 'p-invalid': errosDados.email }"
              class="w-full"
            />
            <small v-if="errosDados.email" class="text-red-500 text-xs">{{
              errosDados.email
            }}</small>
            <small class="text-slate-400 text-xs">
              <i class="pi pi-info-circle mr-1"></i>
              Alterar o e-mail também altera seu login no sistema.
            </small>
          </div>

          <div class="flex justify-end pt-2">
            <Button
              label="Salvar Dados"
              icon="pi pi-check"
              :loading="salvandoDados"
              @click="salvarDados"
            />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div class="flex items-center gap-3 mb-6">
          <div
            class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center"
          >
            <i class="pi pi-lock text-amber-500 text-sm"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-800">Alterar Senha</h3>
            <p class="text-xs text-slate-400">
              Use uma senha forte com pelo menos 6 caracteres
            </p>
          </div>
        </div>

        <div
          v-if="senhaAlterada"
          class="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4 text-emerald-700 text-sm"
        >
          <i class="pi pi-check-circle text-emerald-500"></i>
          Senha alterada com sucesso! Use a nova senha no próximo login.
        </div>

        <div class="space-y-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">
              Senha Atual <span class="text-red-500">*</span>
            </label>
            <Password
              v-model="formSenha.senhaAtual"
              placeholder="Sua senha atual"
              :feedback="false"
              toggleMask
              :class="{ 'p-invalid': errosSenha.senhaAtual }"
              inputClass="w-full"
              class="w-full"
              autocomplete="current-password"
            />
            <small v-if="errosSenha.senhaAtual" class="text-red-500 text-xs">{{
              errosSenha.senhaAtual
            }}</small>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700">
                Nova Senha <span class="text-red-500">*</span>
              </label>
              <Password
                v-model="formSenha.novaSenha"
                placeholder="Mínimo 6 caracteres"
                toggleMask
                :class="{ 'p-invalid': errosSenha.novaSenha }"
                inputClass="w-full"
                class="w-full"
                autocomplete="new-password"
                promptLabel="Digite a nova senha"
                weakLabel="Fraca"
                mediumLabel="Média"
                strongLabel="Forte"
              />
              <small v-if="errosSenha.novaSenha" class="text-red-500 text-xs">{{
                errosSenha.novaSenha
              }}</small>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700">
                Confirmar Nova Senha <span class="text-red-500">*</span>
              </label>
              <Password
                v-model="formSenha.confirmarSenha"
                placeholder="Repita a nova senha"
                :feedback="false"
                toggleMask
                :class="{ 'p-invalid': errosSenha.confirmarSenha }"
                inputClass="w-full"
                class="w-full"
                autocomplete="new-password"
              />
              <small
                v-if="errosSenha.confirmarSenha"
                class="text-red-500 text-xs"
                >{{ errosSenha.confirmarSenha }}</small
              >
            </div>
          </div>

          <div class="flex justify-end pt-2">
            <Button
              label="Alterar Senha"
              icon="pi pi-lock"
              severity="warning"
              :loading="salvandoSenha"
              @click="salvarSenha"
            />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div class="flex items-center gap-3 mb-4">
          <div
            class="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center"
          >
            <i class="pi pi-shield text-red-400 text-sm"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-800">Sessão</h3>
            <p class="text-xs text-slate-400">Gerencie sua sessão ativa</p>
          </div>
        </div>

        <div
          class="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
        >
          <div>
            <p class="text-sm font-semibold text-slate-700">Encerrar sessão</p>
            <p class="text-xs text-slate-400 mt-0.5">
              Você será redirecionado para a tela de login.
            </p>
          </div>
          <Button
            label="Sair"
            icon="pi pi-sign-out"
            severity="danger"
            outlined
            size="small"
            @click="logout"
          />
        </div>
      </div>
    </template>
  </div>
</template>
