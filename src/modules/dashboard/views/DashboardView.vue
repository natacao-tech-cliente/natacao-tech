<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-800 tracking-tight">
        Visão Geral
      </h1>
      <p class="text-gray-500">Bem-vindo ao painel de controle do professor.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
      >
        <div
          class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-brand-600"
        >
          <i class="pi pi-users text-xl"></i>
        </div>
        <div>
          <span class="block text-gray-500 text-sm font-medium"
            >Alunos Ativos</span
          >
          <span class="block text-2xl font-bold text-gray-800">124</span>
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
      >
        <div
          class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600"
        >
          <i class="pi pi-stopwatch text-xl"></i>
        </div>
        <div>
          <span class="block text-gray-500 text-sm font-medium"
            >Avaliações Pendentes</span
          >
          <span class="block text-2xl font-bold text-gray-800">8</span>
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
      >
        <div
          class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600"
        >
          <i class="pi pi-calendar text-xl"></i>
        </div>
        <div>
          <span class="block text-gray-500 text-sm font-medium"
            >Turmas Hoje</span
          >
          <span class="block text-2xl font-bold text-gray-800">3</span>
        </div>
      </div>
    </div>

    <div
      class="bg-gradient-to-r from-brand-600 to-brand-500 rounded-3xl p-8 text-white relative overflow-hidden"
    >
      <div class="relative z-10">
        <h2 class="text-2xl font-bold mb-2">Vai começar uma aula?</h2>
        <p class="text-blue-100 mb-6 max-w-md">
          Inicie a chamada ou a avaliação em lote da sua turma agora mesmo para
          otimizar seu tempo.
        </p>
        <button
          @click="$router.push('/assessments')"
          class="bg-white text-brand-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg"
        >
          Ir para Avaliações
        </button>
      </div>
      <i
        class="pi pi-waves absolute -bottom-10 -right-10 text-[10rem] opacity-20"
      ></i>
    </div>
  </div>
</template>
