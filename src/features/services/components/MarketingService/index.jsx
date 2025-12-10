import checkIcon from "@/assets/home-assets/check.svg"

function MarketingService() {
  const features = [
    "Social media integration",
    "Email marketing campaigns",
    "Promotional offers management",
    "Customer loyalty programs",
    "Analytics and insights",
    "Multi-platform listing"
  ]

  return (
    <div className="w-full bg-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#272727] mb-4">
            Marketing Solutions
          </h2>
          <p className="text-base md:text-lg font-sans text-gray-600 max-w-2xl mx-auto">
            Grow your customer base and increase revenue with our comprehensive marketing tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-start gap-3">
                <img src={checkIcon} alt="check" className="h-5 w-5 flex-shrink-0 mt-1" />
                <span className="text-base font-sans text-[#272727] leading-relaxed">
                  {feature}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="bg-gradient-to-r from-[#FFEDED] to-[#FFF8F8] rounded-lg p-8 md:p-12 text-center">
          <h3 className="text-2xl font-heading font-semibold text-[#272727] mb-4">
            Reach More Customers
          </h3>
          <p className="text-base md:text-lg font-sans text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get listed on over 100 national and international platforms automatically. Our marketing tools help you attract new customers, retain existing ones, and boost your restaurant's visibility online.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MarketingService

