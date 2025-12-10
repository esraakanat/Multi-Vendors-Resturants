import { useEffect } from "react"
import RestaurantNavbar from "@/shared/components/RestaurantNavbar"
import RestaurantFooter from "@/shared/components/RestaurantFooter"
import MyReviewsComponent from "../components/MyReviewsComponent"

function MyReviews() {
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
      <MyReviewsComponent />
      <RestaurantFooter />
    </div>
  )
}

export default MyReviews