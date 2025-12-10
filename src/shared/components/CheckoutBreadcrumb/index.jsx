import { useNavigate } from "react-router-dom"
import { appRoutes } from "@/routes/routeDefinitions"

function CheckoutBreadcrumb({ currentStep }) {
  const navigate = useNavigate()
  
  const steps = [
    { id: 'cart', label: 'Cart', route: appRoutes.cart.main },
    { id: 'checkout', label: 'Checkout', route: appRoutes.checkout.main },
    { id: 'place-order', label: 'Place order', route: appRoutes.placeOrder.main },
    { id: 'confirm-order', label: 'Confirm Order', route: appRoutes.confirmOrder.main },
  ]

  const getStepIndex = (stepId) => {
    return steps.findIndex((step) => step.id === stepId)
  }

  const currentStepIndex = getStepIndex(currentStep)

  const handleStepClick = (step, index) => {
    if (index !== currentStepIndex && step.route) {
      navigate(step.route)
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {steps.map((step, index) => {
        const isActive = index === currentStepIndex
        const isClickable = index !== currentStepIndex

        return (
          <div key={step.id} className="flex items-center gap-2">
            <span
              onClick={() => handleStepClick(step, index)}
              className={`text-sm font-sans ${
                isActive 
                  ? 'font-bold text-[#272727]'
                  : isClickable
                  ? 'font-normal text-gray-400 cursor-pointer hover:text-[#272727] transition-colors'
                  : 'font-normal text-gray-400'
              }`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <span className="text-gray-400"> &gt; </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default CheckoutBreadcrumb

