import { useQuery } from "@tanstack/react-query"
import httpClient from "@/lib/axios"

async function fetchRestaurantSettings(restaurantAdminId) {
  if (!restaurantAdminId) {
    throw new Error("Restaurant admin ID is required")
  }
  
  const { data } = await httpClient.get(
    `/restaurants/settings?restaurant_admin_id=${restaurantAdminId}`
  )
  
  // Handle different response structures
  const response = data?.data?.settings || data?.settings || data
  
  console.log("Raw Restaurant Settings API Response:", data)
  console.log("Processed Settings:", response)
  
  return response || null
}

export function useRestaurantSettings(restaurantAdminId) {
  return useQuery({
    queryKey: ["restaurant-settings", restaurantAdminId],
    queryFn: () => fetchRestaurantSettings(restaurantAdminId),
    enabled: !!restaurantAdminId, // Only fetch if restaurantAdminId is provided
  })
}

export { fetchRestaurantSettings }

