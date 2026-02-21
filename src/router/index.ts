import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/core/stores/auth'
import AppLayout from '@/layouts/AppLayout.vue'

const LoginView = () => import('@/modules/auth/views/LoginView.vue')
const AssessmentsView = () =>
  import('@/modules/assessments/views/AssessmentsView.vue')
const AttendanceView = () =>
  import('@/modules/attendance/views/AttendanceView.vue')
const DashboardView = () =>
  import('@/modules/dashboard/views/DashboardView.vue')
const StudentsView = () => import('@/modules/students/views/StudentsView.vue')
const ReportsView = () => import('@/modules/reports/views/ReportsView.vue')
const ClassesView = () => import('@/modules/classes/views/ClassesView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { public: true },
    },
    {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'dashboard', component: DashboardView },
        {
          path: 'assessments',
          name: 'assessments',
          component: AssessmentsView,
        },
        { path: 'attendance', name: 'attendance', component: AttendanceView },
        { path: 'students', name: 'students', component: StudentsView },
        { path: 'reports', name: 'reports', component: ReportsView },
        { path: 'classes', name: 'classes', component: ClassesView },

        // Rotas Admin — dentro do AppLayout para herdar sidebar/navbar
        {
          path: 'admin/usuarios',
          name: 'admin-usuarios',
          component: () =>
            import('@/modules/admin/views/AdminUsuariosView.vue'),
          meta: { requiresAdmin: true },
        },
        {
          path: 'admin/habilidades',
          name: 'admin-habilidades',
          component: () => import('@/modules/admin/views/HabilidadesView.vue'),
          meta: { requiresAdmin: true },
        },
      ],
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (!authStore.token) {
    authStore.checkAuth()
  }

  const isAuthenticated = !!authStore.token
  const requiresAuth = to.matched.some((r) => r.meta.requiresAuth)
  const requiresAdmin = to.matched.some((r) => r.meta.requiresAdmin)

  if (requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  if (to.path === '/login' && isAuthenticated) {
    return next('/')
  }

  if (requiresAdmin && authStore.userRole !== 'ADMIN') {
    return next('/')
  }

  next()
})

export default router
