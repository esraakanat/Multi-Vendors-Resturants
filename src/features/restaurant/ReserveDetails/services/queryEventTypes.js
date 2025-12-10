import { useQuery } from "@tanstack/react-query"
import httpClient from "@/lib/axios"

async function fetchEventTypes() {
  const { data } = await httpClient.get("/event-types")

  // Handle different response structures
  const response = data?.data || data

  // Transform API response to match component format
  // API returns: [{ id: 1, name: "Birthday" }, { id: 2, name: "Wedding" }, ...]
  // Component expects: [{ value: "birthday", label: "Birthday" }, ...]
  if (Array.isArray(response)) {
    return response.map((item) => ({
      value: item.name?.toLowerCase() || item.id?.toString(),
      label: item.name || "",
      id: item.id,
    }))
  }

  return []
}

export function useEventTypes() {
  return useQuery({
    queryKey: ["eventTypes"],
    queryFn: fetchEventTypes,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })
}

export { fetchEventTypes }

