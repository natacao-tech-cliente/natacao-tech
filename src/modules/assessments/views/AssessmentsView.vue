<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import api from '@/core/services/api'

import Button from 'primevue/button'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import Dialog from 'primevue/dialog'
import ConfirmDialog from 'primevue/confirmdialog'
import ProgressBar from 'primevue/progressbar'

const toast = useToast()
const confirm = useConfirm()

interface NivelResumo {
  uuid: string
  nome: string
  corTouca?: string | null
}

interface Turma {
  uuid: string
  nome: string
  nivelAlvo: NivelResumo | null
}

interface Aluno {
  uuid: string
  nome: string
  nivelAtual?: NivelResumo | null
  nivelAtualNome?: string
  telefoneResponsavel?: string | null
  telefone?: string | null
}

// HabilidadeDTO (de /api/niveis/{uuid}/habilidades)
interface Habilidade {
  uuid: string
  descricao: string
  categoria: string
  ativo: boolean
}

// HistoricoAvaliacaoDTO
interface Historico {
  uuid: string
  dataAvaliacao: string
  nivelNome: string
  corTouca: string | null
  pontuacaoTotal: number
  promovido: boolean
  observacoes: string | null
}

interface AvaliacaoAluno {
  habilidadesMarcadas: Set<string>
  observacao: string
  promover: boolean
}

// ── Estado ────────────────────────────────────────────────────────────────
const turmas = ref<Turma[]>([])
const turmaSelecionada = ref<Turma | null>(null)
const alunos = ref<Aluno[]>([])
const habilidades = ref<Habilidade[]>([])

const loadingTurmas = ref(false)
const loadingAlunos = ref(false)
const salvando = ref(false)

const avaliacoes = ref<Record<string, AvaliacaoAluno>>({})
const alunoExpandido = ref<string | null>(null)

// Modal histórico
const modalHistorico = ref(false)
const alunoModal = ref<Aluno | null>(null)
const historico = ref<Historico[]>([])
const loadingHistorico = ref(false)
const enviandoWhatsApp = ref<Record<string, boolean>>({})
const baixandoPdf = ref<Record<string, boolean>>({})

// ── Computed ──────────────────────────────────────────────────────────────
const habilidadesPorCategoria = computed(() => {
  const grupos: Record<string, Habilidade[]> = {}
  for (const h of habilidades.value) {
    grupos[h.categoria] ??= []
    grupos[h.categoria]!.push(h)
  }
  return grupos
})

const totalAvaliados = computed(
  () =>
    alunos.value.filter(
      (a) => (avaliacoes.value[a.uuid]?.habilidadesMarcadas.size ?? 0) > 0
    ).length
)

const progressoAvaliacao = computed(() =>
  alunos.value.length > 0
    ? Math.round((totalAvaliados.value / alunos.value.length) * 100)
    : 0
)

onMounted(carregarTurmas)

async function carregarTurmas() {
  loadingTurmas.value = true
  try {
    const { data } = await api.get<Turma[]>('/api/turmas')
    turmas.value = data
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao carregar turmas.',
    })
  } finally {
    loadingTurmas.value = false
  }
}

async function aoSelecionarTurma() {
  if (!turmaSelecionada.value) return

  loadingAlunos.value = true
  alunos.value = []
  habilidades.value = []
  avaliacoes.value = {}
  alunoExpandido.value = null

  try {
    const { data: alunosData } = await api.get<Aluno[]>(
      `/api/turmas/${turmaSelecionada.value.uuid}/alunos`
    )
    alunos.value = alunosData

    const nivelUuid =
      turmaSelecionada.value.nivelAlvo?.uuid ??
      alunosData[0]?.nivelAtual?.uuid ??
      null

    if (nivelUuid) {
      const { data: habsData } = await api.get<Habilidade[]>(
        `/api/niveis/${nivelUuid}/habilidades`
      )
      habilidades.value = habsData.filter((h) => h.ativo !== false)
    }

    for (const aluno of alunosData) {
      avaliacoes.value[aluno.uuid] = {
        habilidadesMarcadas: new Set(),
        observacao: '',
        promover: false,
      }
    }
  } catch (e: any) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: e.response?.data?.message ?? 'Falha ao carregar dados da turma.',
    })
  } finally {
    loadingAlunos.value = false
  }
}

function toggleHabilidade(alunoUuid: string, habUuid: string) {
  const av = avaliacoes.value[alunoUuid]
  if (av === undefined) return
  if (av.habilidadesMarcadas.has(habUuid)) {
    av.habilidadesMarcadas.delete(habUuid)
  } else {
    av.habilidadesMarcadas.add(habUuid)
  }
}

