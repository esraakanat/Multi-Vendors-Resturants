import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ChevronDown, Menu } from "lucide-react"
import { appRoutes } from "@/routes/routeDefinitions"
import logo from "@/assets/shared/logo.svg"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationLinks = [
    { label: "Home", to: appRoutes.home },
    { label: "Services", to: appRoutes.services.main }, // يمكنك إضافة route للـ Services لاحقاً
    { label: "About us", to: appRoutes.about.main },
    { label: "Contact us", to: appRoutes.contact.main },
 
  ]

  return (
    <nav className="bg-[#272727] text-white font-sans w-full fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
            to={appRoutes.home}
            className="flex items-center flex-shrink-0  rounded-sm"
          >
            <img src={logo} alt="termbi logo" className="h-8 w-32" />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-white hover:opacity-80 transition-opacity font-sans text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Language Selector and Login - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 text-white hover:opacity-80 transition-opacity outline-none bg-transparent border-none cursor-pointer">
                <img src="/flags/us.svg" alt="US flag" className="w-5 h-5" />
                <ChevronDown className="h-3.5 w-3.5" />
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

            {/* Login Button */}
            <Button
              variant="outline"
              asChild
              className="bg-[#272727] text-white border border-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-300 font-sans rounded-md px-4 md:px-8 py-2 h-auto"
            >
              <Link to={appRoutes.auth.login}>Log in</Link>
            </Button>
          </div>

          {/* Hamburger Menu Button - Mobile */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden text-white hover:bg-gray-700 p-2"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#272727] text-white border-gray-700 w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-4">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white hover:opacity-80 transition-opacity font-sans text-base py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Language Selector - Mobile */}
                <div className="pt-4 border-t border-gray-700">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity outline-none bg-transparent border-none cursor-pointer w-full justify-start">
                      <img src="/flags/us.svg" alt="US flag" className="w-5 h-5" />
                      <span className="font-sans">Language</span>
                      <ChevronDown className="h-4 w-4 ml-auto" />
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
                </div>

                {/* Login Button - Mobile */}
                <div className="pt-4">
                  <Button
                    variant="outline"
                    asChild
                    className="bg-[#272727] text-white border border-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-300 font-sans rounded-md px-8 py-2 w-full"
                  >
                    <Link 
                      to={appRoutes.auth.login}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

