import { useEffect, useMemo, useState } from "react"
import cartIcon from "@/assets/restaurant-assets/home/cart (2).svg"
import foodimage from "@/assets/restaurant-assets/home/food-image1.png"
import { useMenuCategories } from "../../services/queryProducts.js"
import { useAllProducts } from "../../services/queryAllProducts.js"
import DetailsProduct from "../DetailsProduct"
import { useCart } from "@/features/restaurant/cart/context/useCart"
import Pagination from "./components/Pagination"
import DownloadMenuButton from "./components/DownloadMenuButton"

const VIEW_MODES = {
  CARDS: "cards",
  LIST: "list",
}

const SORT_OPTIONS = {
  NAME: "name",
  PRICE: "price",
}

const PRODUCTS_PER_PAGE = 6

function OurMenu() {
  const [activeCategoryId, setActiveCategoryId] = useState(null) // null = All products
  const [viewMode, setViewMode] = useState(VIEW_MODES.CARDS)
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NAME)
  const [sortTerm, setSortTerm] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const { addItem } = useCart()

  // Fetch categories for tabs
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useMenuCategories()

  // Fetch all products
  const { data: allProducts = [], isLoading: productsLoading, error: productsError } = useAllProducts({
    restaurantAdminId: 8,
    categoryId: activeCategoryId,
    sortBy,
    sortTerm,
  })

  // Reset to page 1 when category or sort changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategoryId, sortBy, sortTerm])

  const isLoading = categoriesLoading || productsLoading
  const error = categoriesError || productsError

  const errorMessage = error
    ? error.message || "Unable to load menu. Please try again."
    : ""

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!allProducts || !Array.isArray(allProducts)) return []

    let filtered = [...allProducts]

    // Filter by category if selected
    if (activeCategoryId) {
      filtered = filtered.filter((product) => product.category_id === activeCategoryId)
    }

    // Sort products
    if (sortBy === SORT_OPTIONS.PRICE) {
      filtered.sort((a, b) => {
        const priceA = Number(a.price) || 0
        const priceB = Number(b.price) || 0
        return sortTerm === "asc" ? priceA - priceB : priceB - priceA
      })
    } else {
      filtered.sort((a, b) => {
        const nameA = a.name || ""
        const nameB = b.name || ""
        return sortTerm === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA)
      })
    }

    return filtered
  }, [allProducts, activeCategoryId, sortBy, sortTerm])

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsDetailsOpen(true)
  }

  const handleCartClick = (event, product) => {
    event.stopPropagation()
    addItem(product, { quantity: 1 })
  }

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId)
    setCurrentPage(1) // Reset to first page
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Scroll to top of products section
    window.scrollTo({
      top: document.querySelector('[data-products-section]')?.offsetTop - 100 || 0,
      behavior: "smooth",
    })
  }

  return (
    <section className="w-full bg-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#272727]">
            Our <span className="text-[#E87808]">Menu</span>
          </h2>
          <p className="text-base md:text-lg font-sans text-gray-600 leading-relaxed">
            Explore our special, tasteful dishes on the Restaurant Menu!
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-12">
          <div className="flex flex-wrap justify-center  items-center gap-4 md:gap-8 text-base md:text-lg font-semibold">
            {/* All Products Button */}
            <button
              onClick={() => handleCategoryClick(null)}
              className={`relative pb-2 md:pb-4 transition-colors ${
                activeCategoryId === null ? "text-[#E87808]" : "text-gray-400"
              }`}
            >
              All
              <span
                className={`absolute left-0 -bottom-[1px] h-0.5 w-full transition-opacity ${
                  activeCategoryId === null
                    ? "opacity-100 bg-[#E87808]"
                    : "opacity-0 bg-transparent"
                }`}
              />
            </button>

            {/* Category Buttons */}
            {categories.map((category) => {
              const isActive = category.id === activeCategoryId

              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`relative pb-2 md:pb-4 transition-colors ${
                    isActive ? "text-[#E87808]" : "text-gray-400"
                  }`}
                >
                  {category.name}
                  <span
                    className={`absolute left-0 -bottom-[1px] h-0.5 w-full transition-opacity ${
                      isActive ? "opacity-100 bg-[#E87808]" : "opacity-0 bg-transparent"
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* View Controls */}
        <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-12 md:gap-4 lg:gap-16">
          <button
            type="button"
            onClick={() => setViewMode(VIEW_MODES.CARDS)}
            className={`px-4 py-3 border rounded-md text-sm font-medium transition-all ${
              viewMode === VIEW_MODES.CARDS
                ? "border-[#E87808] text-[#272727] shadow-sm"
                : "text-[#272727] "
            }`}
          >
            View as Cards
          </button>
          <button
            type="button"
            onClick={() => setViewMode(VIEW_MODES.LIST)}
            className={`px-4 py-3 border rounded-md text-sm font-medium transition-all ${
              viewMode === VIEW_MODES.LIST
                ? "border-[#E87808] text-[#272727] shadow-sm"
                : "text-[#272727]"
            }`}
          >
            View as List
          </button>
          <div className="md:w-0.5 md:h-14 lg:h-10 md:bg-[#DFDFDF]"></div>
          </div>

          <div className="flex gap-12 md:gap-4 lg:gap-16">
          <button
            type="button"
              onClick={() => {
                setSortBy(SORT_OPTIONS.NAME)
                setSortTerm(sortTerm === "asc" ? "desc" : "asc")
              }}
            className={`px-4 py-3 border rounded-md text-sm font-medium transition-all ${
              sortBy === SORT_OPTIONS.NAME
                ? "border-[#E87808] text-[#272727] shadow-sm"
                : "text-[#272727]"
            }`}
          >
              Sort by Name {sortBy === SORT_OPTIONS.NAME && (sortTerm === "asc" ? "↑" : "↓")}
          </button>
          <button
            type="button"
              onClick={() => {
                setSortBy(SORT_OPTIONS.PRICE)
                setSortTerm(sortTerm === "asc" ? "desc" : "asc")
              }}
            className={`px-4 py-3 border rounded-md text-sm font-medium transition-all ${
              sortBy === SORT_OPTIONS.PRICE
                ? "border-[#E87808] text-[#272727] shadow-sm"
                  : "text-[#272727]"
            }`}
          >
              Sort by Price {sortBy === SORT_OPTIONS.PRICE && (sortTerm === "asc" ? "↑" : "↓")}
          </button>
          <div className="md:w-0.5 md:h-14 lg:h-10 md:bg-[#DFDFDF]"></div>
          </div>
          <DownloadMenuButton restaurantAdminId={8} className="w-1/2 sm:w-1/4 md:w-auto px-6 lg:px-12 py-3 border rounded-md text-sm font-medium text-[#272727] hover:text-[#E87808] transition-colors" />
        </div>

        {/* Products */}
        <div className="mt-12" data-products-section>
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-[#FFF8F2] animate-pulse h-48 md:h-56"
                />
              ))}
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="text-center text-red-500 font-medium">{errorMessage}</div>
          )}

          {!isLoading && !errorMessage && paginatedProducts.length === 0 && (
            <div className="text-center text-gray-500 font-medium">
              No products found{activeCategoryId ? " for this category" : ""}.
            </div>
          )}

          {!isLoading && !errorMessage && paginatedProducts.length > 0 && (
            <>
              {viewMode === VIEW_MODES.CARDS ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {paginatedProducts.map((product) => (
                    <article
                      key={product.id}
                      className="md:h-56 flex flex-row bg-[#FFF9F1] rounded-2xl overflow-hidden border border-orange-50 cursor-pointer transition-shadow hover:shadow-lg"
                      onClick={() => handleProductClick(product)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="flex-1 p-6 space-y-4">
                        <h3 className="text-lg md:text-xl font-heading font-semibold text-[#272727]">
                          {product.name}
                        </h3>
                        <p className="text-sm md:text-base font-sans text-[#5F5F5F] leading-relaxed">
                          {(product.description ||
                            "This delicious dish is crafted with the freshest ingredients.")
                            .split(" ")
                            .slice(0, 12)
                            .join(" ")}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-2xl font-bold text-[#E87808]">
                            {product.price ? `${product.price} $` : "—"}
                          </span>
                          <button
                            type="button"
                            className="flex items-center justify-center w-12 h-12 text-[#E87808] transition-colors hover:opacity-80"
                            onClick={(event) => handleCartClick(event, product)}
                          >
                            <img src={cartIcon} alt="cart" className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                        <div className="w-1/3 md:w-1/2">
                          <img
                          src={product.image || foodimage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = foodimage
                          }}
                          />
                        </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl">
                  {paginatedProducts.map((product, index) => (
                    <article
                      key={product.id}
                      className={`flex flex-wrap items-center gap-4 px-6 py-8 ${
                        index !== paginatedProducts.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      } cursor-pointer transition-colors hover:bg-[#FFF8F2]`}
                      onClick={() => handleProductClick(product)}
                      role="button"
                      tabIndex={0}
                    >
                      {/* Product Image */}
                      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={product.image || foodimage}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = foodimage
                          }}
                        />
                      </div>
                      
                      {/* Product Information */}
                      <div className="flex-1 min-w-[220px]">
                        <h3 className="text-lg font-heading font-semibold text-[#272727]">
                          {product.name}
                        </h3>
                        <p className="md:w-3/4 text-sm font-sans text-[#626262] leading-relaxed">
                          {(product.description ||
                            "The shrimp version of Vongole Rosso dish, clams mixed with pasta, tomatoes, and garlic.")
                            .split(" ")
                            .slice(0, 15)
                            .join(" ")}
                        </p>
                      </div>
                      
                      {/* Price and Cart Button */}
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-[#E87808] whitespace-nowrap">
                          {product.price ? `${product.price} $` : "—"}
                        </span>
                        <button
                          type="button"
                          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-[#E87808] transition-all hover:opacity-80"
                          onClick={(event) => handleCartClick(event, product)}
                        >
                          <img src={cartIcon} alt="cart" className="w-5 h-5" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
      <DetailsProduct
        product={selectedProduct}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </section>
  )
}

export default OurMenu
