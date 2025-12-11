import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import userImage from "@/assets/restaurant-assets/navbar/User1.svg"
import manageProfileIcon from "@/assets/restaurant-assets/My Profile-assets/Manage Profile.svg"
import myOrderIcon from "@/assets/restaurant-assets/My Profile-assets/My Order.svg"
import myBookingsIcon from "@/assets/restaurant-assets/My Profile-assets/My bookings.svg"
import myReviewsIcon from "@/assets/restaurant-assets/My Profile-assets/My Reviews.svg"
import { appRoutes } from "@/routes/routeDefinitions"
import { useProfile, useUpdateProfile, useLogout } from "@/features/restaurant/MyProfile/services/queryProfile"

function ManageProfileComponent() {
  const navigate = useNavigate()
  const { data: profileData, isLoading } = useProfile()
  const updateProfileMutation = useUpdateProfile()
  const logoutMutation = useLogout()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Initialize form data from localStorage or API
  useEffect(() => {
    // First, try to get from localStorage (fast)
    const storedCustomer = localStorage.getItem("customer")
    if (storedCustomer) {
      try {
        const customer = JSON.parse(storedCustomer)
        setFormData({
          firstName: customer.first_name || "",
          lastName: customer.last_name || "",
          username: customer.username || customer.name || "",
          email: customer.email || "",
          phone: customer.phone || "",
        })
      } catch (err) {
        console.error("Error parsing customer data:", err)
      }
    }
  }, [])

  // Update form data when API data is loaded
  useEffect(() => {
    if (profileData?.customer) {
      const customer = profileData.customer
      setFormData({
        firstName: customer.first_name || "",
        lastName: customer.last_name || "",
        username: customer.username || customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
      })
    }
  }, [profileData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    try {
      await updateProfileMutation.mutateAsync({
        first_name: formData.firstName,
        last_name: formData.lastName,
        name: formData.username || `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
      })

      setSuccessMessage("Profile updated successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update profile. Please try again."
      setErrorMessage(errorMsg)
      console.error("Update profile error:", err)
    }
  }

  const handleSignOut = async () => {
    try {
      // Call logout API
      await logoutMutation.mutateAsync()
      
      // Navigate to home
      navigate(appRoutes.restaurantHome.main, { replace: true })
      
      // Trigger auth change event to update UI
      window.dispatchEvent(new Event("authChange"))
    } catch (error) {
      // Even if API fails, clear local storage (including cart) and redirect
      console.error("Logout error:", error)
      localStorage.removeItem("access_token")
      localStorage.removeItem("customer")
      localStorage.removeItem("cart") // Clear cart when user logs out
      navigate(appRoutes.restaurantHome.main, { replace: true })
      // Trigger auth change event to update UI
      window.dispatchEvent(new Event("authChange"))
    }
  }

  // Get customer data for display
  const getCustomerData = () => {
    if (profileData?.customer) return profileData.customer
    const storedCustomer = localStorage.getItem("customer")
    if (storedCustomer) {
      try {
        return JSON.parse(storedCustomer)
      } catch {
        return null
      }
    }
    return null
  }

  const customer = getCustomerData()
  const displayName = customer?.name || `${formData.firstName} ${formData.lastName}`.trim() || "User"
  const displayImage = customer?.profile || userImage

  const menuItems = [
    {
      id: "manage-profile",
      label: "Manage Profile",
      icon: manageProfileIcon,
      route: appRoutes.manageProfile.main,
      active: true,
    },
    {
      id: "my-order",
      label: "My Order",
      icon: myOrderIcon,
      route: appRoutes.myOrder.main,
    },
    {
      id: "my-bookings",
      label: "My bookings",
      route: appRoutes.myBookings.main,
      icon: myBookingsIcon,
    },
    {
      id: "my-reviews",
      label: "My Reviews",
      icon: myReviewsIcon,
      route: appRoutes.myReviews.main,
    },
  ]

  const handleMenuClick = (item) => {
    if (!item.route || item.active) return
    navigate(item.route)
  }

  return (
    <div className="min-h-screen bg-[#FFFCFC] pt-20 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <button
              onClick={() => navigate(appRoutes.restaurantHome.main)}
              className="hover:text-[#EC2323] transition-colors"
            >
              Home
            </button>
            <span className="text-gray-400"> &gt; </span>
            <span className="text-[#272727]">My Profile</span>
            <span className="text-gray-400"> &gt; </span>
            <span className="text-[#272727]">Manage Profile</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
              {/* User Profile Header */}
              <div className="flex flex-col items-center space-y-3 pb-6 border-b border-gray-100">
                <img
                  src={displayImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = userImage
                  }}
                />
                <h3 className="text-lg font-heading font-bold text-[#272727] text-center">
                  {isLoading ? "Loading..." : displayName || "User"}
                </h3>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-2 lg:min-h-[320px]">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMenuClick(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans transition-colors ${
                      item.active
                        ? "bg-[#FFF6F6] font-medium "
                        : item.route
                        ? "text-[#272727] hover:bg-gray-50"
                        : "text-[#272727] cursor-not-allowed opacity-60"
                    }`}
                  >
                    <img src={item.icon} alt={item.label} className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                disabled={logoutMutation.isPending}
                className="w-1/2  lg:w-full mt-6 bg-[#EC2323] text-white py-3 px-4 rounded-lg font-sans text-sm font-medium hover:bg-[#d02323] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              {/* Header */}
              <h1 className="text-2xl font-heading font-bold text-[#272727] mb-8">
                Manage Profile
              </h1>

              {/* Profile Picture and Name Section */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8 pb-8 ">
                <img
                  src={displayImage}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = userImage
                  }}
                />
                <div>
                  <h2 className="text-lg font-heading font-bold text-[#272727] mb-1">
                    {isLoading ? "Loading..." : displayName || "User"}
                  </h2>
                  <button className="text-sm text-[#EC2323] hover:underline font-sans">
                    Change image
                  </button>
                </div>
              </div>

              {/* Error/Success Messages */}
              {errorMessage && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {successMessage}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-[#272727] mb-2 font-sans"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={isLoading || updateProfileMutation.isPending}
                        className="w-full sm:w-3/4 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EC2323]/30 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-[#272727] mb-2 font-sans"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={isLoading || updateProfileMutation.isPending}
                        className="w-full sm:w-3/4 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EC2323]/30 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#272727] mb-2 font-sans"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading || updateProfileMutation.isPending}
                        className="w-full sm:w-3/4 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EC2323]/30 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-[#272727] mb-2 font-sans"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={isLoading || updateProfileMutation.isPending}
                        className="w-full sm:w-3/4 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EC2323]/30 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-[#272727] mb-2 font-sans"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading || updateProfileMutation.isPending}
                        className="w-full sm:w-3/4 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EC2323]/30 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Change Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isLoading || updateProfileMutation.isPending}
                    className="bg-[#EC2323] text-white py-3 px-8 rounded-lg font-sans text-sm font-medium hover:bg-[#d02323] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updateProfileMutation.isPending ? "Saving..." : "Save Change"}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ManageProfileComponent

