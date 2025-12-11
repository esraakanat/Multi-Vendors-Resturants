import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import logoRestaurant from "@/assets/restaurant-assets/navbar/logo-resturant.svg"
import iconSearch from "@/assets/restaurant-assets/navbar/icon-search.svg"
import cartIcon from "@/assets/restaurant-assets/navbar/cart.svg"
import userImage from "@/assets/restaurant-assets/navbar/User1.svg"
import { appRoutes } from "@/routes/routeDefinitions"
import { useCart } from "@/features/restaurant/cart/context/useCart"
import AuthModal from "@/shared/components/AuthModal"

function RestaurantNavbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [customer, setCustomer] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState("login") // "login" or "signup"
  const navigate = useNavigate()
  const { totalItems } = useCart()

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token")
      const customerData = localStorage.getItem("customer")
      
      if (token && customerData) {
        setIsLoggedIn(true)
        try {
          setCustomer(JSON.parse(customerData))
        } catch {
          setCustomer(null)
        }
      } else {
        setIsLoggedIn(false)
        setCustomer(null)
      }
    }

    // Check on mount
    checkAuth()

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === "access_token" || e.key === "customer") {
        checkAuth()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also listen for custom event (when user logs in/out in same tab)
    const handleAuthChange = () => {
      checkAuth()
    }

    window.addEventListener("authChange", handleAuthChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("authChange", handleAuthChange)
    }
  }, [])

  // Trigger auth change event when localStorage changes (for same tab)
  useEffect(() => {
    const originalSetItem = localStorage.setItem
    localStorage.setItem = function(...args) {
      originalSetItem.apply(this, args)
      if (args[0] === "access_token" || args[0] === "customer") {
        window.dispatchEvent(new Event("authChange"))
      }
    }

    const originalRemoveItem = localStorage.removeItem
    localStorage.removeItem = function(...args) {
      originalRemoveItem.apply(this, args)
      if (args[0] === "access_token" || args[0] === "customer") {
        window.dispatchEvent(new Event("authChange"))
      }
    }

    return () => {
      localStorage.setItem = originalSetItem
      localStorage.removeItem = originalRemoveItem
    }
  }, [])

  const handleOpenAuthModal = (mode) => {
    setAuthModalMode(mode)
    setIsAuthModalOpen(true)
  }

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const handleCartNavigate = () => {
    navigate(appRoutes.cart.main)
  }

  return (
    <nav className="bg-[#000000] text-white font-sans w-full fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left Section - Logo + Search Bar */}
          <div className="flex items-center gap-4 md:gap-6 flex-1">
            {/* Logo */}
            <button
              type="button"
              onClick={() => navigate(appRoutes.restaurantHome.main)}
              className="flex items-center flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm cursor-pointer"
              aria-label="Go to restaurant home"
            >
              <img
                src={logoRestaurant}
                alt="Restaurant logo"
                className="h-10 md:h-12 w-auto"
              />
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <img 
                    src={iconSearch} 
                    alt="Search icon" 
                    className="w-4 h-4 md:w-5 md:h-5 opacity-60" 
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search for any product"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-gray-900  placeholder-gray-400 rounded-sm pl-10 pr-4 py-2 md:py-1.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Right Section - Cart, Language, User */}
          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
            {/* Shopping Cart */}
            <button
              type="button"
              onClick={handleCartNavigate}
              className="relative cursor-pointer hover:opacity-80 transition-opacity focus-visible:outline-none"
            >
              <img 
                src={cartIcon} 
                alt="Shopping cart" 
                className="w-6 h-6 md:w-7 md:h-7" 
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#EC2323] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-white hover:opacity-80 transition-opacity outline-none bg-transparent border-none cursor-pointer">
                <img 
                  src="/flags/us.svg" 
                  alt="US flag" 
                  className="w-5 h-5 md:w-6 md:h-6" 
                />
                <ChevronDown className="h-3 w-3 md:h-4 md:w-4 text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-gray-900 min-w-[120px]">
                <DropdownMenuItem className="font-sans cursor-pointer flex items-center gap-2">
                  <img src="/flags/us.svg" alt="US flag" className="w-4 h-4" />
                  <span>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-sans cursor-pointer flex items-center gap-2">
                  <img src="/flags/sy.svg" alt="SY flag" className="w-4 h-4" />
                  <span>العربية</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile or Auth Buttons */}
            {isLoggedIn ? (
              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                <Link to={appRoutes.manageProfile.main}>
                  <img 
                    src={customer?.profile || userImage} 
                    alt="User profile" 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white" 
                    onError={(e) => {
                      e.target.src = userImage
                    }}
                  />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2 md:gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleOpenAuthModal("signup")}
                  className="bg-transparent text-white border border-white hover:bg-white hover:text-black font-sans rounded-md px-3 md:px-4 py-1.5 md:py-2 h-auto text-xs md:text-sm"
                >
                  Sign Up
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleOpenAuthModal("login")}
                  className="bg-[#E87808] text-white border border-[#EC2323] hover:bg-[#E87808] hover:border-[#d02323] font-sans rounded-md px-3 md:px-4 py-1.5 md:py-2 h-auto text-xs md:text-sm"
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        redirectTo={null}
        initialMode={authModalMode}
      />
    </nav>
  )
}

export default RestaurantNavbar