function togglePromover(alunoUuid: string) {
  const av = avaliacoes.value[alunoUuid]
  if (av === undefined) return
  av.promover = !av.promover
}

function isMarcada(alunoUuid: string, habUuid: string) {
  return avaliacoes.value[alunoUuid]?.habilidadesMarcadas.has(habUuid) ?? false
}

function pontuacao(alunoUuid: string) {
  return avaliacoes.value[alunoUuid]?.habilidadesMarcadas.size ?? 0
}

function percentual(alunoUuid: string) {
  const total = habilidades.value.length
  return total > 0 ? Math.round((pontuacao(alunoUuid) / total) * 100) : 0
}

function marcarTodas(alunoUuid: string) {
  habilidades.value.forEach((h) =>
    avaliacoes.value[alunoUuid]?.habilidadesMarcadas.add(h.uuid)
  )
}

function limpar(alunoUuid: string) {
  avaliacoes.value[alunoUuid]?.habilidadesMarcadas.clear()
}

// ── Salvar lote ───────────────────────────────────────────────────────────
async function salvarAvaliacao() {
  const alunosAvaliados = alunos.value.filter(
    (a) => (avaliacoes.value[a.uuid]?.habilidadesMarcadas.size ?? 0) > 0
  )

  if (alunosAvaliados.length === 0) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Marque ao menos uma habilidade.',
    })
    return
  }

  confirm.require({
    message: `Salvar avaliação de ${alunosAvaliados.length} aluno(s)?`,
    header: 'Confirmar Avaliação',
    icon: 'pi pi-check-circle',
    acceptLabel: 'Salvar',
    rejectLabel: 'Cancelar',
    accept: async () => {
      salvando.value = true
      try {
        const payload = {
          turmaId: turmaSelecionada.value!.uuid,
          avaliacoes: alunosAvaliados.map((aluno) => {
            const av = avaliacoes.value[aluno.uuid]
            return {
              alunoId: aluno.uuid,
              habilidadesAprovadasIds: [...av!.habilidadesMarcadas],
              observacao: av!.observacao?.trim() || null,
              promoverManual: av!.promover,
            }
          }),
        }

        await api.post('/api/avaliacoes/lote', payload)

        toast.add({
          severity: 'success',
          summary: 'Avaliação salva!',
          detail: `${alunosAvaliados.length} aluno(s) avaliado(s) com sucesso.`,
          life: 5000,
        })

        for (const aluno of alunosAvaliados) {
          avaliacoes.value[aluno.uuid] = {
            habilidadesMarcadas: new Set(),
            observacao: '',
            promover: false,
          }
        }
        alunoExpandido.value = null
      } catch (e: any) {
        toast.add({
          severity: 'error',
          summary: 'Erro ao salvar',
          detail: e.response?.data?.message ?? 'Falha ao salvar avaliação.',
        })
      } finally {
        salvando.value = false
      }
    },
  })
}

// ── Histórico ─────────────────────────────────────────────────────────────
async function abrirHistorico(aluno: Aluno) {
  alunoModal.value = aluno
  historico.value = []
  modalHistorico.value = true
  loadingHistorico.value = true
  try {
    const { data } = await api.get<Historico[]>(
      `/api/alunos/${aluno.uuid}/historico`
    )
    historico.value = data
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao carregar histórico.',
    })
  } finally {
    loadingHistorico.value = false
  }
}

// ── PDF ───────────────────────────────────────────────────────────────────
async function baixarPdf(hist: Historico) {
  baixandoPdf.value[hist.uuid] = true
  try {
    const response = await api.get(`/api/avaliacoes/${hist.uuid}/pdf`, {
      responseType: 'blob',
    })
    const url = URL.createObjectURL(
      new Blob([response.data], { type: 'application/pdf' })
    )
    const a = document.createElement('a')
    a.href = url
    a.download = `avaliacao_${(alunoModal.value?.nome ?? 'relatorio').replace(/ /g, '_')}.pdf`
    a.click()
    URL.revokeObjectURL(url)
    toast.add({ severity: 'success', summary: 'PDF baixado!', life: 3000 })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao baixar PDF.',
    })
  } finally {
    baixandoPdf.value[hist.uuid] = false
  }
}

