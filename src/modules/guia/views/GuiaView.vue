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
                      'Ver todos os dados do sistema',
                    ],
                    naoPode: ['Criar turmas (não possui academia vinculada)'],
                  },
                  {
                    nome: 'DIRETOR',
                    badge: 'bg-blue-100 text-blue-700 border-blue-200',
                    desc: 'Gestão completa de uma academia específica.',
                    pode: [
                      'Criar e encerrar turmas da sua academia',
                      'Criar e gerenciar professores',
                      'Promover professores a Coordenador',
                      'Editar dados da academia',
                      'Ver todos os alunos e turmas',
                    ],
                    naoPode: [
                      'Acessar dados de outras academias',
                      'Promover a Diretor (apenas ADMIN pode)',
                    ],
                  },
                  {
                    nome: 'COORDENADOR',
                    badge: 'bg-amber-100 text-amber-700 border-amber-200',
                    desc: 'Gestão operacional de turmas e alunos.',
                    pode: [
                      'Criar e encerrar turmas',
                      'Matricular e transferir alunos',
                      'Visualizar professores',
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
                      'Visualizar histórico de avaliações',
                      'Alterar a própria senha',
                    ],
                    naoPode: [
                      'Criar turmas ou alunos',
                      'Ver dados de outros professores',
                      'Acessar configurações do sistema',
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
                    endereço e telefone (obrigatórios).
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >3</span
                    >Faça o upload da <strong>logo</strong> da academia (PNG ou
                    JPG, máx. 2MB, formato horizontal).
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >4</span
                    >Salve e depois vincule professores e crie turmas para essa
                    academia.
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
                    <i class="pi pi-times text-red-400"></i>Logos verticais
                    (altura maior que largura) não são aceitas
                  </li>
                  <li class="flex gap-2">
                    <i class="pi pi-info-circle text-sky-500"></i>A logo aparece
                    automaticamente nos relatórios PDF enviados aos responsáveis
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
              Professores são os usuários que acessam o sistema para avaliar
              alunos. Cada professor é vinculado a uma academia.
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
                    >Preencha nome, e-mail, senha inicial e selecione a
                    academia.
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >4</span
                    >O professor poderá acessar o sistema com o e-mail e senha
                    cadastrados.
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
                        Feito por ADMIN ou DIRETOR. O coordenador passa a
                        gerenciar turmas e alunos.
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
                        Feito apenas pelo ADMIN. O diretor precisa ser vinculado
                        a uma academia no momento da promoção.
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
                        Apenas ADMIN pode rebaixar Diretor → Professor
                        (desvíncula da academia).
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
                diretamente pelos botões de Coordenador. Use os botões ⭐ e ↓
                que aparecem especificamente para Diretores.
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
              As turmas agrupam alunos por horário e nível. Cada turma pertence
              automaticamente à academia do usuário que a criou.
            </p>

            <div
              class="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 flex gap-3 mb-5"
            >
              <i class="pi pi-info-circle shrink-0 mt-0.5"></i>
              <span
                >ADMIN não cria turmas pois não possui academia vinculada.
                Turmas são criadas pelo <strong>Diretor</strong> ou
                <strong>Coordenador</strong>.</span
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
                    <strong>Turmas</strong>, ou acesse
                    <strong>Turmas</strong> no menu lateral.
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
                    >Informe o nome, horário de início e fim, dias da semana e o
                    nível alvo.
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >4</span
                    >Opcionalmente, vincule um professor responsável.
                  </li>
                </ol>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-slate-50 rounded-xl p-3">
                  <p class="text-xs font-semibold text-slate-600 mb-1">
                    Dias da semana
                  </p>
                  <p class="text-xs text-slate-500">
                    SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO. Selecione
                    múltiplos dias.
                  </p>
                </div>
                <div class="bg-slate-50 rounded-xl p-3">
                  <p class="text-xs font-semibold text-slate-600 mb-1">
                    Encerrar turma
                  </p>
                  <p class="text-xs text-slate-500">
                    Ao encerrar, os alunos são desvinculados. O histórico de
                    avaliações é preservado.
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
              O professor avalia cada aluno individualmente, marcando as
              habilidades do nível atual como conquistadas ou não.
            </p>

            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-slate-700 mb-3">
                  Como avaliar um aluno
                </h3>
                <ol class="space-y-2">
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >1</span
                    >Acesse <strong>Avaliações</strong> no menu lateral.
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >2</span
                    >Selecione a turma e depois o aluno.
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >3</span
                    >Marque as habilidades conquistadas (SIM/NÃO).
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >4</span
                    >Adicione observações opcionais (feedback ao responsável).
                  </li>
                  <li class="flex gap-3 text-sm text-slate-600">
                    <span
                      class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs shrink-0"
                      >5</span
                    >Salve a avaliação. O sistema registra a data
                    automaticamente.
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
                  Quando todas as habilidades de um nível são aprovadas, o
                  sistema registra que o aluno está apto à promoção. O professor
                  pode confirmar a promoção e o histórico é registrado.
                </p>
              </div>

              <div>
                <p class="font-semibold text-slate-700 mb-2 text-sm">
                  O que acontece após a avaliação
                </p>
                <div class="space-y-2">
                  <div
                    class="flex gap-2 text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2"
                  >
                    <i class="pi pi-file-pdf text-red-500 shrink-0 mt-0.5"></i>
                    <span
                      >Um PDF com os resultados é gerado automaticamente com a
                      logo da academia.</span
                    >
                  </div>
                  <div
                    class="flex gap-2 text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2"
                  >
                    <i
                      class="pi pi-whatsapp text-green-600 shrink-0 mt-0.5"
                    ></i>
                    <span
                      >O PDF é enviado via WhatsApp para o telefone do
                      responsável cadastrado.</span
                    >
                  </div>
                  <div
                    class="flex gap-2 text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2"
                  >
                    <i class="pi pi-history text-sky-500 shrink-0 mt-0.5"></i>
                    <span
                      >O histórico fica disponível para consulta futura na tela
                      de avaliações.</span
                    >
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
              Os relatórios são documentos PDF gerados automaticamente após cada
              avaliação, contendo o desempenho detalhado do aluno.
            </p>

            <div class="space-y-4">
              <div class="bg-slate-50 rounded-xl p-4">
                <p class="font-semibold text-slate-700 mb-3 text-sm">
                  O que contém o relatório
                </p>
                <ul class="space-y-2">
                  <li
                    v-for="item in [
                      'Logo da academia e nome do professor',
                      'Dados do aluno: nome e data de nascimento',
                      'Data da avaliação',
                      'Nível avaliado e suas habilidades (SIM/NÃO)',
                      'Gráfico de pizza com o percentual de aprovação',
                      'Feedback/observações do professor',
                      'Rodapé com identificação do sistema',
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
                  <p>
                    O relatório é enviado automaticamente ao responsável pelo
                    número cadastrado no perfil do aluno. Para o envio
                    funcionar:
                  </p>
                  <ul class="space-y-1 mt-2 text-xs">
                    <li class="flex gap-2">
                      <i class="pi pi-check text-green-500"></i>O aluno deve ter
                      telefone do responsável cadastrado
                    </li>
                    <li class="flex gap-2">
                      <i class="pi pi-check text-green-500"></i>A academia deve
                      ter a logo cadastrada para aparecer no PDF
                    </li>
                    <li class="flex gap-2">
                      <i class="pi pi-info-circle text-sky-500"></i>Em caso de
                      falha no envio, o relatório ainda fica salvo no sistema
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
                  Os PDFs são armazenados no Supabase Storage. O link permanente
                  é registrado no histórico de avaliações para acesso posterior.
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
              Os alunos são matriculados nas turmas e avaliados pelos
              professores. Eles não possuem acesso ao sistema — o contato com os
              responsáveis é feito exclusivamente via relatórios por WhatsApp.
            </p>

            <div
              class="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 flex gap-3 mb-5"
            >
              <i class="pi pi-info-circle shrink-0 mt-0.5"></i>
              <span
                >Alunos <strong>não fazem login</strong> no sistema. O
                acompanhamento do progresso é feito pelos responsáveis através
                dos relatórios PDF enviados por WhatsApp após cada
                avaliação.</span
              >
            </div>

            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-slate-700 mb-3">
                  Dados do aluno
                </h3>
                <div class="grid grid-cols-2 gap-2">
                  <div
                    v-for="campo in [
                      'Nome completo',
                      'Data de nascimento',
                      'Nome do responsável',
                      'Telefone (WhatsApp)',
                      'Nível inicial',
                      'Turma (opcional)',
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
                <h3 class="font-semibold text-slate-700 mb-3">
                  Transferência de turma
                </h3>
                <p class="text-sm text-slate-600">
                  Um aluno pode ser transferido de turma sem perder o histórico
                  de avaliações. A transferência é feita pela aba Turmas do
                  painel de administração.
                </p>
              </div>

              <div>
                <h3 class="font-semibold text-slate-700 mb-3">Desligamento</h3>
                <p class="text-sm text-slate-600">
                  Ao desligar um aluno, ele é removido do sistema de turmas. O
                  histórico de avaliações é preservado no banco de dados para
                  fins de histórico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
