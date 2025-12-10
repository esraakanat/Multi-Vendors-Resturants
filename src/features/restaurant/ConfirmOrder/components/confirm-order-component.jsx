import { useNavigate } from "react-router-dom"
import checkImg from "@/assets/restaurant-assets/cart/check-img.svg"
import { appRoutes } from "@/routes/routeDefinitions"
import CheckoutBreadcrumb from "@/shared/components/CheckoutBreadcrumb"

function ConfirmOrderComponent() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate(appRoutes.restaurantHome.main)
  }

  return (
    <div className=" bg-white px-4 pt-20 pb-24">
      <div className="container mx-auto max-w-6xl">
        <CheckoutBreadcrumb currentStep="confirm-order" />
      </div>
      <div className="flex items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-12 max-w-2xl w-full">
          {/* Check Icon */}
          <div className="relative">
            <img 
              src={checkImg} 
              alt="Success checkmark" 
              className="w-32 h-32"
            />
          </div>

          {/* Confirmation Text */}
          <h2 className="text-2xl md:text-3xl font-semibold text-[#4A4A4A] text-center">
            Confirmation ordered Successfully
          </h2>

          {/* Go Home Button */}
          <button
            type="button"
            onClick={handleGoHome}
            className="w-full max-w-xs rounded-lg bg-[#EC2323]  py-3 px-6 font-heading text-white text-base font-medium hover:bg-[#d02323] transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmOrderComponent

