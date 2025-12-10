import { useEffect } from "react"
import RestaurantNavbar from "@/shared/components/RestaurantNavbar"
import RestaurantFooter from "@/shared/components/RestaurantFooter"
import MyBookingsComponent from "../components/MybookingsComponent"

function MyBookings() {
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
      <MyBookingsComponent />
      <RestaurantFooter />
    </div>
  )
}

export default MyBookings