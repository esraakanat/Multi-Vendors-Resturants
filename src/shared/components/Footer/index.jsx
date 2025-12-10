import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import logo from "@/assets/shared/logo.svg"
import faceIcon from "@/assets/shared/Face.svg"
import instaIcon from "@/assets/shared/Insta.svg"
import xIcon from "@/assets/shared/X.svg"
import { appRoutes } from "@/routes/routeDefinitions"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const featuresLinks = [
    { label: "Get Website", href: "#" },
    { label: "Reservation", href: "#" },
    { label: "Ordering", href: "#" },
    { label: "Marketing", href: "#" },
  ]

  const quickLinks = [
    { label: "Home", to: appRoutes.home },
    { label: "Services", to: appRoutes.services.main },
    { label: "About us", to: appRoutes.about.main },
    { label: "Contact us", to: appRoutes.contact.main },
  ]

  const socialLinks = [
    { icon: faceIcon, alt: "Facebook", href: "#" },
    { icon: instaIcon, alt: "Instagram", href: "#" },
    { icon: xIcon, alt: "X (Twitter)", href: "#" },
  ]

  return (
    <footer className="w-full">
      {/* Main Footer Section */}
      <div className="bg-[#272727] text-white font-sans">
        <div className="container mx-auto px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1 - Logo */}
            <div className="flex flex-col lg:items-center lg:justify-center">
              <div className="mb-4">
                <img src={logo} alt="termbi logo" className="h-8 w-auto" />
              </div>
            </div>

            {/* Column 2 - Features */}
            <div className="flex flex-col">
              <h3 className="text-white font-heading font-bold text-lg mb-4">
                Features
              </h3>
              <ul className="space-y-3">
                {featuresLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white hover:opacity-80 transition-opacity font-sans text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Quick Link */}
            <div className="flex flex-col">
              <h3 className="text-white font-heading font-bold text-lg mb-4">
                Quick Link
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-white hover:opacity-80 transition-opacity font-sans text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Newsletters */}
            <div className="flex flex-col">
              <h3 className="text-white font-heading font-bold text-lg mb-4">
                Newsletters
              </h3>
              <p className="text-white font-sans text-sm mb-4 leading-relaxed">
                Stay up to date with our latest news, receive exclusive deals, and more
              </p>
              <form className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white text-gray-900 placeholder:text-[#A6A6A6] rounded-md border-none focus-visible:ring-2 focus-visible:ring-gray-400"
                />
                <Button
                  type="submit"
                  className="bg-[#EC2323] hover:bg-red-700 text-white font-sans w-full rounded-md w-48 "
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Social Media */}
      <div className="bg-[#171717] text-white font-sans">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-white font-sans text-sm">
              Copyright @ {currentYear} | termbi
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.alt}
                  href={social.href}
                  className="text-white hover:opacity-80 transition-opacity"
                  aria-label={social.alt}
                >
                  <img
                    src={social.icon}
                    alt={social.alt}
                    className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

