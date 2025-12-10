import { useQuery } from "@tanstack/react-query"
import httpClient from "@/lib/axios"

const DEFAULT_CATEGORIES_ENDPOINT =
  import.meta.env.VITE_MENU_CATEGORIES_ENDPOINT ||
  "/categories?with_products=1&restaurant_admin_id=8&sort_term=desc&sort_by=name"

async function fetchMenuCategories(endpoint = DEFAULT_CATEGORIES_ENDPOINT) {
  const { data } = await httpClient.get(endpoint)
  return data?.data || data || []
}

export function useMenuCategories(endpoint) {
  const categoriesEndpoint = endpoint || DEFAULT_CATEGORIES_ENDPOINT

  return useQuery({
    queryKey: ["menu-categories", categoriesEndpoint],
    queryFn: () => fetchMenuCategories(categoriesEndpoint),
  })
}

export { fetchMenuCategories }

