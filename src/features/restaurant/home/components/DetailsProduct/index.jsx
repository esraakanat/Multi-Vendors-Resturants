import { useEffect, useMemo, useState } from "react"
import foodimage from "@/assets/restaurant-assets/home/detailsimg.png"
import { useCart } from "@/features/restaurant/cart/context/useCart"

function DetailsProduct({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1)
  const [isVariantsOpen, setIsVariantsOpen] = useState(false)
  const [isModifiersOpen, setIsModifiersOpen] = useState(false)
  const [selectedVariantId, setSelectedVariantId] = useState(null)
  const [selectedModifierIds, setSelectedModifierIds] = useState([])
  const [specialRequest, setSpecialRequest] = useState("")
  const { addItem } = useCart()

  useEffect(() => {
    if (!isOpen) return

    setQuantity(1)
    setSelectedVariantId(null)
    setSelectedModifierIds([])
    setSpecialRequest("")
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen, product])

  // Get variants from API
  const variants = useMemo(() => {
    if (product?.variants?.length) {
      return product.variants.map((variant, index) => ({
        id: variant.id || `${product.id}-variant-${index}`,
        name: variant.name || `Variant ${index + 1}`,
        price: Number(variant.price) || 0,
      }))
    }
    return []
  }, [product])

  // Get modifiers from API
  const modifiers = useMemo(() => {
    if (product?.modifiers?.length) {
      return product.modifiers.map((modifier, index) => ({
        id: modifier.id || `${product.id}-modifier-${index}`,
        name: modifier.name || `Modifier ${index + 1}`,
        price: Number(modifier.price) || 0,
        description: modifier.description || "",
      }))
    }
    return []
  }, [product])

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) || null
  const selectedModifiers = modifiers.filter((m) => selectedModifierIds.includes(m.id))

  // Calculate base price: use variant price if selected, otherwise use product base price
  const basePrice = selectedVariant ? selectedVariant.price : Number(product?.price) || 0

  // Calculate total modifiers price
  const modifiersPrice = selectedModifiers.reduce((sum, modifier) => sum + modifier.price, 0)

  // Calculate total price: (basePrice + modifiersPrice) * quantity
  const totalPrice = (basePrice + modifiersPrice) * quantity

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta
      return next < 1 ? 1 : next
    })
  }

  const handleSelectVariant = (variantId) => {
    setSelectedVariantId(variantId)
    setIsVariantsOpen(false)
  }

  const handleToggleModifier = (modifierId) => {
    setSelectedModifierIds((prev) => {
      if (prev.includes(modifierId)) {
        return prev.filter((id) => id !== modifierId)
      } else {
        return [...prev, modifierId]
      }
    })
  }

  const handleAddToCart = () => {
    addItem(product, {
      quantity,
      selectedVariant,
      selectedModifiers,
      specialRequest,
    })
    onClose()
  }

  if (!isOpen || !product) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 py-6 sm:py-10"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="close details"
      />
      <div className="relative z-10 w-11/12 lg:w-full max-w-4xl rounded-[32px] bg-[#FFFCFC] shadow-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] lg:max-h-none lg:h-auto flex flex-col">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 text-2xl text-[#272727] hover:text-[#E87808]"
          aria-label="Close"
        >
          ×
        </button>
        <div className="grid gap-0.5 lg:gap-8 px-6 pb-6 pt-14 sm:pt-16 lg:p-10 grid-cols-1 lg:grid-cols-2 overflow-y-auto lg:overflow-visible flex-1">
          <div className="flex justify-center items-center">
            <img
              src={product.image || foodimage}
              alt={product.name}
              className="h-3/4 w-3/4 rounded-[28px]  object-contain"
            />
          </div>
          <div className="space-y-6 w-5/6">
            <div>
              <h3 className="text-2xl font-heading font-semibold text-[#272727]">
                {product.name}
              </h3>
              <div className="mt-2">
                {selectedVariant ? (
                  <div className="flex items-center gap-2">
                    <p className="text-lg text-[#626262] line-through">
                      {product.price ? `${product.price} $` : ""}
                    </p>
                    <p className="text-xl font-semibold text-[#E87808]">
                      {selectedVariant.price} $
                    </p>
                  </div>
                ) : (
                  <p className="text-xl font-semibold text-[#E87808]">
                    {product.price ? `${product.price} $` : "—"}
                  </p>
                )}
                {modifiersPrice > 0 && (
                  <p className="text-sm text-[#626262] mt-1">
                    + {modifiersPrice.toFixed(2)} $ (add-ons)
                  </p>
                )}
              </div>
              <p className="mt-4 text-sm font-sans text-[#303148] leading-relaxed">
                {(product.description ||
                  "The shrimp version of Vongole Rosso dish, clams mixed with pasta, tomatoes and garlic.")
                  .split(" ")
                  .slice(0, 12)
                  .join(" ")}
              </p>
            </div>

            {/* Variants Section */}
            {variants.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-semibold text-[#303148]">Size / Variant</div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsVariantsOpen((prev) => !prev)}
                    className="flex w-3/4 items-center justify-between rounded-lg shadow-md border border-white bg-white px-4 py-1.5 text-left text-sm font-medium text-[#272727] focus:outline-none"
                  >
                    {selectedVariant ? selectedVariant.name : "Choose Size"}
                    <span className="text-lg text-[#E87808]">{isVariantsOpen ? "−" : "+"}</span>
                  </button>
                  {isVariantsOpen && (
                    <div className="absolute z-20 mt-2 w-3/4 rounded-xl border border-gray-100 bg-white shadow-lg max-h-60 overflow-y-auto">
                      {/* Option to select base product */}
                      <button
                        type="button"
                        onClick={() => handleSelectVariant(null)}
                        className={`flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-[#FFF8F2] ${
                          !selectedVariant ? "bg-[#FFF8F2]" : ""
                        }`}
                      >
                        <span className="text-[#272727]">{product.name} (Base)</span>
                        <span className="text-[#E87808]">{product.price || 0}$</span>
                      </button>
                      {variants.map((variant) => (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => handleSelectVariant(variant.id)}
                          className={`flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-[#FFF8F2] ${
                            selectedVariantId === variant.id ? "bg-[#FFF8F2]" : ""
                          }`}
                        >
                          <span className="text-[#272727]">{variant.name}</span>
                          <span className="text-[#E87808]">{variant.price}$</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Modifiers Section */}
            {modifiers.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-semibold text-[#303148]">Add-ons / Modifiers</div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsModifiersOpen((prev) => !prev)}
                    className="flex w-3/4 items-center justify-between rounded-lg shadow-md border border-white bg-white px-4 py-1.5 text-left text-sm font-medium text-[#272727] focus:outline-none"
                  >
                    {selectedModifiers.length > 0
                      ? `${selectedModifiers.length} selected`
                      : "Add extras"}
                    <span className="text-lg text-[#E87808]">{isModifiersOpen ? "−" : "+"}</span>
                  </button>
                  {isModifiersOpen && (
                    <div className="absolute z-20 mt-2 w-3/4 rounded-xl border border-gray-100 bg-white shadow-lg max-h-60 overflow-y-auto">
                      {modifiers.map((modifier) => {
                        const isSelected = selectedModifierIds.includes(modifier.id)
                        return (
                          <button
                            key={modifier.id}
                            type="button"
                            onClick={() => handleToggleModifier(modifier.id)}
                            className={`flex w-full items-start justify-between px-4 py-3 text-sm hover:bg-[#FFF8F2] ${
                              isSelected ? "bg-[#FFF8F2]" : ""
                            }`}
                          >
                            <div className="flex-1 text-left">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                    isSelected
                                      ? "bg-[#E87808] border-[#E87808]"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {isSelected && (
                                    <span className="text-white text-xs font-bold">✓</span>
                                  )}
                                </span>
                                <span className="text-[#272727] font-medium">{modifier.name}</span>
                                <span className="text-[#E87808]">+{modifier.price}$</span>
                              </div>
                              {modifier.description && (
                                <p className="text-xs text-[#626262] mt-1 ml-6">
                                  {modifier.description}
                                </p>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-sm font-semibold text-[#303148]">Special Request</div>
              <input
                rows={3}
                value={specialRequest}
                onChange={(event) => setSpecialRequest(event.target.value)}
                placeholder="Tell us if you have: an allergy  you don't like, etc."
                className="w-full  rounded-lg border border-white bg-white shadow-sm px-4 py-3 text-xs text-[#272727] placeholder:text-[#B0B0B0] placeholder:text-xxs focus:border-[#E87808] focus:outline-none"
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
              <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex justify-between gap-6 rounded-md bg-[#E7302A] px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#d22a25]"
              >
                Add to Cart
                <span className="text-sm font-semibold text-white">
                  {totalPrice ? `${totalPrice.toFixed(2)}$` : "—"}
                </span>
              </button>
              </div>
              <div className="flex justify-between w-3/4 lg:w-auto items-center rounded-md border border-white bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  className="h-8 w-8 text-xl text-[#272727]"
                >
                  −
                </button>
                <div className="w-12 text-center text-sm font-semibold text-[#272727]">{quantity}</div>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  className="h-8 w-8 text-xl text-[#272727]"
                >
                  +
                </button>
              </div>
          
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsProduct
