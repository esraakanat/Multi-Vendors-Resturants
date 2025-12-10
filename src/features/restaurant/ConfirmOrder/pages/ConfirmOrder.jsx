import { useEffect } from "react"
import RestaurantNavbar from "@/shared/components/RestaurantNavbar"
import RestaurantFooter from "@/shared/components/RestaurantFooter"
import ConfirmOrderComponent from "../components/confirm-order-component"

function ConfirmOrder() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <div>
      <RestaurantNavbar />
      <ConfirmOrderComponent />
      <RestaurantFooter />
    </div>
  )
}

export default ConfirmOrder