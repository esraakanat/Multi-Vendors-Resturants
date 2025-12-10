import semicircleGray from "@/assets/home-assets/semicircle-gray.png"
import semicirclePink from "@/assets/home-assets/semicircle-pink.png"
import whyTermbiLogo from "@/assets/home-assets/why-termbi.svg"

function WhyTermbi() {
  return (
    <div className="flex justify-center items-center py-16 px-6">
      <div className="relative max-w-7xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12 ">
        {/* Pink Semicircle - top Left */}
        <div className="absolute top-0 left-0">
          <img 
            src={semicirclePink} 
            alt="gray semicircle decoration" 
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </div>

         {/* Gray Semicircle - bottom right */}
        <div className="absolute bottom-0 right-0">
          <img 
          
            src={semicircleGray} 
            alt="pink semicircle decoration" 
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center space-y-8 pt-8">
          {/* Why Termbi Logo/Image - Center */}
          <div className="flex justify-center">
            <img 
              src={whyTermbiLogo} 
              alt="Why termbi" 
              className="h-12 md:h-16 w-auto"
            />
          </div>

          {/* Text Content - Under Image */}
          <div className=" max-w-3xl text-left">
            <p className="text-base md:text-lg font-sans text-[#272727] leading-relaxed">
              Termbi's booking tool allows guests to check table availability in real time and then book a table with just a few clicks. Even outside of your business hours. Your effort: Low. Your benefit: Up to 30% more bookings.
            </p>
            
            <p className="text-base md:text-lg font-sans text-[#272727] leading-relaxed">
              With Termbi, you are instantly listed on over 100 national and international platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyTermbi
