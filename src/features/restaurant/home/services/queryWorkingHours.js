import { useQuery } from "@tanstack/react-query"
import httpClient from "@/lib/axios"

async function fetchWorkingHours(restaurantSlug) {
  if (!restaurantSlug) {
    throw new Error("Restaurant slug is required")
  }
  
  const { data } = await httpClient.get(
    `/restaurant-working-hours?restaurant_slug=${restaurantSlug}`
  )
  const response = data?.data || data
  return response || null
}

export function useWorkingHours(restaurantSlug) {
  return useQuery({
    queryKey: ["working-hours", restaurantSlug],
    queryFn: () => fetchWorkingHours(restaurantSlug),
    enabled: !!restaurantSlug, // Only fetch if restaurantSlug is provided
  })
}

export { fetchWorkingHours }

