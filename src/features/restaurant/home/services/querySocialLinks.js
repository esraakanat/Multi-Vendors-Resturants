import { useQuery } from "@tanstack/react-query"
import httpClient from "@/lib/axios"

async function fetchSocialLinks(restaurantAdminId) {
  if (!restaurantAdminId) {
    throw new Error("Restaurant admin ID is required")
  }
  
  const { data } = await httpClient.get(
    `/restaurants/settings?restaurant_admin_id=${restaurantAdminId}`
  )
  
  // Handle different response structures
  const response = data?.socialLinks || data
  
  console.log("Raw Social Links API Response:", data)
  console.log("Processed Social Links:", response)
  
  return response || null
}

export function useSocialLinks(restaurantAdminId) {
  return useQuery({
    queryKey: ["social-links", restaurantAdminId],
    queryFn: () => fetchSocialLinks(restaurantAdminId),
    enabled: !!restaurantAdminId, // Only fetch if restaurantAdminId is provided
  })
}

export { fetchSocialLinks }

