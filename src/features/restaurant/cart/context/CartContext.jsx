import { useMemo, useState, useEffect, useRef } from "react"
import { CartContext } from "./cartContextInstance"
import { useCartAPI, useAddCartItem, useUpdateCartItem, useDeleteCartItem, transformToApiFormat } from "../services/queryCart"

const buildCartItemId = (product, selectedVariant, selectedModifiers) => {
  const baseId = product?.id ? String(product.id) : `temp-${product?.name || Date.now()}`
  const variantId = selectedVariant?.id || "default"
  const modifiersIds = selectedModifiers?.length
    ? selectedModifiers.map((m) => m.id).sort().join("-")
    : "default"
  return `${baseId}-${variantId}-${modifiersIds}`
}

const getOriginalPrice = (product, calculatedPrice) => {
  const fallback = Number(calculatedPrice) || Number(product?.price) || 0
  const original =
    product?.originalPrice ??
    product?.original_price ??
    product?.compare_at_price ??
    product?.basePrice ??
    fallback

  return Number(original) || fallback
}

const getDiscountPercent = (price, originalPrice, product) => {
  if (product?.discountPercent || product?.discount_percentage || product?.discount) {
    return (
      product.discountPercent ||
      product.discount_percentage ||
      product.discount ||
      0
    )
  }

  if (originalPrice > price && originalPrice > 0) {
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  return 0
}

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem("cart")
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error)
  }
  return []
}

// Save cart to localStorage
const saveCartToStorage = (items) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items))
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error)
  }
}

