import { useEffect } from "react"
import RestaurantNavbar from "@/shared/components/RestaurantNavbar"
import RestaurantFooter from "@/shared/components/RestaurantFooter"
import CheckoutPage from "../components/CheckoutPage"

function Checkout() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <div className="min-h-screen ">
      <RestaurantNavbar />
      <CheckoutPage />
      <RestaurantFooter />
    </div>
  )
}

export default Checkout