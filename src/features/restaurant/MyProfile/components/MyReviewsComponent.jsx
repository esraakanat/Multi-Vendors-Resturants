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
import { appRoutes } from "@/routes/routeDefinitions"
import { useProfile } from "@/features/restaurant/MyProfile/services/queryProfile"

const REVIEWS_DATA = [
  {
    id: "review-1",
    productName: "Mediterranean Salad",
    image: foodImage1,
    rating: 5,
    date: "20-09-2024",
    review:
      "A delicious and beautifully presented dish that just needs a little salt to be perfect.",
  },
  {
    id: "review-2",
    productName: "Spicy Noodles",
    image: foodImage2,
    rating: 4,
    date: "30-08-2024",
    review:
      "Delicious dish and good service but it has a lot of hot spices which makes it difficult to eat.",
  },
  {
    id: "review-3",
    productName: "Green Garden Bowl",
    image: foodImage3,
    rating: 2,
    date: "28-08-2024",
    review: "The taste is bad and the vegetables are not fresh, I don't want to eat this dish again.",
  },
  {
    id: "review-4",
    productName: "Smoothie Combo",
    image: foodImage2,
    rating: 5,
    date: "15-08-2024",
    review: "Refreshing and balanced flavors, definitely ordering this combo again.",
  },
  {
    id: "review-5",
    productName: "Falafel Bowl",
    image: foodImage1,
    rating: 3,
    date: "10-08-2024",
    review: "Good portion size but needs more dressing to be truly satisfying.",
  },
]

const ITEMS_PER_PAGE = 3

function MyReviewsComponent() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const { data: profileData, isLoading } = useProfile()

  const totalPages = Math.ceil(REVIEWS_DATA.length / ITEMS_PER_PAGE)
  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return REVIEWS_DATA.slice(start, start + ITEMS_PER_PAGE)
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
    },
    {
      id: "my-reviews",
      label: "My Reviews",
      icon: myReviewsIcon,
      route: appRoutes.myReviews.main,
      active: true,
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const filled = index < rating
      return (
        <span
          key={index}
          className={`text-base ${filled ? "text-[#F5A524]" : "text-gray-300"}`}
        >
          ★
        </span>
      )
    })
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
            <span className="text-[#272727]">My Reviews</span>
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
                        : "text-[#272727] hover:bg-gray-50"
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
              <h1 className="text-2xl font-heading font-bold text-[#272727] mb-8">My Reviews</h1>

              <div className="space-y-5 md:w-11/12 ">
                {paginatedReviews.map((review) => (
                  <article
                    key={review.id}
                    className="flex flex-col md:flex-row gap-4 items-start border border-[#F4F4F4] rounded-2xl p-4 md:p-6 shadow-sm bg-[#F9F9F9]"
                  >
                    <img
                      src={review.image}
                      alt={review.productName}
                      className="w-20 h-20 rounded-xl object-cover md:w-24 md:h-24"
                    />
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-xs text-[#8F8F8F]">{review.rating}.0</span>
                          </div>
                        </div>
                        <span className="text-sm text-[#272727]">{review.date}</span>
                      </div>
                      <p className=" w-5/6 text-sm md:text-base text-[#515151] leading-relaxed">{review.review}</p>
                    </div>
                  </article>
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

export default MyReviewsComponent


