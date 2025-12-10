import { useEffect } from "react"
import RestaurantNavbar from "@/shared/components/RestaurantNavbar"
import RestaurantFooter from "@/shared/components/RestaurantFooter"
import PlaceOrderComponent from "../components/placeOrderComponent"

function PlaceOrder() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <div >
      <RestaurantNavbar />
      <PlaceOrderComponent />
      <RestaurantFooter />
    </div>
  )
}

export default PlaceOrder