export function CartProvider({ children }) {
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("access_token")
  const hasSyncedRef = useRef(false) // Track if we've synced localStorage to API
  const isUpdatingRef = useRef(false) // Track if we're currently updating quantity
  
  // Fetch cart from API if logged in
  const { data: apiCartItems, isLoading: isLoadingCart, refetch: refetchCart } = useCartAPI()
  const addCartItemMutation = useAddCartItem()
  const updateCartItemMutation = useUpdateCartItem()
  const deleteCartItemMutation = useDeleteCartItem()
  
  // Initialize items from localStorage or API
  const [items, setItems] = useState(() => {
    if (isLoggedIn) {
      // If logged in, wait for API data
      return []
    }
    // If not logged in, use localStorage
    return loadCartFromStorage()
  })

  // Sync with API when logged in
  useEffect(() => {
    if (isLoggedIn) {
      if (apiCartItems !== undefined && !isLoadingCart) {
        // Merge localStorage cart with API cart when user logs in (only once)
        const localCart = loadCartFromStorage()
        
        if (!hasSyncedRef.current && localCart.length > 0 && apiCartItems.length === 0) {
          // If user has local cart but no API cart, sync local to API (only once)
          hasSyncedRef.current = true
          const syncPromises = localCart
            .filter((item) => item.productId) // Only sync items with valid productId
            .map((item) => {
              const apiData = transformToApiFormat(item)
              return addCartItemMutation.mutateAsync(apiData).catch((error) => {
                console.error("Failed to sync cart item to API:", error)
              })
            })
          Promise.all(syncPromises).then(() => {
            refetchCart()
            // Clear localStorage after sync
            localStorage.removeItem("cart")
          })
        } else {
          // Use API cart (it's the source of truth when logged in)
          // But don't overwrite if we're in the middle of an update
          if (!isUpdatingRef.current) {
            setItems(apiCartItems)
            saveCartToStorage(apiCartItems)
          }
        }
      }
    } else {
      // When logged out, clear cart from localStorage (cart belongs to logged-in user)
      hasSyncedRef.current = false // Reset sync flag when logged out
      setItems([])
      localStorage.removeItem("cart") // Clear cart when user logs out
    }
  }, [apiCartItems, isLoggedIn, isLoadingCart])

  // Save to localStorage whenever items change (for offline support)
  useEffect(() => {
    if (items.length > 0) {
      saveCartToStorage(items)
    }
  }, [items])

  const addItem = async (
    product,
    { quantity = 1, selectedVariant, selectedModifiers, specialRequest } = {}
  ) => {
    if (!product) return

    // Calculate base price: use variant price if selected, otherwise use product base price
    const basePrice = selectedVariant
      ? Number(selectedVariant.price) || 0
      : Number(product?.price) || 0

    // Calculate modifiers price
    const modifiersPrice =
      selectedModifiers?.length > 0
        ? selectedModifiers.reduce((sum, modifier) => sum + (Number(modifier.price) || 0), 0)
        : 0

    // Total price: basePrice + modifiersPrice
    const price = basePrice + modifiersPrice
    const originalPrice = getOriginalPrice(product, price)
    const discountPercent = getDiscountPercent(price, originalPrice, product)
    const cartItemId = buildCartItemId(product, selectedVariant, selectedModifiers)

    // Check if item already exists
    const existing = items.find((item) => item.id === cartItemId)

    if (existing) {
      // Update quantity
      const newQuantity = existing.quantity + quantity
      if (isLoggedIn && existing.cartItemId) {
        // Update via API
        try {
          await updateCartItemMutation.mutateAsync({
            cartItemId: existing.cartItemId,
            itemData: { quantity: newQuantity, special_request: specialRequest || existing.specialRequest },
          })
          await refetchCart()
        } catch (error) {
          console.error("Failed to update cart item via API:", error)
          // Fallback to local update
          setItems((prev) =>
            prev.map((item) =>
              item.id === cartItemId
                ? {
                    ...item,
                    quantity: newQuantity,
                    specialRequest: specialRequest || item.specialRequest,
                  }
                : item
            )
          )
        }
      } else {
        // Update locally
        setItems((prev) =>
          prev.map((item) =>
            item.id === cartItemId
              ? {
                  ...item,
                  quantity: newQuantity,
                  specialRequest: specialRequest || item.specialRequest,
                }
              : item
          )
        )
      }
      return
    }

    // Build item name with variant and modifiers
    let itemName = product.name || "Product Name"
    if (selectedVariant) {
      itemName = `${itemName} - ${selectedVariant.name}`
    }
    if (selectedModifiers?.length > 0) {
      const modifiersNames = selectedModifiers.map((m) => m.name).join(", ")
      itemName = `${itemName} (${modifiersNames})`
    }

    const newItem = {
      id: cartItemId,
      cartItemId: null, // Will be set after API response
      productId: product.id || cartItemId,
      name: itemName,
      image: product.image || product.thumbnail || "",
      price,
      originalPrice,
      discountPercent,
      quantity,
      variant: selectedVariant || null,
      modifiers: selectedModifiers || [],
      isSelected: true,
      specialRequest: specialRequest || "",
    }

    if (isLoggedIn) {
      // Add via API
      try {
        const apiData = transformToApiFormat(newItem)
        await addCartItemMutation.mutateAsync(apiData)
        await refetchCart()
      } catch (error) {
        console.error("Failed to add cart item via API:", error)
        // Fallback to local add
        setItems((prev) => [...prev, newItem])
      }
    } else {
      // Add locally
      setItems((prev) => [...prev, newItem])
    }
  }

  const updateQuantity = async (itemId, nextQuantity) => {
    const finalQuantity = nextQuantity < 1 ? 1 : nextQuantity
    const item = items.find((item) => item.id === itemId)
    if (!item) return

    // Mark that we're updating to prevent useEffect from overwriting
    isUpdatingRef.current = true

    // OPTIMISTIC UPDATE: Update local state immediately for instant UI feedback
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: finalQuantity }
          : item
      )
    )

    if (isLoggedIn && item?.cartItemId) {
      // Update via API
      try {
        await updateCartItemMutation.mutateAsync({
          cartItemId: item.cartItemId,
          itemData: { quantity: finalQuantity, special_request: item.specialRequest || "" },
        })
        // The mutation's onSuccess already updates the query cache
        // The useEffect will sync when apiCartItems updates, but isUpdatingRef prevents overwrite
      } catch (error) {
        console.error("Failed to update cart item via API:", error)
        // On error, keep the optimistic update - user sees their change
      } finally {
        // Clear the flag after a short delay to let the mutation's onSuccess update the cache
        setTimeout(() => {
          isUpdatingRef.current = false
        }, 200)
      }
    } else {
      // If not logged in, clear the flag immediately
      isUpdatingRef.current = false
    }
  }

  const removeItem = async (itemId) => {
    const item = items.find((item) => item.id === itemId)

    if (isLoggedIn && item?.cartItemId) {
      // Delete via API
      try {
        await deleteCartItemMutation.mutateAsync(item.cartItemId)
        await refetchCart()
      } catch (error) {
        console.error("Failed to delete cart item via API:", error)
        // Fallback to local delete
        setItems((prev) => prev.filter((item) => item.id !== itemId))
      }
    } else {
      // Delete locally
      setItems((prev) => prev.filter((item) => item.id !== itemId))
    }
  }

  const toggleItemSelection = (itemId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
      )
    )
  }

  const clearCart = async () => {
    if (isLoggedIn) {
      // Delete all items via API
      try {
        const deletePromises = items
          .filter((item) => item.cartItemId)
          .map((item) => deleteCartItemMutation.mutateAsync(item.cartItemId))
        await Promise.all(deletePromises)
        await refetchCart()
      } catch (error) {
        console.error("Failed to clear cart via API:", error)
        // Fallback to local clear
        setItems([])
        saveCartToStorage([])
      }
    } else {
      // Clear locally
      setItems([])
      saveCartToStorage([])
    }
  }

  const selectedTotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => (item.isSelected ? sum + item.price * item.quantity : sum),
        0
      ),
    [items]
  )

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const value = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    toggleItemSelection,
    clearCart,
    selectedTotal,
    totalItems,
    isLoadingCart,
    refetchCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

