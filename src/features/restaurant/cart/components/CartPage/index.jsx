import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/useCart"
import trashIcon from "@/assets/restaurant-assets/cart/Trash-can.svg"
import visaIcon from "@/assets/restaurant-assets/cart/visa.svg"
import masterCardIcon from "@/assets/restaurant-assets/cart/masterCard.svg"
import paypalIcon from "@/assets/restaurant-assets/cart/paypal.svg"
import payonnerIcon from "@/assets/restaurant-assets/cart/payonner.svg"
import gpayIcon from "@/assets/restaurant-assets/cart/gpay.svg"
import foodFallback from "@/assets/restaurant-assets/home/food-image1.png"
import { appRoutes } from "@/routes/routeDefinitions"
import CheckoutBreadcrumb from "@/shared/components/CheckoutBreadcrumb"

function CartPage() {
  const {
    items,
    toggleItemSelection,
    updateQuantity,
    removeItem,
    selectedTotal,
  } = useCart()
  const navigate = useNavigate()

  const deliveryFee = selectedTotal > 0 ? 30 : 0
  const grandTotal = selectedTotal + deliveryFee

  const paymentMethods = [
    { icon: visaIcon, alt: "Visa" },
    { icon: masterCardIcon, alt: "MasterCard" },
    { icon: paypalIcon, alt: "PayPal" },
    { icon: payonnerIcon, alt: "Payoneer" },
    { icon: gpayIcon, alt: "Google Pay" },
  ]

  const isCartEmpty = items.length === 0

  const handleQuantityChange = async (itemId, delta) => {
    const targetItem = items.find((item) => item.id === itemId)
    if (!targetItem) return
    const newQuantity = targetItem.quantity + delta
    if (newQuantity < 1) return
    try {
      await updateQuantity(itemId, newQuantity)
    } catch (error) {
      console.error("Failed to update quantity:", error)
    }
  }

  const handleCheckout = () => {
    if (isCartEmpty) return
    navigate(appRoutes.checkout.main)
  }

  const renderOrderSummary = () => (
    <div className="bg-white rounded-2xl shadow-md mt-12 p-8 space-y-6 ">
      <h3 className="text-lg font-heading font-semibold text-center text-[#272727]">
        Order Summary
      </h3>
      <div className="space-y-4 text-sm md:text-base font-sans text-[#515151]">
        <div className="flex items-center justify-between">
          <span>Total Price</span>
          <span className="text-[#EC2323] font-semibold">
            {selectedTotal.toFixed(2)}$
          </span>
        </div>
        <div className="flex items-center justify-between  border-b border-gray-100 py-3">
          <span>Delivery</span>
          <span className="text-[#EC2323] font-semibold">{deliveryFee}$</span>
        </div>
        <div className="flex items-center justify-between text-base font-semibold text-[#272727]">
          <span>Grand Total</span>
          <span className="text-[#EC2323]">{grandTotal.toFixed(2)}$</span>
        </div>
      </div>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isCartEmpty}
        className={`w-full rounded-xl py-3 font-heading text-base transition-colors ${
          isCartEmpty
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#EC2323] text-white hover:bg-[#d02323]"
        }`}
      >
        Checkout
      </button>
    </div>
  )

  return (
    <main className="pt-20 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <CheckoutBreadcrumb currentStep="cart" />
      </div>
      <div className="container mx-auto max-w-6xl grid gap-8 lg:grid-cols-[2fr,1fr] mt-8">
        <section className="space-y-6 md:w-11/12">
          <header className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-[#272727]">
              Your Cart
            </h1>
            {!isCartEmpty && (
              <p className="text-sm text-[#8A8A8A]">
                {items.length} item{items.length > 1 ? "s" : ""}
              </p>
            )}
          </header>

          {isCartEmpty ? (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center space-y-4">
              <p className="text-lg font-heading text-[#272727]">
                Your cart is empty
              </p>
              <p className="text-sm text-[#8A8A8A]">
                Browse the menu and add your favorite dishes.
              </p>
              <button
                type="button"
                onClick={() => navigate(appRoutes.restaurantHome.main)}
                className="inline-flex items-center justify-center rounded-lg bg-[#EC2323] px-6 py-3 text-sm font-semibold text-white hover:bg-[#d02323]"
              >
                Back to Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className={` flex flex-col  md:flex-row md:items-center  gap-4 bg-[#FFFCFC] rounded-xl shadow-sm p-4  md:p-6 transition-opacity ${
                  item.isSelected ? "" : "opacity-70"
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button
                    type="button"
                    onClick={() => toggleItemSelection(item.id)}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center ${
                      item.isSelected
                        ? "bg-[#EC2323] border-[#EC2323] text-white"
                        : "border-gray-200 bg-white text-gray-400"
                    }`}
                    aria-pressed={item.isSelected}
                  >
                    {item.isSelected && (
                      <span className="text-xs font-semibold">✓</span>
                    )}
                  </button>
                  <img
                    src={item.image || foodFallback}
                    alt={item.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover"
                  />
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-col">
                      <span className="text-sm text-[#EC2323] font-semibold">
                        {item.discountPercent > 0
                          ? `${item.discountPercent}%`
                          : ""}
                      </span>
                      <h3 className="text-lg font-heading font-semibold text-[#272727]">
                        {item.name}
                      </h3>
                    </div>
                    {item.option && (
                      <p className="text-xs text-[#8A8A8A]">Option: {item.option}</p>
                    )}
                    {item.specialRequest && (
                      <p className="text-xs text-[#8A8A8A] truncate">
                        Note: {item.specialRequest}
                      </p>
                    )}
                    <div className="flex items-center gap-3">
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-400 line-through">
                          {item.originalPrice}$
                        </span>
                      )}
                      <span className="text-md font-bold text-[#EC2323]">
                        {item.price}$
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between md:justify-end gap-4 w-full md:w-auto">
                <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="w-10 h-10 rounded-full  flex items-center justify-center hover:bg-[#FFE0E0] transition-colors"
                    aria-label="Remove item"
                  >
                    <img src={trashIcon} alt="Remove" className="w-4 h-4" />
                  </button>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-8 h-8 text-lg text-[#272727]  bg-white rounded-md  border  border-gray-200 px-2"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-8 h-8 text-lg text-[#272727]  bg-white rounded-md  border  border-gray-200 px-2"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  
                </div>
              </article>
            ))
          )}
        </section>

        <aside className="space-y-6 w-11/12 lg:w-5/6">
          {renderOrderSummary()}
          <div className="bg-white rounded-2xl shadow-md py-3 px- space-y-2">
            <h3 className="text-lg font-heading font-semibold text-center text-[#272727]">
              We Accept
            </h3>
            <div className="grid grid-cols-3 gap-0.5">
              {paymentMethods.map((method) => (
                <div
                  key={method.alt}
                  className="flex items-center justify-center rounded-xl  py-2 px-3 bg-[#FFFDFD]"
                >
                  <img src={method.icon} alt={method.alt} className="h-7" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default CartPage