// ── WhatsApp ──────────────────────────────────────────────────────────────
async function enviarWhatsApp(hist: Historico) {
  const tel = getTelefone(alunoModal.value)
  if (!tel) {
    toast.add({
      severity: 'warn',
      summary: 'Sem telefone',
      detail: 'Nenhum telefone cadastrado para este responsável.',
    })
    return
  }

  enviandoWhatsApp.value[hist.uuid] = true
  try {
    await api.post(`/api/whatsapp/enviar-avaliacao/${hist.uuid}`)
    toast.add({
      severity: 'success',
      summary: 'WhatsApp enviado!',
      detail: `Relatório enviado para ${tel}.`,
      life: 5000,
    })
  } catch (e: any) {
    toast.add({
      severity: 'error',
      summary: 'Erro ao enviar',
      detail: e.response?.data?.message ?? 'Falha ao enviar pelo WhatsApp.',
    })
  } finally {
    enviandoWhatsApp.value[hist.uuid] = false
  }
}

// ── Utils ─────────────────────────────────────────────────────────────────
function getTelefone(aluno: Aluno | null): string | null {
  return aluno?.telefoneResponsavel ?? aluno?.telefone ?? null
}

function getNivelNome(aluno: Aluno): string {
  return aluno.nivelAtual?.nome ?? aluno.nivelAtualNome ?? ''
}

function getCorTouca(cor: string | null | undefined): Record<string, string> {
  return cor ? { backgroundColor: cor, color: '#fff' } : {}
}

