<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/core/services/supabase";
import { useToast } from "primevue/usetoast";

import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Toast from "primevue/toast";
import Message from "primevue/message";

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const router = useRouter();
const toast = useToast();

async function handleLogin() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) console.warn("Modo DEV: Login simulado.");

    toast.add({
      severity: "success",
      summary: "Bem-vindo!",
      detail: "Acessando...",
      life: 2000,
    });

    setTimeout(() => {
      router.push("/");
    }, 1000);
  } catch (error: any) {
    errorMessage.value = "Erro técnico.";
  } finally {
    setTimeout(() => (loading.value = false), 1500);
  }
}
</script>

<template>
  <div class="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
    <Toast />

    <div class="flex items-center justify-center p-8 bg-white">
      <div class="w-full max-w-md space-y-6">
        <div class="text-center lg:text-left">
          <h1 class="text-3xl font-bold text-gray-900">
            Acqua<span class="text-blue-500">Kids</span>
          </h1>
          <p class="text-gray-500 mt-2">Área do Professor</p>
        </div>

        <Message v-if="errorMessage" severity="error" :closable="false">{{
          errorMessage
        }}</Message>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="flex flex-col gap-2">
            <label class="font-bold text-gray-700">E-mail</label>
            <InputText
              v-model="email"
              type="email"
              class="w-full p-3 border rounded-lg"
              placeholder="admin@acquakids.com"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-bold text-gray-700">Senha</label>
            <Password
              v-model="password"
              :feedback="false"
              toggleMask
              class="w-full"
              inputClass="w-full p-3 border rounded-lg"
            />
          </div>

          <Button
            type="submit"
            label="Entrar Agora"
            class="w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            :loading="loading"
          />
        </form>
      </div>
    </div>

    <div
      class="hidden lg:flex flex-col items-center justify-center bg-brand-600 text-white p-12"
    >
      <i class="pi pi-waves text-6xl mb-4"></i>
      <h2 class="text-4xl font-bold">Gestão Inteligente</h2>
      <p class="mt-4 text-lg text-blue-100">
        O sistema que facilita sua vida na piscina.
      </p>
    </div>
  </div>
</template>
