import checkIcon from "@/assets/home-assets/check.svg"

function ReservationService() {
  const features = [
    "Real-time table availability",
    "24/7 online booking system",
    "Automatic confirmation emails",
    "Calendar management",
    "Customer database",
    "No-show tracking"
  ]

  return (
    <div className="w-full bg-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#272727]">
              Reservation System
            </h2>
            <p className="text-base md:text-lg font-sans text-[#515151] leading-relaxed">
              Streamline your booking process with our advanced reservation system. Allow customers to book tables online, manage your availability in real-time, and reduce no-shows.
            </p>
            
            {/* Features List */}
            <ul className="space-y-3 mt-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <img src={checkIcon} alt="check" className="h-5 w-5 flex-shrink-0" />
                  <span className="text-base font-sans text-[#272727]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Visual Content */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md  rounded-lg p-8 shadow-lg">
              <div className="space-y-4 text-center">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-2xl font-heading font-semibold text-[#272727]">
                  Smart Booking
                </h3>
                <p className="text-base font-sans text-gray-600 leading-relaxed">
                  Increase your bookings by up to 30% with our intelligent reservation system that works even outside business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationService

