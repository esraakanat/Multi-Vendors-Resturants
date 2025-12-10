import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import userImage from "@/assets/restaurant-assets/navbar/user1.svg"
import manageProfileIcon from "@/assets/restaurant-assets/My Profile-assets/Manage Profile.svg"
import myOrderIcon from "@/assets/restaurant-assets/My Profile-assets/My Order.svg"
import myBookingsIcon from "@/assets/restaurant-assets/My Profile-assets/My bookings.svg"
import myReviewsIcon from "@/assets/restaurant-assets/My Profile-assets/My Reviews.svg"
import foodImage1 from "@/assets/restaurant-assets/home/food-image1.png"
import foodImage2 from "@/assets/restaurant-assets/home/food-image2.png"
import foodImage3 from "@/assets/restaurant-assets/home/food-image3.png"
import foodImage4 from "@/assets/restaurant-assets/home/food-image4.png"
import detailsImage from "@/assets/restaurant-assets/home/detailsimg.png"
import { appRoutes } from "@/routes/routeDefinitions"
import { useProfile } from "@/features/restaurant/MyProfile/services/queryProfile"

const ORDERS_DATA = [
  {
    id: "11236587267",
    productName: "Mediterranean Salad",
    productImage: foodImage1,
    date: "20-07-2024",
    amount: 500,
  },
  {
    id: "11236587268",
    productName: "Spicy Noodles",
    productImage: foodImage2,
    date: "20-07-2024",
    amount: 450,
  },
  {
    id: "11236587269",
    productName: "Classic Caesar",
    productImage: foodImage3,
    date: "20-07-2024",
    amount: 520,
  },
  {
    id: "11236587270",
    productName: "Power Smoothie",
    productImage: detailsImage,
    date: "19-07-2024",
    amount: 300,
  },
  {
    id: "11236587271",
    productName: "Falafel Bowl",
    productImage: foodImage4,
    date: "19-07-2024",
    amount: 480,
  },
  {
    id: "11236587272",
    productName: "Quinoa Salad",
    productImage: foodImage3,
    date: "18-07-2024",
    amount: 460,
  },
  {
    id: "11236587273",
    productName: "Fresh Juice Combo",
    productImage: detailsImage,
    date: "18-07-2024",
    amount: 390,
  },
]

const ITEMS_PER_PAGE = 5

function MyOrderComponent() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const { data: profileData, isLoading } = useProfile()

  const totalPages = Math.ceil(ORDERS_DATA.length / ITEMS_PER_PAGE)
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return ORDERS_DATA.slice(start, start + ITEMS_PER_PAGE)
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
      active: true,
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

  const handleSignOut = () => {
    console.log("Sign out")
  }

  const handleMenuClick = (item) => {
    if (item.route && item.active !== true) {
      navigate(item.route)
    }
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
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
            <span className="text-[#272727]">My Order</span>
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
                      item.active ? "bg-[#FFF6F6] font-medium " : "text-[#272727] hover:bg-gray-50"
                    } ${item.route ? "" : "cursor-not-allowed opacity-60"}`}
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
              <h1 className="text-2xl font-heading font-bold text-[#272727] mb-8">My Order</h1>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-sm font-sans text-[#272727] border-b border-gray-100">
                      <th className="pb-4 font-medium">Order id</th>
                      <th className="pb-4 font-medium">Products</th>
                      <th className="pb-4 font-medium">Date</th>
                      <th className="pb-4 font-medium">Amount</th>
                      <th className="pb-4 font-medium">Details</th>
                      <th className="pb-4 font-medium">Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-50 text-sm text-[#272727]">
                        <td className="py-4 text-[#8F8F8F] font-medium">{order.id}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              className="text-lg text-gray-400 hover:text-[#EC2323] transition-colors"
                              aria-label="Previous product"
                            >
                              ‹
                            </button>
                            <img
                              src={order.productImage}
                              alt={order.productName}
                              className="w-14 h-14 rounded-lg object-cover"
                            />
                            <button
                              type="button"
                              className="text-lg text-gray-400 hover:text-[#EC2323] transition-colors"
                              aria-label="Next product"
                            >
                              ›
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-[#8F8F8F]">{order.date}</td>
                        <td className="py-4 text-[#272727]">{order.amount}$</td>
                        <td className="py-4">
                          <button type="button" className="text-[#EC2323] font-medium hover:underline">
                            View details
                          </button>
                        </td>
                        <td className="py-4">
                          <button type="button" className="text-[#EC2323] font-medium hover:underline">
                            Review order
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 md:hidden">
                {paginatedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-100 rounded-xl p-4 space-y-3 shadow-sm bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-[#8F8F8F]">Order id</p>
                      <span className="text-sm font-semibold text-[#272727]">{order.id}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-semibold text-[#272727]">{order.productName}</p>
                        <p className="text-xs text-[#8F8F8F]">{order.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#8F8F8F]">Amount</span>
                      <span className="font-semibold text-[#272727]">{order.amount}$</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <button type="button" className="text-[#EC2323] font-medium hover:underline">
                        View details
                      </button>
                      <button type="button" className="text-[#EC2323] font-medium hover:underline">
                        Review order
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

export default MyOrderComponent


