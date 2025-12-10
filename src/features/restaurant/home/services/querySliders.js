import { useQuery } from "@tanstack/react-query"
import httpClient from "@/lib/axios"

async function fetchSliders(restaurantSlug) {
  if (!restaurantSlug) {
    throw new Error("Restaurant slug is required")
  }
  
  const { data } = await httpClient.get(
    `/sliders?slug=${restaurantSlug}`
  )
  // Handle different response structures
  const response = data?.data || data
  return response || null
}

export function useSliders(restaurantSlug) {
  return useQuery({
    queryKey: ["sliders", restaurantSlug],
    queryFn: () => fetchSliders(restaurantSlug),
    enabled: !!restaurantSlug, // Only fetch if restaurantSlug is provided
  })
}

export { fetchSliders }

