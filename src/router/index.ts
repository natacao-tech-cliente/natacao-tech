import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/core/services/supabase";
import AppLayout from "@/layouts/AppLayout.vue";

// Lazy Loading das Views
const LoginView = () => import("@/modules/auth/views/LoginView.vue");
const AssessmentsView = () =>
  import("@/modules/assessments/views/AssessmentsView.vue");
const AttendanceView = () =>
  import("@/modules/attendance/views/AttendanceView.vue");

// MUDANÇA: Importando o novo arquivo do Dashboard
const DashboardView = () =>
  import("@/modules/dashboard/views/DashboardView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { public: true },
    },
    {
      path: "/",
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "dashboard",
          component: DashboardView, // Agora usa o componente real
        },
        {
          path: "assessments",
          name: "assessments",
          component: AssessmentsView,
        },
        {
          path: "attendance",
          name: "attendance",
          component: AttendanceView,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Modo DEV: Permite acesso se não tiver sessão, só para você ver o layout
  if (requiresAuth && !session) {
    // console.warn("Modo DEV: Acesso permitido sem login."); // Comentei para limpar o console
    next();
  } else if (to.path === "/login" && session) {
    next("/");
  } else {
    next();
  }
});

export default router;
