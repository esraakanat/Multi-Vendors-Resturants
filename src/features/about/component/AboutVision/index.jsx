
function AboutVision() {
    return (
      <div className="w-full bg-white py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#272727]">
                Our Vision
              </h2><p className="text-base md:text-lg font-sans text-[#515151] leading-relaxed">
We envision a future where every restaurant, regardless of size, has access to enterprise-grade management tools that help them thrive in an increasingly competitive market.
</p>
<p className="text-base md:text-lg font-sans text-[#515151] leading-relaxed">
Our goal is to become the leading platform for restaurant management, known for innovation, reliability, and exceptional customer service. We're committed to continuously evolving our platform to meet the changing needs of the restaurant industry.
</p>
</div>

{/* Right Column - Image or Content */}
<div className="flex justify-center">
<div className="relative w-full max-w-md bg-gradient-to-br from-[#FFEDED] to-[#FFF8F8] rounded-lg p-8 shadow-lg">
<div className="space-y-4">
  <div className="text-5xl text-center">🚀</div>
  <h3 className="text-2xl font-heading font-semibold text-[#272727] text-center">
    Growing Together
  </h3>
  <p className="text-base font-sans text-gray-600 text-center leading-relaxed">
    Join thousands of restaurants that trust Termbi to manage their operations and grow their business.
  </p>
</div>
</div>
</div>
</div>
</div>
</div>
)
}

export default AboutVision