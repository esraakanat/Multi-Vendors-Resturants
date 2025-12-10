import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../cart/context/useCart"
import { appRoutes } from "@/routes/routeDefinitions"
import CheckoutBreadcrumb from "@/shared/components/CheckoutBreadcrumb"

const paymentOptions = [
  { id: "paypal", label: "PayPal" },
  { id: "card", label: "Credit Card" },
  { id: "gpay", label: "Google Pay" },
]

function CheckoutPage() {
  const { selectedTotal } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    expiration: "",
    cvv: "",
  })
  const navigate = useNavigate()

  const deliveryFee = selectedTotal > 0 ? 30 : 0
  const grandTotal = selectedTotal + deliveryFee

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.number.trim() !== "" &&
      formData.expiration.trim() !== "" &&
      formData.cvv.trim() !== ""
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event?.preventDefault()
    if (!isFormValid()) {
      return
    }
    console.log("Checkout submitted:", { ...formData, paymentMethod, grandTotal })
    // Pass checkout data to place order page
    navigate(appRoutes.placeOrder.main, {
      state: {
        checkoutData: {
          cardholderName: formData.name,
          cardNumber: formData.number,
          expiration: formData.expiration,
          cvv: formData.cvv,
          paymentMethod: paymentMethod,
        },
      },
    })
  }

  return (
    <main className="pt-20 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <CheckoutBreadcrumb currentStep="checkout" />
      </div>
      <div className="container mx-auto max-w-6xl grid gap-8 lg:grid-cols-[2fr,1fr] mt-8">
        <div className="flex flex-col items-center gap-6 lg:w-11/12">
        <section className="bg-[#FFFCFC] lg:w-11/12 max-w-2xl rounded-3xl shadow-sm p-8 border border-[#FFECEC]">
          <h2 className="text-xl font-heading font-semibold text-center text-[#272727] mb-8">
            Payment Details
          </h2>
          <form className="space-y-6 " onSubmit={handleSubmit}>
            <div className="space-y-2 ">
              <label htmlFor="name" className="block text-sm font-medium text-[#272727]">
                Cardholder Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter Cardholder name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-11/12 rounded-lg border border-[#F0EAEA] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EC2323]/30"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="number" className=" block text-sm font-medium text-[#272727]">
                Card Number
              </label>
              <input
                id="number"
                name="number"
                type="text"
                placeholder="0000-0000-0000-0000"
                value={formData.number}
                onChange={handleChange}
                required
                className="w-11/12 rounded-lg border border-[#F0EAEA] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EC2323]/30"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 ">
                <label htmlFor="expiration" className="text-sm font-medium text-[#272727]">
                  Expiration Date
                </label>
                <input
                  id="expiration"
                  name="expiration"
                  type="text"
                  placeholder="MM/YYYY"
                  value={formData.expiration}
                  onChange={handleChange}
                  required
                  className="w-3/4 rounded-lg border border-[#F0EAEA] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EC2323]/30"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="cvv" className=" block text-sm font-medium text-[#272727]">
                  CVV
                </label>
                <input
                  id="cvv"
                  name="cvv"
                  type="text"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  className="w-3/4 rounded-lg border border-[#F0EAEA] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EC2323]/30"
                />
              </div>
            </div>
          </form>
        </section>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className={`w-1/4 max-w-2xl rounded-md py-3 mt-8 font-heading text-white text-base transition-colors ${
            isFormValid()
              ? "bg-[#EC2323] hover:bg-[#d02323] cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Place order
        </button>
        </div>
        <aside className="space-y-6 w-11/12 lg:w-5/6">
          <div className="bg-white rounded-3xl shadow-md p-10 ">
            <h3 className="text-lg font-heading font-semibold text-center text-[#272727] mb-12">
              Order Summary
            </h3>
            <div className="space-y-3 text-sm font-sans text-[#4A4A4A]">
              <div className="flex items-center justify-between">
                <span>Total Price</span>
                <span className="text-[#EC2323] font-semibold">{selectedTotal.toFixed(2)}$</span>
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
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6">
            <h3 className="text-lg font-heading font-semibold text-center text-[#272727] mb-4">
              Choose Payment Method
            </h3>
            <div className="space-y-3">
              {paymentOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center gap-3 rounded-2xl  px-4 py-3 cursor-pointer transition-colors `}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.id}
                    checked={paymentMethod === option.id}
                    onChange={() => setPaymentMethod(option.id)}
                    className="h-4 w-4 accent-[#EC2323] focus:ring-[#EC2323]"
                  />
                  <span className="text-sm font-medium text-[#272727]">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default CheckoutPage

