<script setup lang="ts">
import AppSidebar from "./AppSidebar.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-50/50">
    <AppSidebar />

    <main class="lg:ml-64 min-h-screen transition-all duration-300">
      <header
        class="lg:hidden h-20 bg-white shadow-sm flex items-center justify-center sticky top-0 z-20"
      >
        <span class="font-bold text-lg text-gray-800">AcquaKids</span>
      </header>

      <div class="p-4 md:p-8 max-w-7xl mx-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
