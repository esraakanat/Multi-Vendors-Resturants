import termbiFeature from "@/assets/home-assets/tembi-Features.svg"
import dashboardImage from "@/assets/home-assets/dashboard.png"

function DashboardSection() {
  return (
    <div className="w-full bg-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Top Section - termbi Features Title (Centered) */}
        <div className="flex justify-center mb-12 md:mb-16">
          <img 
            src={termbiFeature} 
            alt="termbi Features" 
            className="h-10 md:h-14 w-auto"
          />
        </div>

        {/* Bottom Section - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 mb-12 max-w-md">
            <h2 className="text-3xl md:text-4xl  font-heading font-semibold text-[#272727]">
              Dashboard
            </h2>
            <p className="text-base md:text-lg font-sans text-[#515151] leading-relaxed">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat.
            </p>
          </div>

          {/* Right Column - Dashboard Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg">
              <img 
                src={dashboardImage} 
                alt="Dashboard interface" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSection

