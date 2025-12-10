import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import userImage from "@/assets/restaurant-assets/navbar/user1.svg"
import manageProfileIcon from "@/assets/restaurant-assets/My Profile-assets/Manage Profile.svg"
import myOrderIcon from "@/assets/restaurant-assets/My Profile-assets/My Order.svg"
import myBookingsIcon from "@/assets/restaurant-assets/My Profile-assets/My bookings.svg"
import myReviewsIcon from "@/assets/restaurant-assets/My Profile-assets/My Reviews.svg"
import { appRoutes } from "@/routes/routeDefinitions"
import { useProfile } from "@/features/restaurant/MyProfile/services/queryProfile"

const BOOKINGS_DATA = [
  {
    id: "11236587267",
    date: "20-07-2024",
    time: "14:00",
    guests: 20,
    status: "Confirmed",
  },
  {
    id: "11236587268",
    date: "20-07-2024",
    time: "20:00",
    guests: 10,
    status: "Canceled",
  },
  {
    id: "11236587269",
    date: "20-07-2024",
    time: "12:00",
    guests: 6,
    status: "Confirmed",
  },
  {
    id: "11236587270",
    date: "20-07-2024",
    time: "23:00",
    guests: 7,
    status: "Canceled",
  },
  {
    id: "11236587271",
    date: "20-07-2024",
    time: "18:00",
    guests: 15,
    status: "Confirmed",
  },
  {
    id: "11236587272",
    date: "21-07-2024",
    time: "11:00",
    guests: 12,
    status: "Confirmed",
  },
  {
    id: "11236587273",
    date: "22-07-2024",
    time: "19:30",
    guests: 8,
    status: "Canceled",
  },
]

const ITEMS_PER_PAGE = 5

function MyBookingsComponent() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const { data: profileData, isLoading } = useProfile()

  const totalPages = Math.ceil(BOOKINGS_DATA.length / ITEMS_PER_PAGE)
  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return BOOKINGS_DATA.slice(start, start + ITEMS_PER_PAGE)
  }, [currentPage])

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
  const displayName = customer?.name || `${customer?.first_name || ""} ${customer?.last_name || ""}`.trim() || "User"
  const displayImage = customer?.profile || userImage

  const menuItems = [
    {
      id: "manage-profile",
      label: "Manage Profile",
      icon: manageProfileIcon,
      route: appRoutes.manageProfile.main,
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
      icon: myBookingsIcon,
      route: appRoutes.myBookings.main,
      active: true,
    },
    {
      id: "my-reviews",
      label: "My Reviews",
      icon: myReviewsIcon,
      route: appRoutes.myReviews.main,
    },
  ]

  const handleMenuClick = (item) => {
    if (item.route && !item.active) {
      navigate(item.route)
    }
  }

  const handleSignOut = () => {
    console.log("Sign out")
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const statusClasses = {
    Confirmed: "text-[#00A97F]",
    Canceled: "text-[#EC2323]",
    Pending: "text-[#F5A524]",
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
            <span className="text-[#272727]">My bookings</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
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

              <nav className="space-y-2 lg:min-h-[390px]">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMenuClick(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans transition-colors ${
                      item.active
                        ? "bg-[#FFF6F6] font-medium"
                        : item.route
                        ? "text-[#272727] hover:bg-gray-50"
                        : "cursor-not-allowed opacity-60 text-[#272727]"
                    }`}
                  >
                    <img src={item.icon} alt={item.label} className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <button
                onClick={handleSignOut}
                className="w-1/2 lg:w-full mt-6 bg-[#EC2323] text-white py-3 px-4 rounded-lg font-sans text-sm font-medium hover:bg-[#d02323] transition-colors"
              >
                Sign Out
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
              <h1 className="text-2xl font-heading font-bold text-[#272727] mb-8">My bookings</h1>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-sm font-sans text-[#272727] border-b border-gray-100">
                      <th className="pb-4 font-medium">Booking ID</th>
                      <th className="pb-4 font-medium">Date</th>
                      <th className="pb-4 font-medium">Time</th>
                      <th className="pb-4 font-medium">Guests</th>
                      <th className="pb-4 font-medium">Status</th>
                      <th className="pb-4 font-medium">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBookings.map((booking) => (
                      <tr key={booking.id} className=" text-sm text-[#272727]">
                        <td className="py-8 text-[#8F8F8F] font-medium">{booking.id}</td>
                        <td className="py-4 text-[#8F8F8F]">{booking.date}</td>
                        <td className="py-4 text-[#272727]">{booking.time}</td>
                        <td className="py-4 text-[#272727]">{booking.guests}</td>
                        <td className={`py-4 font-semibold ${statusClasses[booking.status] ?? "text-[#00B78B]"}`}>
                          {booking.status}
                        </td>
                        <td className="py-4">
                          <button type="button" className="text-[#EC2323] font-medium hover:underline">
                            View details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 md:hidden">
                {paginatedBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-100 rounded-xl p-4 space-y-3 shadow-sm bg-white">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-[#8F8F8F]">Booking ID</p>
                      <span className="text-sm  text-[#272727]">{booking.id}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-[#8F8F8F]">Date</p>
                        <p className="font-semibold text-[#272727]">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#8F8F8F]">Time</p>
                        <p className="font-semibold text-[#272727]">{booking.time}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#8F8F8F]">Guests</p>
                        <p className="font-semibold text-[#272727]">{booking.guests}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#8F8F8F]">Status</p>
                        <p className={`font-semibold ${statusClasses[booking.status] ?? "text-[#8F8F8F]"}`}>
                          {booking.status}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button type="button" className="text-[#EC2323] text-sm font-medium hover:underline">
                        View details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-200 text-[#272727] hover:bg-gray-50"
                  }`}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1
                  const isActive = page === currentPage
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-md text-sm font-medium ${
                        isActive
                          ? "bg-[#EC2323] text-white"
                          : "bg-white border border-gray-200 text-[#272727] hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-200 text-[#272727] hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default MyBookingsComponent


