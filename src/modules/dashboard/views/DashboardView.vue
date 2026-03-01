<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDashboardStore } from '@/modules/dashboard/stores/dashboard'

const store = useDashboardStore()
const estatisticasNiveis = ref([])

onMounted(async () => {
  store.fetchDashboard()
  estatisticasNiveis.value = await store.fetchEstatisticas()
})
</script>

<template>
  <div
    v-if="store.loading"
    class="flex justify-center items-center min-h-[50vh]"
  >
    <i class="pi pi-spin pi-spinner text-5xl text-sky-500 drop-shadow-md"></i>
  </div>

  <div v-else class="space-y-8 animate-fade-in">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
      <div>
        <h1
          class="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3"
        >
          Olá, Professor(a)! <span class="text-4xl animate-wave">👋</span>
        </h1>
        <p class="text-slate-500 font-medium mt-1">
          Visão geral do ecossistema aquático.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="bg-white p-6 rounded-3xl shadow-sm border border-sky-100 hover:shadow-sky-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
      >
        <div
          class="absolute -right-6 -top-6 w-32 h-32 bg-sky-50 rounded-full blur-2xl group-hover:bg-sky-100 transition-colors"
        ></div>
        <div
          class="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white mb-4 shadow-md shadow-sky-200"
        >
          <i class="pi pi-users text-2xl"></i>
        </div>
        <span
          class="block text-slate-500 text-sm font-bold uppercase tracking-wider mb-1"
          >Alunos</span
        >
        <span class="block text-4xl font-black text-slate-800">{{
          store.stats.totalAlunos
        }}</span>
      </div>

      <div
        class="bg-white p-6 rounded-3xl shadow-sm border border-cyan-100 hover:shadow-cyan-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
      >
        <div
          class="absolute -right-6 -top-6 w-32 h-32 bg-cyan-50 rounded-full blur-2xl group-hover:bg-cyan-100 transition-colors"
        ></div>
        <div
          class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white mb-4 shadow-md shadow-cyan-200"
        >
          <i class="pi pi-calendar text-2xl"></i>
        </div>
        <span
          class="block text-slate-500 text-sm font-bold uppercase tracking-wider mb-1"
          >Turmas Ativas</span
        >
        <span class="block text-4xl font-black text-slate-800">{{
          store.stats.totalTurmas
        }}</span>
      </div>

      <div
        class="bg-white p-6 rounded-3xl shadow-sm border border-blue-100 hover:shadow-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
      >
        <div
          class="absolute -right-6 -top-6 w-32 h-32 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors"
        ></div>
        <div
          class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white mb-4 shadow-md shadow-blue-200"
        >
          <i class="pi pi-id-card text-2xl"></i>
        </div>
        <span
          class="block text-slate-500 text-sm font-bold uppercase tracking-wider mb-1"
          >Professores</span
        >
        <span class="block text-4xl font-black text-slate-800">{{
          store.stats.totalProfessores || 0
        }}</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div
        class="lg:col-span-2 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-200/50 group"
      >
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-48 h-48 bg-sky-300/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 group-hover:scale-125 transition-transform duration-700"
        ></div>

        <div class="relative z-10 flex flex-col h-full justify-between gap-8">
          <div>
            <div
              class="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-white/30 shadow-sm"
            >
              Métricas
            </div>
            <h2
              class="text-4xl font-black mb-3 leading-tight text-white drop-shadow-sm"
            >
              Hora da Avaliação
            </h2>
            <p class="text-sky-100 text-lg max-w-md font-medium">
              Registre o progresso e as conquistas nas raias.
            </p>
          </div>
          <button
            @click="$router.push('/assessments')"
            class="w-max bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-sky-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <i class="pi pi-chart-line text-xl"></i>
            Iniciar Avaliação
          </button>
        </div>
      </div>

      <div
        class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-full"
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-bold text-slate-800 text-xl flex items-center gap-2">
            <i class="pi pi-clock text-sky-500"></i> Hoje
          </h3>
          <span
            class="bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-xs font-bold border border-sky-100"
          >
            {{ store.stats.turmasDeHoje.length }} turmas
          </span>
        </div>

        <div
          v-if="store.stats.turmasDeHoje.length === 0"
          class="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50"
        >
          <div
            class="w-16 h-16 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mb-3"
          >
            <i class="pi pi-calendar-times text-2xl text-slate-300"></i>
          </div>
          <p class="text-slate-500 font-bold">Piscina livre!</p>
          <p class="text-slate-400 text-xs mt-1">Nenhuma aula agendada.</p>
        </div>

        <div
          v-else
          class="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1 max-h-[300px]"
        >
          <div
            v-for="turma in store.stats.turmasDeHoje"
            :key="turma.uuid"
            class="group flex items-center gap-4 p-4 bg-white hover:bg-sky-50/60 rounded-2xl transition-all duration-300 border border-slate-100 hover:border-sky-200 hover:shadow-sm cursor-default"
          >
            <div class="text-center min-w-[3.5rem] relative">
              <span
                class="block text-slate-800 font-black text-sm group-hover:text-sky-700 transition-colors"
              >
                {{ turma.horarioInicio?.substring(0, 5) ?? '--:--' }}
              </span>
              <span class="block text-slate-400 text-xs font-semibold">
                {{ turma.horarioFim?.substring(0, 5) ?? '--:--' }}
              </span>
            </div>

            <div
              class="w-1.5 h-10 bg-slate-100 group-hover:bg-sky-200 rounded-full transition-colors relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-full bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
              ></div>
            </div>

            <div class="flex-1 min-w-0">
              <h4
                class="font-bold text-slate-700 text-[15px] truncate group-hover:text-sky-800 transition-colors"
              >
                {{ turma.nome }}
              </h4>
              <div class="flex items-center gap-2 mt-1">
                <span
                  class="inline-block w-2 h-2 rounded-full shadow-sm"
                  :class="turma.nivelAlvo ? 'bg-cyan-400' : 'bg-slate-300'"
                ></span>
                <p
                  class="text-xs text-slate-500 font-semibold truncate uppercase tracking-wide"
                >
                  {{ turma.nivelAlvo?.nome || 'Multinível' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}
.animate-wave {
  display: inline-block;
  transform-origin: 70% 70%;
  animation: wave 2.5s infinite ease-in-out;
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #bae6fd;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #7dd3fc;
}
</style>
