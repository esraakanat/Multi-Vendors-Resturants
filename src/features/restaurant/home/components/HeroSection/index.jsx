import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import heroImage from "@/assets/restaurant-assets/home/Hero img.png"
import locationIcon from "@/assets/restaurant-assets/home/location.svg"
import starIcon from "@/assets/restaurant-assets/home/star.svg"
import { appRoutes } from "@/routes/routeDefinitions"
import AuthModal from "@/shared/components/AuthModal"
import { useSliders } from "../../services/querySliders"

function HeroSection({ restaurantSlug = "tempora" }) {
  const navigate = useNavigate()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { data: sliders, isLoading } = useSliders(restaurantSlug)

  // Extract all images from the API response
  const allImages = useMemo(() => {
    if (!sliders) return []
    
    if (Array.isArray(sliders) && sliders.length > 0) {
      const firstSlider = sliders[0]
      // Get images array from API structure: data[0].images
      return firstSlider?.images || []
    }
    return []
  }, [sliders])

  // Auto-rotate images every 10 seconds - simple solution
  useEffect(() => {
    if (allImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        return (prevIndex + 1) % allImages.length
      })
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [allImages.length])


  return (
    <>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        redirectTo={appRoutes.reserveDetails.main}
      />
    <section className="relative bg-[#FCF9F3] w-full min-h-[600px] md:min-h-[600px] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full mt-12 lg:mt-0 mx-auto">
        {/* Left Section - Text Content */}
        <div className=" relative z-10 flex items-center justify-center px-6 md:px-12 lg:px-16 py-16 md:py-24">
          <div className="max-w-lg space-y-8">
            {/* Heading */}
            <h1 className="text-4xl md:text-3xl lg:text-5xl lg:text-4xl font-heading font-bold text-[#272727] leading-tight">
              Best <span className="text-[#E87808]">Food</span>, Best <span className="text-[#E87808]">Services</span>!
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-2xl font-sans font-semibold text-[#272727] leading-relaxed">
              Sandwiches, Fries & Burger with best taste awaits you.
            </p>

            {/* Location */}
            <div className="flex items-center gap-3">
              <img 
                src={locationIcon} 
                alt="location" 
                className="w-6 h-6 flex-shrink-0" 
              />
              <a 
                href="https://maps.google.com" 
                className="text-base lg:text-lg font-sans text-blue-600 underline hover:text-blue-700 transition-colors"
              >
                2255 Nw 2nd Ave, Miami, FL 37214
              </a>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <span className="text-base lg:text-lg font-sans text-[#272727] font-medium">
                Rating:
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <img 
                    key={i} 
                    src={starIcon} 
                    alt="star" 
                    className="w-5 h-5 lg:w-6 lg:h-6" 
                  />
                ))}
              </div>
              <span className="text-base md:text-lg font-sans text-[#272727] font-medium">
                5.0
              </span>
            </div>

            {/* Reserve Button */}
            <Button
              className="bg-[#E87808] hover:bg-[#d66a07] text-white font-sans text-base lg:text-lg px-16 py-6 rounded-lg w-full md:w-auto"
              onClick={() => {
                // Check if user is logged in
                const isLoggedIn = !!localStorage.getItem("access_token")
                if (isLoggedIn) {
                  // If logged in, navigate directly to reserve details page
                  navigate(appRoutes.reserveDetails.main)
                } else {
                  // If not logged in, show login/register modal
                  setIsAuthModalOpen(true)
                }
              }}
            >
              Reserve a table
            </Button>
          </div>
        </div>

        {/* Right Section - Hero Image/Slider */}
        <div className="relative overflow-hidden md:mt-6 lg:mt-24 lg:mr-24">
          <div className="relative z-10 h-full flex items-center md:items-start justify-end p-6 md:p-12 md:pt-20 lg:pt-12 lg:pl-0">
            {isLoading ? (
              <div className="w-full md:w-[120%] lg:w-full h-[400px] md:h-[500px] bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                <p className="text-gray-400">Loading...</p>
              </div>
            ) : allImages.length > 0 ? (
              // Simple image slider - show one image at a time with same size
              <div className="relative w-full md:w-[120%] lg:max-w-xl overflow-hidden">
                {/* Reference image to maintain container height */}
                <img
                  src={allImages[currentImageIndex]}
                  alt="Reference"
                  className="w-full h-auto object-cover rounded-lg translate-x-4 md:translate-x-16 md:-translate-y-4 xl:translate-x-16 lg:translate-y-0 opacity-0 pointer-events-none"
                  aria-hidden="true"
                />
                {/* All images with same size */}
                {allImages.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Slider image ${index + 1}`}
                    className={`absolute top-0 left-0 w-full h-auto object-cover rounded-lg translate-x-4 md:translate-x-16 md:-translate-y-4 xl:translate-x-16 lg:translate-y-0 transition-opacity duration-1000 ${
                      index === currentImageIndex
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0"
                    }`}
                    onError={(e) => {
                      // Fallback to default image if API image fails to load
                      e.target.src = heroImage
                    }}
                  />
                ))}
              </div>
            ) : (
              // Fallback: show default image if no images from API or error
              <img 
                src={heroImage} 
                alt="Delicious food" 
                className="w-auto h-auto object-cover rounded-lg translate-x-4 md:translate-x-16 md:-translate-y-4 xl:translate-x-16 lg:translate-y-0 transition-opacity duration-1000"
              />
            )}
          </div>
        </div>
      </div>

 
    </section>
    </>
  )
}

export default HeroSection

