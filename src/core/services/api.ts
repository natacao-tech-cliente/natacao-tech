import axios, { type InternalAxiosRequestConfig } from 'axios'
import router from '@/router'

interface RetryConfig extends InternalAxiosRequestConfig {
  _retryCount?: number
}

const MAX_RETRIES = 2
const RETRY_DELAY_MS = 1500

function limparSessao() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('role')
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 40_000,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as RetryConfig
    const status = error.response?.status

    if (
      status === 401 &&
      !config.url?.includes('/auth/login') &&
      !config.url?.includes('/auth/refresh')
    ) {
      try {
        const refreshResponse = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )

        const newToken = refreshResponse.data.token
        localStorage.setItem('token', newToken)

        config.headers!.Authorization = `Bearer ${newToken}`
        return api(config)
      } catch (refreshError) {
        limparSessao()
        if (router.currentRoute.value.path !== '/login') {
          router.push('/login')
        }
        return Promise.reject(refreshError)
      }
    }

    // Lógica de Timeout / Network error original mantida...
    const isTimeout =
      error.code === 'ECONNABORTED' || error.message?.includes('timeout')
    const isNetworkError = !error.response && error.code !== 'ERR_CANCELED'

    if ((isTimeout || isNetworkError) && config) {
      config._retryCount = (config._retryCount ?? 0) + 1
      if (config._retryCount <= MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
        return api(config)
      }
    }

    return Promise.reject(error)
  }
)

export default api
