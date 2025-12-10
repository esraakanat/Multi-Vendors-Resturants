import { useRestaurantSettings } from "../../services/queryRestaurantSettings"

function AboutAs({ restaurantAdminId = 8 }) {
  const { data: settings, isLoading, error } = useRestaurantSettings(restaurantAdminId)

  // Get about_us text from API or use fallback
  const aboutUsText = settings?.about_us || ""

  // Split text into paragraphs (split by \r\n or \n)
  const paragraphs = aboutUsText
    ? aboutUsText.split(/\r\n|\n/).filter((p) => p.trim().length > 0)
    : []

  // Fallback content if no API data
  const fallbackContent = [
    "Welcome to FLAT BURGER, where culinary excellence meets warm hospitality.",
    "Our journey began with a passion for creating unforgettable dining experiences.",
    "At FLAT BURGER, we believe in using the freshest ingredients to craft dishes that delight the senses.",
  ]

  const displayParagraphs = paragraphs.length > 0 ? paragraphs : fallbackContent

  return (
    <section className="w-full bg-white py-16 md:py-8 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-4xl font-heading font-bold">
            <span className="text-[#E87808]">About</span>{" "}
            <span className="text-[#272727]">us</span>
          </h2>

          {/* Content - Left aligned within centered container */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6 mx-auto"></div>
              </div>
            ) : error ? (
              <p className="text-base md:text-lg font-sans text-[#272727] leading-relaxed text-red-500">
                Failed to load content. Please try again later.
              </p>
            ) : (
              displayParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base md:text-lg font-sans text-[#272727] leading-relaxed"
                >
                  {paragraph.trim()}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutAs

