import { useNavigate } from "react-router-dom"
import { appRoutes } from "@/routes/routeDefinitions"
import border from "@/assets/home-assets/Border.png"
import border1 from "@/assets/home-assets/Border (1).png"
import border2 from "@/assets/home-assets/Border (2).png"
import border3 from "@/assets/home-assets/Border (3).png"

const restaurants = [
  { id: 1, name: "Taverna", image: border },
  { id: 2, name: "Melty Way", image: border1 },
  { id: 3, name: "Good Taste", image: border2 },
  { id: 4, name: "Sbarro", image: border3 },
  { id: 5, name: "Aldenaire Kitchen", image: border },
]

function TrustedRestaurants() {
  const navigate = useNavigate()

  const handleRestaurantClick = () => {
    navigate(appRoutes.restaurantHome.main)
  }

  return (
    <section className="bg-white w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-2xl md:text-3xl font-sans text-[#272727] mb-12">
          restaurants already trust in{" "}
          <span className="font-semibold">
            term<span className="text-[#EC2323]">b</span>i
          </span>
        </h2>

        {/* Restaurant Logos */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {restaurants.map((restaurant) => (
            <button
              key={restaurant.id}
              type="button"
              onClick={handleRestaurantClick}
              className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105 overflow-hidden"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-contain p-2"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedRestaurants

