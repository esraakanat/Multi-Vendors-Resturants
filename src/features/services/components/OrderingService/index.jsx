import checkIcon from "@/assets/home-assets/check.svg"

function OrderingService() {
  const features = [
    "Online menu display",
    "Customizable ordering options",
    "Payment integration",
    "Order tracking",
    "Kitchen display system",
    "Delivery management"
  ]

  return (
    <div className="w-full bg-[#FFF8F8] py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Visual Content */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md bg-white rounded-lg p-8 shadow-lg">
              <div className="space-y-4 text-center">
                <div className="text-5xl mb-4">🍽️</div>
                <h3 className="text-2xl font-heading font-semibold text-[#272727]">
                  Digital Ordering
                </h3>
                <p className="text-base font-sans text-gray-600 leading-relaxed">
                  Accept orders online, manage them efficiently, and provide a seamless experience for both your customers and kitchen staff.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#272727]">
              Online Ordering
            </h2>
            <p className="text-base md:text-lg font-sans text-[#515151] leading-relaxed">
              Enable customers to place orders directly from your website. Manage orders, track status, and streamline your kitchen operations with our comprehensive ordering system.
            </p>
            
            {/* Features List */}
            <ul className="space-y-3 mt-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <img src={checkIcon} alt="check" className="h-5 w-5 flex-shrink-0" />
                  <span className="text-base font-sans text-[#272727]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderingService

