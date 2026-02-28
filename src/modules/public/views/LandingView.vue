<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center font-sans"
  >
    <div
      class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-50 to-blue-100 z-0"
    ></div>
    <div
      class="absolute top-10 left-10 w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
    ></div>
    <div
      class="absolute top-0 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"
    ></div>
    <div
      class="absolute -bottom-20 left-1/2 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"
    ></div>

    <div class="z-10 text-center max-w-4xl px-6">
      <img
        src="/images/acquOnwhite.jpeg"
        alt="AcquOn Logo"
        class="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-3xl shadow-lg object-cover mb-8 border-4 border-white"
      />

      <h1
        class="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight mb-6"
      >
        Mergulhe na <br class="md:hidden" />
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600"
        >
          Gestão Inteligente
        </span>
      </h1>

      <p
        class="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
      >
        A plataforma definitiva para academias de natação.
        <strong>Avalie habilidades</strong>, controle turmas e automatize o
        envio de <strong>relatórios via WhatsApp</strong>.
      </p>

      <div class="flex justify-center items-center">
        <Button
          label="Fazer Login"
          icon="pi pi-sign-in"
          class="px-8 py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 border-none shadow-xl shadow-sky-200 transition-all hover:scale-105 w-full sm:w-auto"
          @click="router.push('/login')"
        />
      </div>
    </div>

    <div class="absolute bottom-6 text-sm text-slate-400 font-medium z-10">
      &copy; 2026 AcquOn Systems
    </div>
  </div>
</template>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
</style>
