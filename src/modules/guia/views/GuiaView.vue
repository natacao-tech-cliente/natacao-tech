<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/core/stores/auth'

const auth = useAuthStore()

const secaoAtiva = ref('inicio')

const secoes = [
  { id: 'inicio', label: 'Visão Geral', icon: 'pi pi-home' },
  { id: 'cargos', label: 'Hierarquia de Cargos', icon: 'pi pi-sitemap' },
  { id: 'academias', label: 'Academias', icon: 'pi pi-building' },
  { id: 'professores', label: 'Professores', icon: 'pi pi-user' },
  { id: 'turmas', label: 'Turmas', icon: 'pi pi-calendar' },
  { id: 'avaliacoes', label: 'Avaliações', icon: 'pi pi-check-square' },
  { id: 'relatorios', label: 'Relatórios', icon: 'pi pi-file-pdf' },
  { id: 'alunos', label: 'Alunos', icon: 'pi pi-users' },
]
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
    <div
      class="bg-gradient-to-r from-sky-600 to-blue-700 rounded-2xl p-6 md:p-8 text-white"
    >
      <div class="flex items-center gap-3 mb-3">
        <div
          class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
        >
          <i class="pi pi-book text-xl"></i>
        </div>
        <span class="text-sm font-semibold uppercase tracking-wider opacity-80"
          >Documentação</span
        >
      </div>
      <h1 class="text-2xl md:text-3xl font-bold mb-2">
        Guia de Uso do Sistema
      </h1>
      <p class="text-blue-100 text-sm md:text-base">
        Tudo que você precisa saber para usar o AcquOn com eficiência. Navegue
        pelas seções abaixo.
      </p>
    </div>

    <div class="flex flex-col md:flex-row gap-6">
      <nav class="md:w-56 shrink-0">
        <div
          class="bg-white rounded-2xl border border-slate-100 shadow-sm p-2 sticky top-4"
        >
          <p
            class="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2"
          >
            Seções
          </p>
          <button
            v-for="s in secoes"
            :key="s.id"
            @click="secaoAtiva = s.id"
            class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
            :class="
              secaoAtiva === s.id
                ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-100'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            "
          >
            <i
              :class="[
                s.icon,
                'text-base',
                secaoAtiva === s.id ? 'text-sky-600' : 'text-slate-400',
              ]"
            ></i>
            {{ s.label }}
          </button>
        </div>
      </nav>

      <div class="flex-1 space-y-4">
        <div v-if="secaoAtiva === 'inicio'" class="space-y-4">
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            <h2
              class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"
            >
              <i class="pi pi-home text-sky-500"></i> O que é o AcquOn?
            </h2>
            <p class="text-slate-600 leading-relaxed mb-4">
              O AcquOn é um sistema de gestão para academias de natação. Ele
              permite controlar turmas, avaliar o progresso dos alunos por
              habilidades e enviar relatórios automáticos aos responsáveis via
              WhatsApp.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="bg-sky-50 rounded-xl p-4 border border-sky-100">
                <i class="pi pi-calendar text-sky-600 text-lg mb-2 block"></i>
                <p class="font-semibold text-slate-700 text-sm">
                  Gestão de Turmas
                </p>
                <p class="text-slate-500 text-xs mt-1">
                  Crie e organize horários por academia.
                </p>
              </div>
              <div class="bg-green-50 rounded-xl p-4 border border-green-100">
                <i
                  class="pi pi-check-circle text-green-600 text-lg mb-2 block"
                ></i>
                <p class="font-semibold text-slate-700 text-sm">
                  Avaliações por Nível
                </p>
                <p class="text-slate-500 text-xs mt-1">
                  Registre habilidades de cada aluno.
                </p>
              </div>
              <div class="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <i
                  class="pi pi-file-pdf text-purple-600 text-lg mb-2 block"
                ></i>
                <p class="font-semibold text-slate-700 text-sm">
                  Relatórios em PDF
                </p>
                <p class="text-slate-500 text-xs mt-1">
                  Gerados automaticamente após cada avaliação.
                </p>
              </div>
              <div class="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <i class="pi pi-send text-amber-600 text-lg mb-2 block"></i>
                <p class="font-semibold text-slate-700 text-sm">
                  Envio via WhatsApp
                </p>
                <p class="text-slate-500 text-xs mt-1">
                  Responsáveis recebem o progresso do aluno.
                </p>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            <h3 class="font-bold text-slate-700 mb-4">Fluxo de uso típico</h3>
            <ol class="space-y-3">
              <li
                v-for="(passo, i) in [
                  {
                    texto: 'Admin cadastra a academia no sistema',
                    cor: 'bg-sky-500',
                  },
                  {
                    texto: 'Admin cria os professores e vincula à academia',
                    cor: 'bg-sky-500',
                  },
                  {
                    texto: 'Diretor ou Coordenador cria as turmas com horários',
                    cor: 'bg-blue-500',
                  },
                  {
                    texto: 'Coordenador matricula os alunos nas turmas',
                    cor: 'bg-blue-500',
                  },
                  {
                    texto: 'Professor avalia os alunos pela tela de Avaliações',
                    cor: 'bg-indigo-500',
                  },
                  {
                    texto:
                      'O sistema gera o PDF e envia ao responsável por WhatsApp',
                    cor: 'bg-indigo-500',
                  },
                ]"
                :key="i"
                class="flex items-start gap-3"
              >
                <div
                  class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                  :class="passo.cor"
                >
                  {{ i + 1 }}
                </div>
                <p class="text-slate-600 text-sm">{{ passo.texto }}</p>
              </li>
            </ol>
          </div>
        </div>

        <div v-if="secaoAtiva === 'cargos'" class="space-y-4">
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            <h2
              class="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2"
            >
              <i class="pi pi-sitemap text-sky-500"></i> Hierarquia de Cargos
            </h2>
            <p class="text-slate-500 text-sm mb-5">
              O sistema possui 4 níveis de acesso. Cada cargo tem permissões
              específicas.
            </p>

            <div class="space-y-3">
              <div
                v-for="cargo in [
                  {
                    nome: 'ADMIN',
                    badge: 'bg-purple-100 text-purple-700 border-purple-200',
                    desc: 'Acesso total ao sistema. Sem vínculo de academia.',
                    pode: [
                      'Cadastrar e remover academias',
                      'Criar professores em qualquer academia',
                      'Promover professores a Diretor',
                      'Ver dados globais do sistema',
                    ],
                    naoPode: [
                      'Criar turmas (não possui academia)',
                      'Acessar Relatórios de alunos',
                    ],
                  },
                  {
                    nome: 'DIRETOR',
                    badge: 'bg-blue-100 text-blue-700 border-blue-200',
                    desc: 'Gestão completa de uma academia específica.',
                    pode: [
                      'Criar e encerrar turmas',
                      'Gerenciar professores e cargos',
                      'Editar dados da academia',
                      'Acessar Histórico e Relatórios',
                    ],
                    naoPode: [
                      'Acessar dados de outras academias',
                      'Promover a Diretor (apenas ADMIN)',
                    ],
                  },
                  {
                    nome: 'COORDENADOR',
                    badge: 'bg-amber-100 text-amber-700 border-amber-200',
                    desc: 'Gestão operacional de turmas e alunos.',
                    pode: [
                      'Criar e encerrar turmas',
                      'Matricular e transferir alunos',
                      'Ver dashboard e relatórios',
                    ],
                    naoPode: [
                      'Criar professores',
                      'Editar dados da academia',
                      'Promover cargos',
                    ],
                  },
                  {
                    nome: 'PROFESSOR',
                    badge: 'bg-slate-100 text-slate-600 border-slate-200',
                    desc: 'Avaliação dos alunos nas turmas em que leciona.',
                    pode: [
                      'Ver suas turmas no Dashboard',
                      'Avaliar alunos por habilidade',
                      'Visualizar relatórios e histórico',
                    ],
                    naoPode: [
                      'Criar turmas ou alunos',
                      'Ver dados de outros professores',
                    ],
                  },
                ]"
                :key="cargo.nome"
                class="border border-slate-100 rounded-xl p-4"
              >
                <div class="flex items-center gap-2 mb-3">
                  <span
                    class="text-xs font-bold px-2.5 py-1 rounded-full border"
                    :class="cargo.badge"
                    >{{ cargo.nome }}</span
                  >
                  <span class="text-sm text-slate-500">{{ cargo.desc }}</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p
                      class="text-xs font-semibold text-green-700 mb-1.5 flex items-center gap-1"
                    >
                      <i class="pi pi-check-circle"></i> Pode fazer
                    </p>
                    <ul class="space-y-1">
                      <li
                        v-for="p in cargo.pode"
                        :key="p"
                        class="text-xs text-slate-600 flex items-start gap-1.5"
                      >
                        <i
                          class="pi pi-check text-green-500 mt-0.5 shrink-0 text-[10px]"
                        ></i>
                        {{ p }}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p
                      class="text-xs font-semibold text-red-600 mb-1.5 flex items-center gap-1"
                    >
                      <i class="pi pi-times-circle"></i> Não pode fazer
                    </p>
                    <ul class="space-y-1">
                      <li
                        v-for="n in cargo.naoPode"
                        :key="n"
                        class="text-xs text-slate-600 flex items-start gap-1.5"
                      >
                        <i
                          class="pi pi-times text-red-400 mt-0.5 shrink-0 text-[10px]"
                        ></i>
                        {{ n }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="secaoAtiva === 'academias'" class="space-y-4">
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            <h2
              class="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2"
            >
              <i class="pi pi-building text-sky-500"></i> Academias
            </h2>
            <p class="text-slate-500 text-sm mb-5">
              Cada academia é uma unidade independente. Professores, turmas e
              alunos são sempre vinculados a uma academia.
            </p>

            <div class="space-y-4">
              <div
                class="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 flex gap-3"
              >
                <i class="pi pi-lock shrink-0 mt-0.5"></i>
                <span
                  ><strong>Apenas ADMIN</strong> pode criar e remover academias.
                  O DIRETOR pode editar os dados da sua própria academia.</span
                >
              </div>

              <div>
                <h3 class="font-semibold text-slate-700 mb-3">
                  Como cadastrar uma academia
                </h3>
                <ol class="space-y-2">
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >1</span
                    >Vá em <strong>Usuários</strong> → aba
                    <strong>Academias</strong>.
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >2</span
                    >Clique em <strong>Nova Academia</strong> e preencha nome,
                    endereço e telefone.
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >3</span
                    >Faça o upload da <strong>logo</strong> (PNG ou JPG, máx.
                    2MB).
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >4</span
                    >Salve e vincule professores.
                  </li>
                </ol>
              </div>

              <div class="bg-slate-50 rounded-xl p-4 text-sm">
                <p class="font-semibold text-slate-700 mb-2">Sobre a logo</p>
                <ul class="space-y-1 text-slate-600 text-xs">
                  <li class="flex gap-2">
                    <i class="pi pi-check text-green-500"></i>Formatos aceitos:
                    PNG, JPG/JPEG
                  </li>
                  <li class="flex gap-2">
                    <i class="pi pi-check text-green-500"></i>Tamanho máximo:
                    2MB
                  </li>
                  <li class="flex gap-2">
                    <i class="pi pi-check text-green-500"></i>Dimensão máxima:
                    1024×1024 pixels
                  </li>
                  <li class="flex gap-2">
                    <i class="pi pi-times text-red-400"></i>Logos verticais não
                    são aceitas
                  </li>
                  <li class="flex gap-2">
                    <i class="pi pi-info-circle text-sky-500"></i>Aparece nos
                    relatórios PDF enviados aos responsáveis
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div v-if="secaoAtiva === 'professores'" class="space-y-4">
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            <h2
              class="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2"
            >
              <i class="pi pi-user text-sky-500"></i> Professores
            </h2>
            <p class="text-slate-500 text-sm mb-5">
              Usuários que acessam o sistema para avaliar alunos. Vinculados a
              uma academia.
            </p>

            <div class="space-y-5">
              <div>
                <h3 class="font-semibold text-slate-700 mb-3">
                  Criar um professor
                </h3>
                <ol class="space-y-2">
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >1</span
                    >Vá em <strong>Usuários</strong> → aba
                    <strong>Professores</strong>.
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >2</span
                    >Clique em <strong>Novo Professor</strong>.
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >3</span
                    >Preencha nome, e-mail, senha e selecione a academia.
                  </li>
                </ol>
              </div>

              <div>
                <h3 class="font-semibold text-slate-700 mb-3">
                  Promoção de cargos
                </h3>
                <div class="space-y-2">
                  <div
                    class="flex items-start gap-3 bg-slate-50 rounded-xl p-3"
                  >
                    <i
                      class="pi pi-arrow-up text-green-600 mt-0.5 shrink-0"
                    ></i>
                    <div class="text-sm">
                      <p class="font-medium text-slate-700">
                        Professor → Coordenador
                      </p>
                      <p class="text-slate-500 text-xs mt-0.5">
                        Feito por ADMIN ou DIRETOR.
                      </p>
                    </div>
                  </div>
                  <div
                    class="flex items-start gap-3 bg-slate-50 rounded-xl p-3"
                  >
                    <i class="pi pi-star text-blue-600 mt-0.5 shrink-0"></i>
                    <div class="text-sm">
                      <p class="font-medium text-slate-700">
                        Professor/Coordenador → Diretor
                      </p>
                      <p class="text-slate-500 text-xs mt-0.5">
                        Feito apenas pelo ADMIN.
                      </p>
                    </div>
                  </div>
                  <div
                    class="flex items-start gap-3 bg-slate-50 rounded-xl p-3"
                  >
                    <i
                      class="pi pi-arrow-down text-amber-600 mt-0.5 shrink-0"
                    ></i>
                    <div class="text-sm">
                      <p class="font-medium text-slate-700">Rebaixar cargo</p>
                      <p class="text-slate-500 text-xs mt-0.5">
                        ADMIN/DIRETOR pode rebaixar Coordenador → Professor.
                        Apenas ADMIN rebaixa Diretor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="bg-sky-50 border border-sky-100 rounded-xl p-4 text-xs text-sky-800"
              >
                <i class="pi pi-info-circle mr-2"></i>
                Não é possível alterar o cargo de um ADMIN ou DIRETOR
                diretamente pelos botões de Coordenador. Use os botões ⭐ e ↓.
              </div>
            </div>
          </div>
        </div>

        <div v-if="secaoAtiva === 'turmas'" class="space-y-4">
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            <h2
              class="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2"
            >
              <i class="pi pi-calendar text-sky-500"></i> Turmas
            </h2>
            <p class="text-slate-500 text-sm mb-5">
              Agrupam alunos por horário e nível. Pertencem automaticamente à
              academia de quem a criou.
            </p>

            <div
              class="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 flex gap-3 mb-5"
            >
              <i class="pi pi-info-circle shrink-0 mt-0.5"></i>
              <span
                >ADMIN não cria turmas. Turmas são criadas pelo
                <strong>Diretor</strong> ou <strong>Coordenador</strong>.</span
              >
            </div>

            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-slate-700 mb-3">
                  Criar uma turma
                </h3>
                <ol class="space-y-2">
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >1</span
                    >Vá em <strong>Usuários</strong> → aba
                    <strong>Turmas</strong>.
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >2</span
                    >Clique em <strong>Nova Turma</strong>.
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >3</span
                    >Informe nome, horários, dias e nível alvo.
                  </li>
                </ol>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-slate-50 rounded-xl p-3">
                  <p class="text-xs font-semibold text-slate-600 mb-1">
                    Dias da semana
                  </p>
                  <p class="text-xs text-slate-500">
                    Selecione múltiplos dias.
                  </p>
                </div>
                <div class="bg-slate-50 rounded-xl p-3">
                  <p class="text-xs font-semibold text-slate-600 mb-1">
                    Encerrar turma
                  </p>
                  <p class="text-xs text-slate-500">
                    Alunos são desvinculados, mas o histórico é preservado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="secaoAtiva === 'avaliacoes'" class="space-y-4">
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            <h2
              class="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2"
            >
              <i class="pi pi-check-square text-sky-500"></i> Avaliações
            </h2>
            <p class="text-slate-500 text-sm mb-5">
              Avaliação individual de alunos, marcando habilidades conquistadas
              ou não.
            </p>

            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-slate-700 mb-3">Como avaliar</h3>
                <ol class="space-y-2">
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >1</span
                    >Acesse <strong>Avaliações</strong> no menu.
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >2</span
                    >Selecione turma e aluno.
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >3</span
                    >Marque habilidades (SIM/NÃO) e adicione observações.
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >4</span
                    >Salve a avaliação.
                  </li>
                </ol>
              </div>

              <div
                class="bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-green-800"
              >
                <p class="font-semibold mb-1 flex items-center gap-2">
                  <i class="pi pi-star-fill"></i> Promoção automática
                </p>
                <p class="text-xs">
                  Sistema indica aptidão quando todas as habilidades são
                  aprovadas.
                </p>
              </div>

              <div>
                <p class="font-semibold text-slate-700 mb-2 text-sm">
                  Após avaliação
                </p>
                <div class="space-y-2">
                  <div
                    class="flex gap-2 text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2"
                  >
                    <i class="pi pi-file-pdf text-red-500 shrink-0 mt-0.5"></i>
                    <span>PDF gerado com a logo da academia.</span>
                  </div>
                  <div
                    class="flex gap-2 text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2"
                  >
                    <i
                      class="pi pi-whatsapp text-green-600 shrink-0 mt-0.5"
                    ></i>
                    <span>PDF enviado via WhatsApp.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="secaoAtiva === 'relatorios'" class="space-y-4">
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            <h2
              class="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2"
            >
              <i class="pi pi-file-pdf text-sky-500"></i> Relatórios
            </h2>
            <p class="text-slate-500 text-sm mb-5">
              Documentos PDF gerados automaticamente após cada avaliação.
            </p>

            <div
              class="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 flex gap-3 mb-5"
            >
              <i class="pi pi-exclamation-triangle shrink-0 mt-0.5"></i>
              <span
                >A visualização na aba de Relatórios é restrita a
                <strong>Diretores, Coordenadores e Professores</strong>. O
                Administrador não acessa essa área.</span
              >
            </div>

            <div class="space-y-4">
              <div class="bg-slate-50 rounded-xl p-4">
                <p class="font-semibold text-slate-700 mb-3 text-sm">
                  Conteúdo do Relatório
                </p>
                <ul class="space-y-2">
                  <li
                    v-for="item in [
                      'Logo da academia e nome do professor',
                      'Dados do aluno',
                      'Data e Nível',
                      'Percentual de aprovação',
                      'Observações',
                    ]"
                    :key="item"
                    class="flex gap-2 text-xs text-slate-600"
                  >
                    <i class="pi pi-check text-green-500 shrink-0 mt-0.5"></i>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div>
                <h3 class="font-semibold text-slate-700 mb-3 text-sm">
                  Envio por WhatsApp
                </h3>
                <div class="space-y-2 text-sm text-slate-600">
                  <p>Enviado ao responsável cadastrado. Requisitos:</p>
                  <ul class="space-y-1 mt-2 text-xs">
                    <li class="flex gap-2">
                      <i class="pi pi-check text-green-500"></i>Telefone
                      cadastrado
                    </li>
                    <li class="flex gap-2">
                      <i class="pi pi-check text-green-500"></i>Logo da academia
                      cadastrada
                    </li>
                  </ul>
                </div>
              </div>

              <div
                class="bg-sky-50 border border-sky-100 rounded-xl p-4 text-xs text-sky-800"
              >
                <p class="font-semibold mb-1 flex items-center gap-1">
                  <i class="pi pi-cloud-upload"></i> Armazenamento
                </p>
                <p>
                  Armazenados no Supabase Storage. Link permanente no histórico.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="secaoAtiva === 'alunos'" class="space-y-4">
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            <h2
              class="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2"
            >
              <i class="pi pi-users text-sky-500"></i> Alunos
            </h2>
            <p class="text-slate-500 text-sm mb-5">
              Matriculados nas turmas e avaliados. Contato via WhatsApp com os
              responsáveis.
            </p>

            <div
              class="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 flex gap-3 mb-5"
            >
              <i class="pi pi-info-circle shrink-0 mt-0.5"></i>
              <span>Alunos <strong>não fazem login</strong> no sistema.</span>
            </div>

            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-slate-700 mb-3">Dados</h3>
                <div class="grid grid-cols-2 gap-2">
                  <div
                    v-for="campo in [
                      'Nome completo',
                      'Data de nascimento',
                      'Nome do responsável',
                      'Telefone',
                      'Nível inicial',
                      'Turma',
                    ]"
                    :key="campo"
                    class="bg-slate-50 rounded-lg px-3 py-2 text-xs text-slate-600 flex items-center gap-2"
                  >
                    <i class="pi pi-circle-fill text-sky-400 text-[8px]"></i>
                    {{ campo }}
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-semibold text-slate-700 mb-3">Transferência</h3>
                <p class="text-sm text-slate-600">
                  Feita pela aba Turmas no painel. Mantém o histórico.
                </p>
              </div>

              <div>
                <h3 class="font-semibold text-slate-700 mb-3">Desligamento</h3>
                <p class="text-sm text-slate-600">
                  Removido das turmas. Histórico preservado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
