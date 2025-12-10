import axios from "axios";


const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || 'https://sanad.tamkeen-dev.com/api',
})

// Add token to requests automatically
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default httpClient;