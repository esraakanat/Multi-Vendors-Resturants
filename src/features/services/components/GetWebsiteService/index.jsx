import checkIcon from "@/assets/home-assets/check.svg"

function GetWebsiteService() {
  const features = [
    "Fully responsive design",
    "Mobile-optimized interface",
    "Custom domain setup",
    "SEO-friendly structure",
    "Fast loading speed",
    "Social media integration",
    "Menu display system",
    "Photo gallery",
    "Contact forms",
    "Google Maps integration"
  ]

  const benefits = [
    {
      icon: "🎨",
      title: "Professional Design",
      description: "Beautiful, modern templates that reflect your restaurant's unique brand and style."
    },
    {
      icon: "📱",
      title: "Mobile First",
      description: "Your website looks perfect on all devices - desktop, tablet, and mobile phones."
    },
    {
      icon: "⚡",
      title: "Easy Management",
      description: "Update your menu, hours, and content instantly with our user-friendly dashboard."
    },
    {
      icon: "🔍",
      title: "SEO Optimized",
      description: "Built-in SEO features help customers find you on Google and other search engines."
    }
  ]

  return (
    <div className="w-full bg-white py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#272727] mb-4">
            Get Your <span className="text-[#EC2323]">Website</span>
          </h2>
          <p className="text-base md:text-lg font-sans text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create a stunning, professional website for your restaurant in minutes. No coding required, no technical skills needed.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="text-3xl mb-4 text-center">{benefit.icon}</div>
              <h3 className="text-lg font-heading font-semibold text-[#272727] mb-3 text-center">
                {benefit.title}
              </h3>
              <p className="text-sm font-sans text-gray-600 leading-relaxed text-center">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Features Section - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features List */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#272727]">
              Everything You Need
            </h3>
            <p className="text-base md:text-lg font-sans text-[#515151] leading-relaxed">
              Our website builder includes all the essential features your restaurant needs to establish a strong online presence.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <img src={checkIcon} alt="check" className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-sans text-[#272727]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Content */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🌐</div>
                    <h4 className="text-2xl font-heading font-semibold text-[#272727] mb-2">
                      Your Restaurant Online
                    </h4>
                    <p className="text-base font-sans text-gray-600 leading-relaxed">
                      Stand out from the competition with a professional website that showcases your restaurant's best features.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-[#EC2323]"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded mt-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetWebsiteService

