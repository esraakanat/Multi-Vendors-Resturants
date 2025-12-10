import { useMemo } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useCart } from "../../cart/context/useCart"
import { appRoutes } from "@/routes/routeDefinitions"
import CheckoutBreadcrumb from "@/shared/components/CheckoutBreadcrumb"
import { useProfile } from "@/features/restaurant/MyProfile/services/queryProfile"

function PlaceOrderComponent() {
  const { selectedTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const { data: profileData } = useProfile()

  // Get checkout data from navigation state
  const checkoutData = location.state?.checkoutData || null

  // Get customer data for phone and name
  const getCustomerData = () => {
    if (profileData?.customer) return profileData.customer
    const storedCustomer = localStorage.getItem("customer")
    if (storedCustomer) {
      try {
        return JSON.parse(storedCustomer)
      } catch {
        return null
      }
    }
    return null
  }

  const customer = getCustomerData()
  const customerName = checkoutData?.cardholderName || customer?.name || `${customer?.first_name || ""} ${customer?.last_name || ""}`.trim() || "Customer name"
  const customerPhone = customer?.phone || "+44 526 584 5364"

  // Format payment method name
  const getPaymentMethodName = (method) => {
    const methodMap = {
      card: "Credit Card",
      paypal: "PayPal",
      gpay: "Google Pay",
    }
    return methodMap[method] || method
  }
  const paymentMethodName = checkoutData?.paymentMethod ? getPaymentMethodName(checkoutData.paymentMethod) : "Credit Card"

  const deliveryFee = selectedTotal > 0 ? 30 : 0
  const grandTotal = selectedTotal + deliveryFee

  const orderCode = useMemo(() => {
    const first = Date.now().toString().slice(-10)
    const second = Math.floor(Math.random() * 9_000_000 + 1_000_000)
    return `${first} - ${second}`
  }, [])

  const handleConfirm = async () => {
    // Clear cart when confirming order
    await clearCart()
    navigate(appRoutes.confirmOrder.main)
  }

  return (
    <section className="bg-white  w-full  pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <CheckoutBreadcrumb currentStep="place-order" />
      </div>
      <div className="max-w-3xl mx-auto text-center space-y-8 mt-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-semibold text-[#4A4A4A]">
            Your Order is Ready
          </h1>
        </div>

        <div className="bg-white px-6 py-8 md:px-10 md:py-10 space-y-6">
          <div className="text-left">
            <p className="text-sm font-semibold text-[#EC2323]">Order Summary</p>
          </div>

          <div className="divide-y divide-gray-100 text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-start md:gap-24 py-3">
              <span className="text-sm font-medium text-[#4A4A4A]">Order Code</span>
              <span className="text-sm text-[#4A4A4A] mt-1 md:mt-0">{orderCode}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-start md:gap-24 py-3">
              <span className="text-sm font-medium text-[#4A4A4A]">Total Price</span>
              <span className="text-sm font-semibold text-[#EC2323] mt-1 md:mt-0">
                {grandTotal.toFixed(2)}$
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-start md:gap-32 py-3">
              <span className="text-sm font-medium text-[#4A4A4A]">Name</span>
              <span className="text-sm text-[#4A4A4A] mt-1 md:mt-0">{customerName}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-start md:gap-32 py-3">
              <span className="text-sm font-medium text-[#4A4A4A]">Phone</span>
              <span className="text-sm text-[#4A4A4A] mt-1 md:mt-0">{customerPhone}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-start md:gap-24 py-3">
              <span className="text-sm font-medium text-[#4A4A4A]">Payment Method</span>
              <span className="text-sm text-[#4A4A4A] mt-1 md:mt-0">{paymentMethodName}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-start md:gap-16 py-3">
              <span className="text-sm font-medium text-[#4A4A4A]">Delivery address</span>
              <span className="text-sm text-[#4A4A4A] mt-1 md:mt-0 md:max-w-xs">
                Lorem Ipsum has been the industry&apos;s standard dummy
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-1/2 mx-auto">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-3/4 rounded-lg bg-[#EC2323] py-3 font-heading text-white text-base hover:bg-[#d02323] transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  )
}

export default PlaceOrderComponent

