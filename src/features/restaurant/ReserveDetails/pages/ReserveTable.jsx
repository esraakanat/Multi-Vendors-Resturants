import { useEffect } from "react"
import RestaurantNavbar from "@/shared/components/RestaurantNavbar"
import RestaurantFooter from "@/shared/components/RestaurantFooter"
import ReserveTableComponent from "../components/ReserveTableComponent"

function ReserveTable() {
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
      <ReserveTableComponent />
      <RestaurantFooter />
    </div>
  )
}

export default ReserveTable
