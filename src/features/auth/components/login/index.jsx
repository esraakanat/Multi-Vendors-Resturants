import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { appRoutes } from "@/routes/routeDefinitions"
import logoLogin from "@/assets/login-assets/logo-login.svg"
import loginImage from "@/assets/login-assets/login.png"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login here
    console.log("Login:", formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 bg-[#FFF8F8] flex flex-col px-6 py-12">
        {/* Title - At the top */}
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-center text-[#272727] mt-24">
          Log in
        </h1>

        {/* Form Container - Centered */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-heading">
                  <span className="text-[#272727]">Email</span>
                  <span className="text-[#EC2323]"> *</span>
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-gray-300 focus:border-[#EC2323] focus:ring-[#EC2323] h-auto !py-3 bg-white"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-heading">
                  <span className="text-[#272727]">Password</span>
                  <span className="text-[#EC2323]"> *</span>
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border-gray-300 focus:border-[#EC2323] focus:ring-[#EC2323] h-auto !py-3 bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-[#EC2323] hover:bg-red-700 text-white font-sans text-base py-6  rounded-md font-medium"
              >
                Log in
              </Button>
            </form>

            {/* Register Link */}
            <div className="text-center">
              <span className="text-sm font-sans text-[#272727]">
                New in termbi?{" "}
              </span>
              <Link
                to={appRoutes.auth.signup}
                className="text-sm font-sans text-[#EC2323] hover:underline"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-white flex-col items-center justify-start mt-24 px-12 py-12">
        <div className="w-full space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <img src={logoLogin} alt="termbi logo" className="h-12" />
          </div>

          {/* Paragraph */}
          <p className="text-center text-lg font-sans text-[#8F8F8F]">
            Restaurants Management System
          </p>

          {/* Login Image */}
          <div className="flex justify-center">
            <img
              src={loginImage}
              alt="Login illustration"
              className="w-full max-w-2xl h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

