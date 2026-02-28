<script setup lang="ts">
import { ref } from 'vue'

const secaoAtiva = ref('inicio')

const secoes = [
  { id: 'inicio', label: 'Dashboard & Visão', icon: 'pi pi-home' },
  { id: 'cargos', label: 'Hierarquia', icon: 'pi pi-sitemap' },
  { id: 'academias', label: 'Academias', icon: 'pi pi-building' },
  { id: 'usuarios', label: 'Usuários', icon: 'pi pi-users' },
  { id: 'habilidades', label: 'Habilidades', icon: 'pi pi-star' },
  { id: 'turmas', label: 'Turmas', icon: 'pi pi-calendar' },
  { id: 'alunos', label: 'Alunos', icon: 'pi pi-id-card' },
  { id: 'avaliacoes', label: 'Avaliações em Lote', icon: 'pi pi-list-check' },
  { id: 'relatorios', label: 'Relatórios', icon: 'pi pi-file-pdf' },
  { id: 'perfil', label: 'Perfil & Config', icon: 'pi pi-cog' },
]
</script>

<template>
  <div class="max-w-7xl mx-auto p-4 md:p-8 min-h-screen font-sans">
    <div
      class="relative overflow-hidden bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl mb-8"
    >
      <div
        class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-sky-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"
      ></div>
      <div
        class="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"
      ></div>

      <div class="relative z-10">
        <div class="flex items-center gap-3 mb-6">
          <div
            class="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-inner"
          >
            <i class="pi pi-book text-2xl text-sky-300"></i>
          </div>
          <span
            class="text-xs font-bold uppercase tracking-[0.2em] text-sky-300"
            >Manual do Sistema</span
          >
        </div>
        <h1
          class="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400"
        >
          Guia AcquOn
        </h1>
        <p class="text-slate-400 text-lg max-w-2xl leading-relaxed">
          Diretrizes de módulos, fluxos operacionais e níveis de permissão.
        </p>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <nav class="lg:w-72 shrink-0">
        <div
          class="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sticky top-6"
        >
          <p
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-3 mb-2"
          >
            Módulos
          </p>
          <div class="space-y-1.5">
            <button
              v-for="s in secoes"
              :key="s.id"
              @click="secaoAtiva = s.id"
              class="w-full group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 relative overflow-hidden text-left"
              :class="
                secaoAtiva === s.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900'
              "
            >
              <div
                class="flex items-center justify-center w-8 h-8 rounded-xl transition-colors"
                :class="
                  secaoAtiva === s.id
                    ? 'bg-white/10 text-sky-400'
                    : 'bg-slate-200/50 text-slate-400 group-hover:bg-white group-hover:text-slate-800 group-hover:shadow-sm'
                "
              >
                <i :class="[s.icon, 'text-base']"></i>
              </div>
              <span class="relative z-10">{{ s.label }}</span>
            </button>
          </div>
        </div>
      </nav>

      <div class="flex-1">
        <div
          class="bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-10 min-h-[600px] relative overflow-hidden"
        >
          <transition name="fade-slide" mode="out-in">
            <div v-if="secaoAtiva === 'inicio'" class="space-y-6" key="inicio">
              <div class="flex items-center gap-4 mb-8">
                <div
                  class="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl shadow-inner border border-sky-100"
                >
                  <i class="pi pi-home"></i>
                </div>
                <h2 class="text-2xl font-bold text-slate-800 tracking-tight">
                  Dashboard
                </h2>
              </div>

              <div class="grid md:grid-cols-3 gap-4 mb-8">
                <div
                  class="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <i class="pi pi-chart-bar text-slate-400 mb-3 text-xl"></i>
                  <h3 class="font-bold text-slate-800 mb-1">
                    Métricas Globais
                  </h3>
                  <p class="text-sm text-slate-500 leading-relaxed">
                    Contagem em tempo real de <strong>Alunos</strong>,
                    <strong>Turmas</strong> e <strong>Professores</strong>.
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-sky-50 border border-sky-100 hover:shadow-md transition-shadow"
                >
                  <i class="pi pi-bolt text-sky-500 mb-3 text-xl"></i>
                  <h3 class="font-bold text-slate-800 mb-1">Acesso Rápido</h3>
                  <p class="text-sm text-slate-500 leading-relaxed">
                    Atalho otimizado para iniciar
                    <strong>Avaliações</strong> com um clique.
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 hover:shadow-md transition-shadow"
                >
                  <i class="pi pi-calendar text-indigo-500 mb-3 text-xl"></i>
                  <h3 class="font-bold text-slate-800 mb-1">Agenda Diária</h3>
                  <p class="text-sm text-slate-500 leading-relaxed">
                    Listagem de <strong>Aulas de Hoje</strong> com filtros por
                    horário e professor.
                  </p>
                </div>
              </div>
            </div>

            <div
              v-else-if="secaoAtiva === 'cargos'"
              class="space-y-6"
              key="cargos"
            >
              <div class="flex items-center gap-4 mb-8">
                <div
                  class="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl shadow-inner border border-purple-100"
                >
                  <i class="pi pi-sitemap"></i>
                </div>
                <h2 class="text-2xl font-bold text-slate-800 tracking-tight">
                  Hierarquia de Acesso
                </h2>
              </div>

              <div class="grid md:grid-cols-2 gap-5">
                <div
                  class="group relative p-6 rounded-3xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-[0_8px_30px_rgb(168,85,247,0.12)] transition-all"
                >
                  <div
                    class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"
                  >
                    <i class="pi pi-shield text-6xl text-purple-500"></i>
                  </div>
                  <span
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold mb-4"
                  >
                    <i class="pi pi-star-fill text-[10px]"></i> ADMIN
                  </span>
                  <ul class="space-y-3 relative z-10 text-sm text-slate-600">
                    <li class="flex gap-3">
                      <i class="pi pi-check-circle text-purple-500 mt-0.5"></i>
                      Acesso global irrestrito.
                    </li>
                    <li class="flex gap-3">
                      <i class="pi pi-check-circle text-purple-500 mt-0.5"></i>
                      Gerencia <strong>Academias</strong>.
                    </li>
                    <li class="flex gap-3">
                      <i class="pi pi-check-circle text-purple-500 mt-0.5"></i>
                      Promove usuários a <strong>DIRETOR</strong>.
                    </li>
                  </ul>
                </div>

                <div
                  class="group relative p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-[0_8px_30px_rgb(59,130,246,0.12)] transition-all"
                >
                  <div
                    class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"
                  >
                    <i class="pi pi-building text-6xl text-blue-500"></i>
                  </div>
                  <span
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-4"
                  >
                    <i class="pi pi-briefcase text-[10px]"></i> DIRETOR
                  </span>
                  <ul class="space-y-3 relative z-10 text-sm text-slate-600">
                    <li class="flex gap-3">
                      <i class="pi pi-check-circle text-blue-500 mt-0.5"></i>
                      Gestão de <strong>uma academia</strong>.
                    </li>
                    <li class="flex gap-3">
                      <i class="pi pi-check-circle text-blue-500 mt-0.5"></i>
                      Edita dados da academia.
                    </li>
                    <li class="flex gap-3">
                      <i class="pi pi-check-circle text-blue-500 mt-0.5"></i>
                      Promove a <strong>COORDENADOR</strong>.
                    </li>
                  </ul>
                </div>

                <div
                  class="group relative p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-[0_8px_30px_rgb(245,158,11,0.12)] transition-all"
                >
                  <div
                    class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"
                  >
                    <i class="pi pi-users text-6xl text-amber-500"></i>
                  </div>
                  <span
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold mb-4"
                  >
                    <i class="pi pi-compass text-[10px]"></i> COORDENADOR
                  </span>
                  <ul class="space-y-3 relative z-10 text-sm text-slate-600">
                    <li class="flex gap-3">
                      <i class="pi pi-check-circle text-amber-500 mt-0.5"></i>
                      Foco totalmente operacional.
                    </li>
                    <li class="flex gap-3">
                      <i class="pi pi-check-circle text-amber-500 mt-0.5"></i>
                      Criação e gestão de <strong>Turmas</strong>.
                    </li>
                    <li class="flex gap-3">
                      <i class="pi pi-check-circle text-amber-500 mt-0.5"></i>
                      Matrícula de <strong>Alunos</strong>.
                    </li>
                  </ul>
                </div>

                <div
                  class="group relative p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-[0_8px_30px_rgb(100,116,139,0.12)] transition-all"
                >
                  <div
                    class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"
                  >
                    <i class="pi pi-user text-6xl text-slate-500"></i>
                  </div>
                  <span
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-4"
                  >
                    <i class="pi pi-id-card text-[10px]"></i> PROFESSOR
                  </span>
                  <ul class="space-y-3 relative z-10 text-sm text-slate-600">
                    <li class="flex gap-3">
                      <i class="pi pi-check-circle text-slate-500 mt-0.5"></i>
                      Acesso restrito a turmas vinculadas.
                    </li>
                    <li class="flex gap-3">
                      <i class="pi pi-check-circle text-slate-500 mt-0.5"></i>
                      Realiza <strong>Avaliações</strong>.
                    </li>
                    <li class="flex gap-3">
                      <i class="pi pi-check-circle text-slate-500 mt-0.5"></i>
                      Visualiza histórico dos próprios alunos.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-else :key="secaoAtiva" class="space-y-6">
              <div class="flex items-center gap-4 mb-8">
                <div
                  class="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl shadow-inner border border-sky-100"
                >
                  <i :class="secoes.find((s) => s.id === secaoAtiva)?.icon"></i>
                </div>
                <h2 class="text-2xl font-bold text-slate-800 tracking-tight">
                  {{ secoes.find((s) => s.id === secaoAtiva)?.label }}
                </h2>
              </div>

              <div
                class="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100"
              >
                <ul
                  v-if="secaoAtiva === 'academias'"
                  class="space-y-4 text-slate-600"
                >
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Criação/Exclusão:</strong> Exclusivo do
                      <strong>ADMIN</strong>.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Edição:</strong> Permitida ao
                      <strong>DIRETOR</strong> da respectiva unidade.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Logotipo:</strong> Arquivos
                      <strong>PNG/JPG</strong> (Máx 2MB). Obrigatório para
                      cabeçalho de <strong>Relatórios PDF</strong>.
                    </p>
                  </li>
                </ul>

                <ul
                  v-if="secaoAtiva === 'usuarios'"
                  class="space-y-4 text-slate-600"
                >
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Cadastro:</strong> Inserção por Nome, E-mail e
                      Vínculo. Padrão inicial: <strong>PROFESSOR</strong>.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Gestão de Senhas:</strong> Redefinição forçada via
                      menu de contexto (três pontos).
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Hierarquia:</strong> Promoções (⭐) e
                      rebaixamentos (↓) executados na própria listagem.
                    </p>
                  </li>
                </ul>

                <ul
                  v-if="secaoAtiva === 'habilidades'"
                  class="space-y-4 text-slate-600"
                >
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Vínculo:</strong> Critérios associados a
                      <strong>Níveis</strong> (Toucas).
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Categorias:</strong> Agrupamento lógico (ex:
                      Respiração) para organização do boletim.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Status:</strong> Opção de
                      <strong>Ativar/Desativar</strong> sem exclusão definitiva.
                    </p>
                  </li>
                </ul>

                <ul
                  v-if="secaoAtiva === 'turmas'"
                  class="space-y-4 text-slate-600"
                >
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Configuração:</strong> Definição de
                      <strong>Dias, Horário, Nível</strong> e
                      <strong>Professor</strong>.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Matrículas:</strong> Inserção direta de alunos sem
                      turma via modal central.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Transferências:</strong> Movimentação ágil entre
                      turmas ativas.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Encerramento:</strong> Desvincula alunos mantendo
                      o <strong>histórico escolar</strong> intacto.
                    </p>
                  </li>
                </ul>

                <ul
                  v-if="secaoAtiva === 'alunos'"
                  class="space-y-4 text-slate-600"
                >
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Dados:</strong> Nome, Idade, Nível atual e
                      <strong>WhatsApp do Responsável</strong>.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Flexibilidade:</strong> Permite matrícula
                      simultânea em <strong>múltiplas turmas</strong>.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Ações:</strong> Edição, Inativação, Exclusão e
                      atalho para <strong>Histórico Completo</strong>.
                    </p>
                  </li>
                </ul>

                <ul
                  v-if="secaoAtiva === 'avaliacoes'"
                  class="space-y-4 text-slate-600"
                >
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Seleção:</strong> Escolha rápida da
                      <strong>Turma</strong> e <strong>Alunos</strong> alvos.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Wizard:</strong> Resposta simultânea (SIM/NÃO)
                      para todos por critério.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Conclusão:</strong> Inserção de
                      <strong>Feedback Geral</strong>.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Aprovação:</strong> Promoção automática ao atingir
                      <strong>100%</strong> de acertos.
                    </p>
                  </li>
                </ul>

                <ul
                  v-if="secaoAtiva === 'relatorios'"
                  class="space-y-4 text-slate-600"
                >
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Acesso:</strong> Disponível para
                      <strong>Diretor</strong>, <strong>Coordenador</strong> e
                      <strong>Professor</strong>.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Geração PDF:</strong> Cabeçalho com logo, dados,
                      grade e feedback.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Distribuição:</strong>
                      <strong>Download</strong> direto ou envio via
                      <strong>WhatsApp</strong>.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Armazenamento:</strong> Links persistentes no
                      banco de dados.
                    </p>
                  </li>
                </ul>

                <ul
                  v-if="secaoAtiva === 'perfil'"
                  class="space-y-4 text-slate-600"
                >
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Dados Pessoais:</strong> Atualização de
                      <strong>Nome</strong> e <strong>E-mail</strong>.
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Segurança:</strong> Troca de senha exigindo
                      credencial atual (mín. 6 char).
                    </p>
                  </li>
                  <li class="flex gap-4 items-start">
                    <div
                      class="p-1 rounded-full bg-sky-100 text-sky-500 mt-0.5"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                    <p>
                      <strong>Sessão:</strong> Gerenciamento de saída
                      (<strong>Logout</strong>).
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.99);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.99);
}
</style>
