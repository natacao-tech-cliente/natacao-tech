import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/core/services/supabase";
import type { User, Session } from "@supabase/supabase-js";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const session = ref<Session | null>(null);
  const loading = ref(false);
  const router = useRouter();

  async function initialize() {
    loading.value = true;
    const { data } = await supabase.auth.getSession();
    session.value = data.session;
    user.value = data.session?.user ?? null;

    supabase.auth.onAuthStateChange((_event: any, _session: any) => {
      session.value = _session;
      user.value = _session?.user ?? null;

      if (!_session) {
        router.push("/login");
      }
    });
    loading.value = false;
  }

  async function signOut() {
    await supabase.auth.signOut();
    user.value = null;
    session.value = null;
    router.push("/login");
  }

  return {
    user,
    session,
    loading,
    initialize,
    signOut,
  };
});
