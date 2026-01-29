import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/core/services/supabase'
import type { User, Session } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const loading = ref(false)
  const router = useRouter()

  async function initialize() {
    loading.value = true
    const { data } = await supabase.auth.getSession()
    session.value = data.session
    user.value = data.session?.user ?? null

    supabase.auth.onAuthStateChange((_event, _session) => {
      session.value = _session
      user.value = _session?.user ?? null

      if (_event === 'SIGNED_OUT') {
        router.push('/login')
      }
    })
    loading.value = false
  }

  async function signIn(email: string, pass: string) {
    loading.value = true

    // --- MOCK DE TESTE (BACKDOOR) ---
    // Se usar este e-mail, entra direto sem ir no Supabase
    if (email === 'admin@acquakids.com' && pass === '123456') {
      console.warn('⚠️ Login via MOCK (Modo de Teste)')

      // Simulando um usuário válido
      const mockUser: any = { id: 'mock-id', email: email }
      user.value = mockUser
      session.value = { access_token: 'mock-token', user: mockUser } as any

      loading.value = false
      return { success: true }
    }
    // --------------------------------

    try {
      // Tenta login REAL no Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass,
      })

      if (error) throw error

      session.value = data.session
      user.value = data.user

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    user.value = null
    session.value = null
    router.push('/login')
  }

  return {
    user,
    session,
    loading,
    initialize,
    signIn,
    signOut,
  }
})
