function AboutStats() {
  const stats = [
    {
      number: "100+",
      label: "Restaurants",
      description: "Trusted by restaurants worldwide"
    },
    {
      number: "30%",
      label: "More Bookings",
      description: "Average increase in reservations"
    },
    {
      number: "24/7",
      label: "Support",
      description: "Always here when you need us"
    },
    {
      number: "99.9%",
      label: "Uptime",
      description: "Reliable service guarantee"
    }
  ]

  return (
    <div className="w-full bg-[#FFF8F8] py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#272727] mb-4">
            By The Numbers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md text-center"
            >
              <div className="text-3xl font-heading font-bold text-[#EC2323] mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-heading font-semibold text-[#272727] mb-2">
                {stat.label}
              </div>
              <div className="text-sm font-sans text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutStats

