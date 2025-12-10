function AboutValues() {
  const values = [
    {
      title: "Innovation",
      description: "We continuously innovate to provide the most advanced restaurant management solutions in the market.",
      icon: "💡"
    },
    {
      title: "Reliability",
      description: "Our platform is built with reliability and stability in mind, ensuring your business runs smoothly 24/7.",
      icon: "🛡️"
    },
    {
      title: "Customer Focus",
      description: "Your success is our success. We prioritize your needs and work tirelessly to exceed your expectations.",
      icon: "❤️"
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service, from product design to customer support.",
      icon: "⭐"
    }
  ]

  return (
    <div className="w-full bg-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#272727] mb-4">
            Our Values
          </h2>
          <p className="text-base md:text-lg font-sans text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-3xl mb-4 text-center">{value.icon}</div>
              <h3 className="text-xl font-heading font-semibold text-[#272727] mb-3 text-center">
                {value.title}
              </h3>
              <p className="text-sm font-sans text-gray-600 leading-relaxed text-center">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutValues

