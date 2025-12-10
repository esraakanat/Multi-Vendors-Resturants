import semicircleGray from "@/assets/home-assets/semicircle-gray.png"
import semicirclePink from "@/assets/home-assets/semicircle-pink.png"

function AboutMission() {
  return (
    <div className="flex justify-center items-center py-16 px-6">
      <div className="relative max-w-7xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12">
        {/* Pink Semicircle - top Left */}
        <div className="absolute top-0 left-0">
          <img
            src={semicirclePink}
            alt="pink semicircle decoration"
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </div>

        {/* Gray Semicircle - bottom right */}
        <div className="absolute bottom-0 right-0">
          <img
            src={semicircleGray}
            alt="gray semicircle decoration"
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 space-y-8 pt-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-[#272727]">
            Our Mission
          </h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <p className="text-base md:text-lg font-sans text-gray-700 leading-relaxed text-center">
              At Termbi, our mission is to empower restaurants with cutting-edge technology that simplifies operations, enhances customer experience, and drives business growth. We believe that every restaurant deserves access to professional management tools that were once only available to large enterprises.
            </p>
            
            <p className="text-base md:text-lg font-sans text-gray-700 leading-relaxed text-center">
              Through our comprehensive platform, we enable restaurant owners to focus on what they do best—creating exceptional dining experiences—while we handle the complexities of reservations, ordering, marketing, and customer management.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMission

