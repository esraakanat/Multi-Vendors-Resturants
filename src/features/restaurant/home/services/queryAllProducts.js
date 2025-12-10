import { useQuery } from "@tanstack/react-query"
import httpClient from "@/lib/axios"

async function fetchAllProducts(params = {}) {
  const {
    restaurantAdminId = 8,
    categoryId = null,
    sortBy = "name",
    sortTerm = "asc",
  } = params

  // Build query parameters
  const queryParams = new URLSearchParams({
    restaurant_admin_id: restaurantAdminId.toString(),
    sort_by: sortBy,
    sort_term: sortTerm,
  })

  // Add category_id only if provided
  if (categoryId) {
    queryParams.append("category_id", categoryId.toString())
  }

  const { data } = await httpClient.get(`/products?${queryParams.toString()}`)
  
  // Handle different response structures
  const response = data?.data || data || []
  
  console.log("Products API Response:", data)
  console.log("Processed Products:", response)
  
  return Array.isArray(response) ? response : []
}

export function useAllProducts(params = {}) {
  return useQuery({
    queryKey: ["all-products", params],
    queryFn: () => fetchAllProducts(params),
    enabled: !!params.restaurantAdminId,
  })
}

export { fetchAllProducts }

