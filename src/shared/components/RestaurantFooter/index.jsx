import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import logoRestaurant from "@/assets/restaurant-assets/navbar/logo-resturant.svg"
import termbiOrange from "@/assets/restaurant-assets/footer/termbi-orange.svg"
import { appRoutes } from "@/routes/routeDefinitions"
import OpeningHours from "./OpeningHours"
import SocialLinks from "./SocialLinks"

function RestaurantFooter({ restaurantSlug = "tempora", restaurantAdminId = 8 }) {
  const [email, setEmail] = useState("")
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: "Reserve a table", to: appRoutes.reserveDetails.main },
    { label: "Home", to: appRoutes.restaurantHome.main },
    { label: "Menu", to: appRoutes.restaurantHome.main },
    { label: "About us", to: "#"},
    { label: "Contact us", to: "#" },
  ]

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log("Subscribed:", email)
    setEmail("")
  }

  return (
    <footer className="w-full bg-[#000000] text-white font-sans">
      {/* Main Footer Section */}
      <div className="container mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Brand and Contact */}
          <div className="flex flex-col">
            {/* Logo */}
            <div className="mb-6">
              <img 
                src={logoRestaurant} 
                alt="Restaurant logo" 
                className="h-12 md:h-16 w-auto" 
              />
            </div>

            {/* Keep in touch */}
            <p className="text-white font-sans text-base mb-4">
              Keep in touch
            </p>

            {/* Social Media Icons */}
            <div className="mb-6">
              <SocialLinks restaurantAdminId={restaurantAdminId} />
            </div>

            {/* Provided by termbi */}
            <div className="space-y-2">
              <p className="text-white font-sans text-sm">
                Provided by{" "}
                <span className="inline-flex items-center gap-1">
                  <img 
                    src={termbiOrange} 
                    alt="termbi" 
                    className="h-3 w-auto inline"
                  />
                </span>
              </p>
              <p className="text-white font-sans text-sm">
                www.termbi.com
              </p>
            </div>
          </div>

          {/* Column 2 - Opening Hours */}
          <OpeningHours restaurantSlug={restaurantSlug} />

          {/* Column 3 - Quick Link */}
          <div className="flex flex-col">
            <h3 className="text-white font-heading font-bold text-lg mb-6">
              Quick Link
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white hover:opacity-80 transition-opacity font-sans text-sm font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletters */}
          <div className="flex flex-col">
            <h3 className="text-white font-heading font-bold text-lg mb-6">
              Newsletters
            </h3>
            <p className="text-white font-sans text-sm mb-6 leading-relaxed">
              Stay up to date with our latest news, receive exclusive deals, and more
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-gray-900 placeholder:text-gray-400 rounded-md border-none focus-visible:ring-2 focus-visible:ring-gray-400"
                required
              />
              <Button
                type="submit"
                className="bg-[#E87808] hover:bg-red-700 text-white font-sans w-3/4 rounded-md"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Social Media */}
      <div className="bg-[#171717] border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-8 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-white font-sans text-sm">
              Copyright @ {currentYear} | termbi
            </div>

            {/* Social Media Icons */}
            <SocialLinks restaurantAdminId={restaurantAdminId} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default RestaurantFooter

