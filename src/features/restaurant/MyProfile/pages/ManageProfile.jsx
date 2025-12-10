import { useEffect } from "react"
import RestaurantNavbar from "@/shared/components/RestaurantNavbar"
import RestaurantFooter from "@/shared/components/RestaurantFooter"
import ManageProfileComponent from "../components/ManageProfileComponent"

function ManageProfile() {
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
      <ManageProfileComponent />
      <RestaurantFooter />
    </div>
  )
}

export default ManageProfile