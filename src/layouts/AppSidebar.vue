<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/core/services/supabase'

const isMobileOpen = ref(false)
const router = useRouter()
const route = useRoute()

const menuItems = [
  { label: 'Dashboard', icon: 'pi pi-home', route: '/' },
  { label: 'Avaliações', icon: 'pi pi-check-circle', route: '/assessments' },
  { label: 'Turmas', icon: 'pi pi-calendar', route: '/classes' },
  { label: 'Alunos', icon: 'pi pi-users', route: '/students' },
  { label: 'Relatórios', icon: 'pi pi-chart-bar', route: '/reports' },
]

function navigate(path: string) {
  router.push(path)
  isMobileOpen.value = false
}

async function handleLogout() {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<template>
  <button
    class="lg:hidden fixed top-3 left-3 z-[60] p-3 bg-white text-gray-700 rounded-md shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-all active:scale-95"
    @click="isMobileOpen = !isMobileOpen"
    aria-label="Menu"
  >
    <i class="pi pi-bars text-xl"></i>
  </button>

  <div
    v-if="isMobileOpen"
    class="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
    @click="isMobileOpen = false"
  ></div>

  <aside
    :class="[
      'fixed top-0 left-0 h-screen bg-white border-r border-gray-100 z-50 transition-transform duration-300 w-64 flex flex-col',
      isMobileOpen
        ? 'translate-x-0 shadow-2xl'
        : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <div class="h-20 flex items-center justify-center border-b border-gray-50">
      <div class="flex items-center gap-2">
        <i class="pi pi-waves text-brand-500 text-2xl"></i>
        <h1 class="text-2xl font-bold text-gray-800 tracking-tight">
          Acqua<span class="text-brand-500">Kids</span>
        </h1>
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-2">
      <a
        v-for="item in menuItems"
        :key="item.route"
        @click="navigate(item.route)"
        class="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group font-medium"
        :class="
          route.path === item.route
            ? 'bg-brand-50 text-brand-600 shadow-sm'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        "
      >
        <i
          :class="[
            item.icon,
            route.path === item.route
              ? 'text-brand-500'
              : 'text-gray-400 group-hover:text-gray-600',
          ]"
        ></i>
        <span>{{ item.label }}</span>
      </a>
    </nav>

    <div class="p-4 border-t border-gray-50">
      <button
        @click="handleLogout"
        class="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium"
      >
        <i class="pi pi-sign-out"></i>
        <span>Sair do Sistema</span>
      </button>
    </div>
  </aside>
</template>