function formatarData(dt: string) {
  return new Date(dt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function iniciais(nome: string) {
  return (nome ?? '?')
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-6 p-4">
    <ConfirmDialog />

    <div>
      <h1 class="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
        Avaliações
      </h1>
      <p class="text-slate-500 text-sm mt-1">
        Avalie as habilidades dos alunos e envie relatórios por WhatsApp aos
        responsáveis.
      </p>
    </div>

    <div class="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
      <label class="block text-sm font-semibold text-slate-700 mb-2"
        >Turma</label
      >
      <Select
        v-model="turmaSelecionada"
        :options="turmas"
        optionLabel="nome"
        placeholder="Selecione uma turma..."
        class="w-full md:w-96"
        :loading="loadingTurmas"
        @change="aoSelecionarTurma"
      />
      <p v-if="turmaSelecionada?.nivelAlvo" class="text-xs text-slate-400 mt-2">
        <i class="pi pi-tag mr-1"></i>Nível alvo:
        <strong>{{ turmaSelecionada.nivelAlvo.nome }}</strong>
      </p>
    </div>

    <div v-if="loadingAlunos" class="flex justify-center py-16">
      <i class="pi pi-spin pi-spinner text-4xl text-sky-400"></i>
    </div>

    <div
      v-else-if="!turmaSelecionada"
      class="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200"
    >
      <i class="pi pi-check-square text-5xl text-slate-200 mb-3 block"></i>
      <p class="text-slate-400 font-medium">Selecione uma turma para começar</p>
    </div>

    <div
      v-else-if="alunos.length === 0"
      class="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200"
    >
      <i class="pi pi-users text-5xl text-slate-200 mb-3 block"></i>
      <p class="text-slate-400 font-medium">
        Nenhum aluno matriculado nesta turma
      </p>
    </div>

    <template v-else>
      <div class="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-semibold text-slate-700"
            >Progresso da avaliação</span
          >
          <span class="text-sm text-slate-500"
            >{{ totalAvaliados }}/{{ alunos.length }} alunos</span
          >
        </div>
        <ProgressBar :value="progressoAvaliacao" class="h-2" />
      </div>

      <div class="space-y-3">
        <div
          v-for="aluno in alunos"
          :key="aluno.uuid"
          class="bg-white rounded-xl border shadow-sm overflow-hidden transition-all"
          :class="
            alunoExpandido === aluno.uuid
              ? 'border-sky-200 ring-1 ring-sky-100'
              : 'border-slate-100'
          "
        >
          <div
            class="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors select-none"
            @click="
              alunoExpandido = alunoExpandido === aluno.uuid ? null : aluno.uuid
            "
          >
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                :class="
                  pontuacao(aluno.uuid) > 0
                    ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                "
              >
                {{ iniciais(aluno.nome) }}
              </div>
              <div>
                <p class="font-semibold text-slate-800 text-sm">
                  {{ aluno.nome }}
                </p>
                <div class="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span
                    v-if="getNivelNome(aluno)"
                    class="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                    :style="getCorTouca(aluno.nivelAtual?.corTouca)"
                    :class="!aluno.nivelAtual?.corTouca ? 'bg-sky-500' : ''"
                  >
                    {{ getNivelNome(aluno) }}
                  </span>
                  <span
                    v-if="pontuacao(aluno.uuid) > 0"
                    class="text-xs text-emerald-600 font-medium"
                  >
                    ✓ {{ pontuacao(aluno.uuid) }}/{{ habilidades.length }} —
                    {{ percentual(aluno.uuid) }}%
                  </span>
                  <span
                    v-if="avaliacoes[aluno.uuid]?.promover"
                    class="text-xs bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full"
                  >
                    🏆 Promover
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <Button
                icon="pi pi-history"
                text
                rounded
                size="small"
                severity="secondary"
                v-tooltip.top="'Histórico e envio WhatsApp'"
                @click.stop="abrirHistorico(aluno)"
              />
              <i
                class="pi text-slate-400 transition-transform duration-200"
                :class="
                  alunoExpandido === aluno.uuid
                    ? 'pi-angle-up'
                    : 'pi-angle-down'
                "
              ></i>
            </div>
          </div>

          <div
            v-if="alunoExpandido === aluno.uuid"
            class="border-t border-slate-100 px-5 py-5"
          >
            <div
              v-if="habilidades.length === 0"
              class="text-center py-8 text-slate-400"
            >
              <i class="pi pi-info-circle text-2xl mb-2 block"></i>
              Nenhuma habilidade cadastrada para este nível.
            </div>

            <template v-else>
              <div class="flex items-center gap-2 mb-5">
                <button
                  @click="marcarTodas(aluno.uuid)"
                  class="text-xs font-semibold text-emerald-700 border border-emerald-200 rounded-lg px-3 py-1.5 hover:bg-emerald-50 transition-colors"
                >
                  ✓ Marcar todas
                </button>
                <button
                  @click="limpar(aluno.uuid)"
                  class="text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
                >
                  ✕ Limpar
                </button>
                <span class="text-xs text-slate-400 ml-auto">
                  {{ pontuacao(aluno.uuid) }}/{{ habilidades.length }} marcadas
                </span>
              </div>

              <div class="space-y-5">
                <div
                  v-for="(habs, categoria) in habilidadesPorCategoria"
                  :key="categoria"
                >
                  <p
                    class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2"
                  >
                    <i class="pi pi-tag mr-1"></i>{{ categoria }}
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div
                      v-for="hab in habs"
                      :key="hab.uuid"
                      class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all select-none"
                      :class="
                        isMarcada(aluno.uuid, hab.uuid)
                          ? 'bg-emerald-50 border-emerald-300'
                          : 'bg-slate-50 border-slate-200 hover:border-sky-200 hover:bg-sky-50'
                      "
                      @click="toggleHabilidade(aluno.uuid, hab.uuid)"
                    >
                      <div
                        class="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border-2 transition-all"
                        :class="
                          isMarcada(aluno.uuid, hab.uuid)
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-slate-300 bg-white'
                        "
                      >
                        <i
                          v-if="isMarcada(aluno.uuid, hab.uuid)"
                          class="pi pi-check text-white"
                          style="font-size: 0.6rem"
                        ></i>
                      </div>
                      <span
                        class="text-sm leading-snug"
                        :class="
                          isMarcada(aluno.uuid, hab.uuid)
                            ? 'text-emerald-800 font-medium'
                            : 'text-slate-600'
                        "
                        >{{ hab.descricao }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Feedback + Promoção -->
              <div class="mt-6 pt-5 border-t border-slate-100 space-y-4">
                <div>
                  <label
                    class="block text-sm font-semibold text-slate-700 mb-1.5"
                  >
                    <i class="pi pi-comment mr-1 text-slate-400"></i>Feedback do
                    Professor
                  </label>
                  <Textarea
                    v-model="avaliacoes[aluno.uuid]!.observacao"
                    placeholder="Observações sobre o desempenho nesta avaliação..."
                    :rows="3"
                    class="w-full text-sm"
                  />
                </div>

                <div
                  class="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all select-none"
                  :class="
                    avaliacoes[aluno.uuid]?.promover
                      ? 'bg-amber-50 border-amber-300'
                      : 'bg-slate-50 border-slate-200 hover:border-amber-200'
                  "
                  @click="togglePromover(aluno.uuid)"
                >
                  <div
                    class="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border-2 transition-all"
                    :class="
                      avaliacoes[aluno.uuid]?.promover
                        ? 'bg-amber-500 border-amber-500'
                        : 'border-slate-300 bg-white'
                    "
                  >
                    <i
                      v-if="avaliacoes[aluno.uuid]?.promover"
                      class="pi pi-check text-white"
                      style="font-size: 0.6rem"
                    ></i>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-slate-700">
                      🏆 Promover para o próximo nível
                    </p>
                    <p class="text-xs text-slate-400 mt-0.5">
                      O aluno será movido para a próxima touca ao salvar a
                      avaliação.
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Botão salvar -->
      <div class="flex justify-end pt-2 pb-4">
        <Button
          label="Salvar Avaliações"
          icon="pi pi-check"
          size="large"
          :loading="salvando"
          :disabled="totalAvaliados === 0"
          @click="salvarAvaliacao"
        />
      </div>
    </template>

    <!-- ── Modal Histórico + WhatsApp ────────────────────────────────── -->
    <Dialog v-model:visible="modalHistorico" modal :style="{ width: '38rem' }">
      <template #header>
        <div class="flex flex-col">
          <h3 class="font-bold text-slate-800 text-lg">
            Histórico de Avaliações
          </h3>
          <div class="flex items-center gap-3 mt-1 flex-wrap">
            <span class="text-sm text-slate-500">
              <i class="pi pi-user mr-1"></i>{{ alunoModal?.nome }}
            </span>
            <span
              v-if="getTelefone(alunoModal)"
              class="text-sm text-emerald-600 font-medium"
            >
              <i class="pi pi-whatsapp mr-1"></i>{{ getTelefone(alunoModal) }}
            </span>
            <span v-else class="text-xs text-amber-600 font-medium">
              <i class="pi pi-exclamation-triangle mr-1"></i>Sem telefone
              cadastrado
            </span>
          </div>
        </div>
      </template>

      <!-- Loading -->
      <div v-if="loadingHistorico" class="flex justify-center py-10">
        <i class="pi pi-spin pi-spinner text-3xl text-sky-400"></i>
      </div>

      <!-- Sem histórico -->
      <div v-else-if="historico.length === 0" class="text-center py-10">
        <i class="pi pi-inbox text-5xl text-slate-200 mb-3 block"></i>
        <p class="text-slate-400 font-medium">
          Nenhuma avaliação registrada ainda.
        </p>
      </div>

      <!-- Lista -->
      <div v-else class="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        <div
          v-for="hist in historico"
          :key="hist.uuid"
          class="border border-slate-100 rounded-xl p-4 bg-slate-50 hover:bg-white transition-colors"
        >
          <div class="flex items-start justify-between gap-4">
            <!-- Info da avaliação -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-2">
                <span
                  class="text-sm font-bold px-2 py-0.5 rounded-full text-white"
                  :style="getCorTouca(hist.corTouca)"
                  :class="!hist.corTouca ? 'bg-sky-500' : ''"
                >
                  {{ hist.nivelNome }}
                </span>
                <span
                  v-if="hist.promovido"
                  class="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700"
                  >🏆 Promovido</span
                >
              </div>

              <p class="text-xs text-slate-500">
                <i class="pi pi-calendar mr-1"></i
                >{{ formatarData(hist.dataAvaliacao) }}
                <span class="mx-2 text-slate-300">·</span>
                <i class="pi pi-star mr-1"></i
                >{{ hist.pontuacaoTotal }} habilidade(s) aprovada(s)
              </p>

              <p
                v-if="hist.observacoes"
                class="text-xs text-slate-500 mt-2 italic line-clamp-2 bg-white border border-slate-100 rounded-lg px-3 py-2"
              >
                "{{ hist.observacoes }}"
              </p>
            </div>

            <div class="flex flex-col gap-2 shrink-0">
              <Button
                icon="pi pi-file-pdf"
                label="PDF"
                size="small"
                severity="secondary"
                outlined
                :loading="baixandoPdf[hist.uuid]"
                v-tooltip.left="'Baixar relatório em PDF'"
                @click="baixarPdf(hist)"
              />
              <Button
                icon="pi pi-whatsapp"
                label="Enviar"
                size="small"
                severity="success"
                :loading="enviandoWhatsApp[hist.uuid]"
                :disabled="!getTelefone(alunoModal)"
                v-tooltip.left="
                  getTelefone(alunoModal)
                    ? `Enviar para ${getTelefone(alunoModal)}`
                    : 'Sem telefone cadastrado'
                "
                @click="enviarWhatsApp(hist)"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="alunoModal && !getTelefone(alunoModal) && historico.length > 0"
        class="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-700"
      >
        <i class="pi pi-exclamation-triangle mt-0.5 shrink-0"></i>
        <span>
          Este aluno não tem telefone do responsável cadastrado. Para habilitar
          o envio por WhatsApp, edite o cadastro do aluno e adicione o telefone.
        </span>
      </div>
    </Dialog>
  </div>
</template>
