import { useMutation } from "@tanstack/react-query"
import httpClient from "@/lib/axios"

// Login API
async function loginUser(credentials) {
  const formData = new FormData()
  formData.append("email", credentials.email)
  formData.append("password", credentials.password)

  const { data } = await httpClient.post("/auth/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  // Handle different response structures
  const response = data?.data || data

  if (response?.access_token) {
    // Store token in localStorage
    localStorage.setItem("access_token", response.access_token)
    localStorage.setItem("customer", JSON.stringify(response.customer || {}))
  }

  return response
}

// Register API
async function registerUser(userData) {
  const formData = new FormData()
  formData.append("first_name", userData.firstName)
  formData.append("last_name", userData.lastName || "")
  // Also send name as combination of first and last name for compatibility
  formData.append("name", `${userData.firstName} ${userData.lastName || ""}`.trim())
  formData.append("email", userData.email)
  formData.append("password", userData.password)
  formData.append("password_confirmation", userData.confirmPassword || userData.password)

  const { data } = await httpClient.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  // Handle different response structures
  const response = data?.data || data

  if (response?.access_token) {
    // Store token in localStorage
    localStorage.setItem("access_token", response.access_token)
    localStorage.setItem("customer", JSON.stringify(response.customer || {}))
  }

  return response
}

// React Query Hooks
export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      console.error("Login error:", error)
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
    onError: (error) => {
      console.error("Register error:", error)
    },
  })
}

export { loginUser, registerUser }

