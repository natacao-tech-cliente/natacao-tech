<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const toast = useToast()

const handleApiError = (e: Event) => {
  const msg = (e as CustomEvent).detail
  toast.add({
    severity: 'error',
    summary: 'Acesso Negado',
    detail: msg,
    life: 5000,
  })
}

onMounted(() => {
  window.addEventListener('api-error', handleApiError)
})

onUnmounted(() => {
  window.removeEventListener('api-error', handleApiError)
})
</script>

<template>
  <Toast />
  <router-view />
</template>
