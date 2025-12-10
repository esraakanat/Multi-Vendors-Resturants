import { useState } from "react"
import pricingTitle from "@/assets/home-assets/Pricing Packages.svg"
import intersectPink from "@/assets/home-assets/Intersect-pink.svg"
import intersectOrange from "@/assets/home-assets/Intersect-orange.svg"
import checkIcon from "@/assets/home-assets/check.svg"
import { Button } from "@/components/ui/button"

// بيانات الخطط الثلاثة
const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    features: ["Services", "Services", "Services", "Services", "Services", "Services"],
    defaultAccent: "pink", 
  },
  {
    name: "Premium",
    price: "$45",
    period: "/month",
    features: ["Reservation", "Ordering", "Marketing", "Services", "Services", "Services"],
    defaultAccent: "orange",
  },
  {
    name: "Enterprise",
    price: "$75",
    period: "/month",
    features: ["Services", "Services", "Services", "Services", "Services", "Services"],
    defaultAccent: "pink", 
  },
]

function PricingPackages() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className="w-full bg-white py-16 px-6">
      <div className="container mx-auto max-w-7xl">
    
        <div className="flex justify-center mb-16">
          <img src={pricingTitle} alt="Pricing Packages" className="h-10 md:h-10 w-auto" />
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 xl:gap-32">
          {plans.map((plan, index) => {
            const isPremium = plan.defaultAccent === "orange"
            const isHovered = hoveredIndex === index
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index

            return (
              <div
                key={plan.name}
                className="group relative flex flex-col rounded-3xl border border-gray-100 bg-white shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
               
                <div className="relative w-full h-40">
                 
                  {/* صورة الوردي */}
                  <img
                    src={intersectPink}
                    alt="pink accent"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 rounded-br-full ${
                      isHovered || (isPremium && !isOtherHovered) ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  
                  {/* صورة البرتقالي */}
                  <img
                    src={intersectOrange}
                    alt="orange accent"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 rounded-br-full ${
                      isHovered || (isPremium && !isOtherHovered) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  
                  {/* الاسم والسعر داخل الصورة */}
                  <div className="relative z-10 px-6 pt-8 pb-4">
                    <div className="space-y-2">
                      {/* اسم الخطة */}
                      <h3 className={`text-xl font-heading font-semibold transition-colors duration-300 ${
                        isHovered || (isPremium && !isOtherHovered) ? "text-white" : "text-[#3E3E3E]"
                      }`}>
                        {plan.name}
                      </h3>
                      
                      {/* السعر والفترة */}
                      <div className="flex items-baseline gap-2">
                        <span className={`text-3xl font-heading font-bold transition-colors duration-300 ${
                          isHovered || (isPremium && !isOtherHovered) ? "text-white" : "text-[#3E3E3E]"
                        }`}>
                          {plan.price}
                        </span>
                        <span className={`text-sm font-sans transition-colors duration-300 ${
                          isHovered || (isPremium && !isOtherHovered) ? "text-white/90" : "text-[#3E3E3E]"
                        }`}>
                          {plan.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* محتوى الكارد (الميزات والزر) */}
                <div className="px-6 pb-8 space-y-6 mt-12">
                  {/* قائمة الميزات */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-sm font-sans text-[#272727]">
                        <img src={checkIcon} alt="check" className="h-4 w-4" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* زر Select Plan */}
                  <Button
                    className={`w-full rounded-md h-11 text-sm font-sans font-medium transition-colors duration-300 ${
                      isHovered || (isPremium && !isOtherHovered)
                        ? "bg-[#F44D4D] hover:bg-[#d93c3c] text-white" 
                        : "bg-[#FFEDED] text-[#272727]"
                    }`}
                  >
                    Select Plan
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PricingPackages
