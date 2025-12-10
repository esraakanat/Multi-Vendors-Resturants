import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import httpClient from "@/lib/axios"

// Transform API cart item to app cart item format
const transformCartItem = (apiItem) => {
  const product = apiItem.product || {}
  const cartItemId = apiItem.id ? String(apiItem.id) : `temp-${Date.now()}`
  
  return {
    id: cartItemId, // Use API cart item ID
    cartItemId: cartItemId, // Keep for reference
    productId: product.id || apiItem.product_id,
    name: product.name || "Product",
    image: product.image || "",
    price: Number(product.price) || 0,
    originalPrice: Number(product.original_price || product.price) || 0,
    discountPercent: product.discount_percentage || 0,
    quantity: Number(apiItem.quantity) || 1,
    variant: apiItem.variant || null,
    modifiers: apiItem.modifiers || [],
    isSelected: true,
    specialRequest: apiItem.special_request || apiItem.notes || "",
  }
}

// Transform app cart item to API format
const transformToApiFormat = (item) => {
  return {
    product_id: item.productId,
    quantity: item.quantity,
    variant_id: item.variant?.id || null,
    modifier_ids: item.modifiers?.map((m) => m.id) || [],
    special_request: item.specialRequest || "",
    notes: item.specialRequest || "",
  }
}

// Fetch cart from API
async function fetchCart() {
  const { data } = await httpClient.get("/carts")
  const response = data?.data || data || []
  
  // Transform API response to app format
  return Array.isArray(response) ? response.map(transformCartItem) : []
}

// Add item to cart via API
async function addCartItem(itemData) {
  const formData = new FormData()
  formData.append("product_id", itemData.product_id)
  formData.append("quantity", itemData.quantity)
  if (itemData.variant_id) formData.append("variant_id", itemData.variant_id)
  if (itemData.modifier_ids?.length > 0) {
    itemData.modifier_ids.forEach((id) => {
      formData.append("modifier_ids[]", id)
    })
  }
  if (itemData.special_request) formData.append("special_request", itemData.special_request)
  if (itemData.notes) formData.append("notes", itemData.notes)

  const { data } = await httpClient.post("/carts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  const response = data?.data || data
  return Array.isArray(response) ? response.map(transformCartItem) : [transformCartItem(response)]
}

// Update cart item via API
async function updateCartItem(cartItemId, itemData) {
  const formData = new FormData()
  formData.append("quantity", itemData.quantity)
  if (itemData.special_request) formData.append("special_request", itemData.special_request)
  if (itemData.notes) formData.append("notes", itemData.notes)

  const { data } = await httpClient.put(`/carts/${cartItemId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  const response = data?.data || data
  return Array.isArray(response) ? response.map(transformCartItem) : [transformCartItem(response)]
}

// Delete cart item via API
async function deleteCartItem(cartItemId) {
  await httpClient.delete(`/carts/${cartItemId}`)
  return cartItemId
}

// React Query hooks
export function useCartAPI() {
  const isLoggedIn = !!localStorage.getItem("access_token")
  
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    enabled: isLoggedIn, // Only fetch when logged in
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 1,
  })
}

export function useAddCartItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addCartItem,
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data)
      // Sync with localStorage
      try {
        localStorage.setItem("cart", JSON.stringify(data))
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error)
      }
    },
    onError: (error) => {
      console.error("Add cart item error:", error)
    },
  })
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ cartItemId, itemData }) => updateCartItem(cartItemId, itemData),
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data)
      // Sync with localStorage
      try {
        localStorage.setItem("cart", JSON.stringify(data))
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error)
      }
    },
    onError: (error) => {
      console.error("Update cart item error:", error)
    },
  })
}

export function useDeleteCartItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: (cartItemId) => {
      queryClient.setQueryData(["cart"], (oldData) => {
        const newData = (oldData || []).filter((item) => item.cartItemId !== String(cartItemId))
        // Sync with localStorage
        try {
          localStorage.setItem("cart", JSON.stringify(newData))
        } catch (error) {
          console.error("Failed to save cart to localStorage:", error)
        }
        return newData
      })
    },
    onError: (error) => {
      console.error("Delete cart item error:", error)
    },
  })
}

export { fetchCart, addCartItem, updateCartItem, deleteCartItem, transformCartItem, transformToApiFormat }

