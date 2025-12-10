import menuImage from "@/assets/restaurant-assets/home/menu.png"
import { useRestaurantSettings } from "../../../services/queryRestaurantSettings"

function DownloadMenuButton({ restaurantAdminId = 8, className = "" }) {
  const { data: settings, isLoading } = useRestaurantSettings(restaurantAdminId)

  // Get menu image URL from API or fallback to static image
  const menuImageUrl = settings?.menu || menuImage

  const handleOpenMenu = () => {
    window.open(menuImageUrl, "_blank")
  }

  return (
    <button
      type="button"
      onClick={handleOpenMenu}
      disabled={isLoading}
      className={`${className} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? "Loading..." : "Download Menu"}
    </button>
  )
}

export default DownloadMenuButton

