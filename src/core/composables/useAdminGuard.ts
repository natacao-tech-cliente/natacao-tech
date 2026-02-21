import { useRouter } from 'vue-router'
import { useAuthStore } from '@/core/stores/auth'

export function useAdminGuard() {
  const router = useRouter()
  const authStore = useAuthStore()

  function verificarAdmin(): boolean {
    if (!authStore.isAdmin) {
      router.replace('/')
      return false
    }
    return true
  }

  return {
    verificarAdmin,
    isAdmin: authStore.isAdmin,
  }
}
