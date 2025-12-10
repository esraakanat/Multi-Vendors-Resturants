import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import heroImage from "@/assets/home-assets/hero-section.png"
import { appRoutes } from "@/routes/routeDefinitions"

function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center ">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
      </div>
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Text Content */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl  xl:text-5xl  font-heading font-bold leading-tight ">
              Get your own restaurant website
            </h1>
            
            <p className="text-lg md:text-xl font-sans text-gray-200 leading-relaxed max-w-lg">
              Termbi's booking solution for restaurants makes a lot of your daily business tasks much easier, so that you can fully focus on your guests.
            </p>

            {/* Call to Action Button */}
            <div className="pt-4">
              <Button
                asChild
                className="bg-[#EC2323] hover:bg-red-700 text-white font-sans text-base px-16 md:px-32 py-4 rounded-md font-medium transition-colors"
              >
                <Link to={appRoutes.auth.signup}>
                  Try Now
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Section - Laptop/Image Area (will be visible through background) */}
          <div className="hidden lg:block">
            {/* The laptop image will be visible through the background */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
