import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import httpClient from "@/lib/axios"

// Fetch Profile API
async function fetchProfile() {
  const { data } = await httpClient.get("/auth/profile")

  // Handle different response structures
  const response = data?.data || data

  // Update localStorage with fresh data
  if (response?.customer) {
    localStorage.setItem("customer", JSON.stringify(response.customer))
  }

  return response
}

// Logout API
async function logoutUser() {
  const { data } = await httpClient.get("/auth/logout")

  // Handle different response structures
  const response = data?.data || data

  // Clear localStorage (including cart)
  localStorage.removeItem("access_token")
  localStorage.removeItem("customer")
  localStorage.removeItem("cart") // Clear cart when user logs out

  return response
}

// Update Profile API
async function updateProfile(profileData) {
  const formData = new FormData()
  
  if (profileData.first_name) formData.append("first_name", profileData.first_name)
  if (profileData.last_name) formData.append("last_name", profileData.last_name)
  if (profileData.name) formData.append("name", profileData.name)
  if (profileData.email) formData.append("email", profileData.email)
  if (profileData.phone) formData.append("phone", profileData.phone)
  if (profileData.profile) formData.append("profile", profileData.profile)

  const { data } = await httpClient.post("/customer-profile/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  // Handle different response structures
  const response = data?.data || data

  // Update localStorage with fresh data
  if (response?.customer) {
    localStorage.setItem("customer", JSON.stringify(response.customer))
  }

  return response
}

// React Query Hooks
export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    },
    onError: (error) => {
      console.error("Update profile error:", error)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear all queries
      queryClient.clear()
    },
    onError: (error) => {
      console.error("Logout error:", error)
      // Even if API fails, clear localStorage (including cart)
      localStorage.removeItem("access_token")
      localStorage.removeItem("customer")
      localStorage.removeItem("cart") // Clear cart when user logs out
    },
  })
}

export { fetchProfile, updateProfile, logoutUser }

