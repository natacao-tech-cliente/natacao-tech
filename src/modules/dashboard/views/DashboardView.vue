<script setup lang="ts">
import Button from 'primevue/button'
import Tag from 'primevue/tag'
</script>

<template>
  <div class="space-y-8">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-800 tracking-tight">
          Olá, Professor(a)! 👋
        </h1>
        <p class="text-gray-500">Aqui está o resumo do seu dia na piscina.</p>
      </div>
      <div
        class="flex gap-2 text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm"
      >
        <i class="pi pi-calendar text-brand-500"></i>
        <span>Hoje, 29 de Janeiro</span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all"
      >
        <div
          class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"
        >
          <i class="pi pi-users text-6xl text-brand-600"></i>
        </div>
        <div
          class="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 mb-4"
        >
          <i class="pi pi-users text-xl"></i>
        </div>
        <span class="block text-gray-500 text-sm font-medium"
          >Alunos Ativos</span
        >
        <span class="block text-3xl font-bold text-gray-800 mt-1">124</span>
        <div
          class="mt-2 text-xs text-green-600 font-medium flex items-center gap-1"
        >
          <i class="pi pi-arrow-up"></i> +4 novos este mês
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all"
      >
        <div
          class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"
        >
          <i class="pi pi-stopwatch text-6xl text-orange-600"></i>
        </div>
        <div
          class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-4"
        >
          <i class="pi pi-stopwatch text-xl"></i>
        </div>
        <span class="block text-gray-500 text-sm font-medium"
          >Avaliações Pendentes</span
        >
        <span class="block text-3xl font-bold text-gray-800 mt-1">8</span>
        <div class="mt-2 text-xs text-orange-600 font-medium">
          Necessitam atenção
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all"
      >
        <div
          class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"
        >
          <i class="pi pi-star text-6xl text-purple-600"></i>
        </div>
        <div
          class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4"
        >
          <i class="pi pi-star text-xl"></i>
        </div>
        <span class="block text-gray-500 text-sm font-medium"
          >Evolução da Turma</span
        >
        <span class="block text-3xl font-bold text-gray-800 mt-1">92%</span>
        <div class="mt-2 text-xs text-gray-400 font-medium">
          Média geral de aprovação
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div
        class="lg:col-span-2 bg-gradient-to-r from-brand-600 to-brand-500 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-brand-100"
      >
        <div class="relative z-10 flex flex-col h-full justify-between">
          <div>
            <Tag
              value="Dica do Sistema"
              class="bg-white/20 text-white border-none mb-4"
            />
            <h2 class="text-3xl font-bold mb-2">Vai começar uma aula?</h2>
            <p class="text-blue-100 mb-6 max-w-md text-lg leading-relaxed">
              Use a Avaliação em Lote para registrar o progresso de até 10
              alunos simultaneamente.
            </p>
          </div>
          <button
            @click="$router.push('/assessments')"
            class="w-max bg-white text-brand-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg active:scale-95 flex items-center gap-2"
          >
            <i class="pi pi-play"></i>
            Iniciar Avaliação
          </button>
        </div>
        <i
          class="pi pi-waves absolute -bottom-10 -right-10 text-[12rem] opacity-20 animate-pulse"
        ></i>
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"
        ></div>
      </div>

      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-gray-800 text-lg">Aulas de Hoje</h3>
          <Button
            icon="pi pi-arrow-right"
            text
            rounded
            severity="secondary"
            size="small"
            @click="$router.push('/classes')"
          />
        </div>

        <div class="space-y-4">
          <div
            class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100"
          >
            <div class="text-center min-w-[3rem]">
              <span class="block text-xs text-gray-400 font-bold uppercase"
                >Início</span
              >
              <span class="block text-gray-800 font-bold">09:00</span>
            </div>
            <div class="w-1 h-10 bg-brand-200 rounded-full"></div>
            <div>
              <h4 class="font-bold text-gray-700 text-sm">Acqua Aprendizado</h4>
              <p class="text-xs text-gray-500">Piscina 1 • 12 Alunos</p>
            </div>
          </div>

          <div
            class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100"
          >
            <div class="text-center min-w-[3rem]">
              <span class="block text-xs text-gray-400 font-bold uppercase"
                >Início</span
              >
              <span class="block text-gray-800 font-bold">15:00</span>
            </div>
            <div class="w-1 h-10 bg-orange-200 rounded-full"></div>
            <div>
              <h4 class="font-bold text-gray-700 text-sm">Acqua Iniciante</h4>
              <p class="text-xs text-gray-500">Piscina 2 • 8 Alunos</p>
            </div>
          </div>

          <div
            class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100 opacity-60"
          >
            <div class="text-center min-w-[3rem]">
              <span class="block text-xs text-gray-400 font-bold uppercase"
                >Fim</span
              >
            </div>
            <div
              class="w-full text-center text-xs text-gray-400 border-t border-dashed border-gray-200 pt-2"
            >
              Não há mais aulas hoje
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
