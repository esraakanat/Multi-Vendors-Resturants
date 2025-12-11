import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { X, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import googleIcon from "@/assets/restaurant-assets/auth/google.svg"
import facebookIcon from "@/assets/restaurant-assets/auth/facebook.svg"
import { useLogin, useRegister } from "@/features/auth/services/queryAuth"

function AuthModal({ isOpen, onClose, redirectTo, initialMode = "login" }) {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(initialMode === "login")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const loginMutation = useLogin()
  const registerMutation = useRegister()
  const prevIsOpenRef = useRef(false)

  // Reset form only when modal opens (not on every render)
  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      setFormData({ name: "", email: "", password: "" })
      setError("")
      setIsLogin(initialMode === "login")
    }
    prevIsOpenRef.current = isOpen
  }, [isOpen, initialMode])

  if (!isOpen) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      // Ensure we're updating the correct field
      const updated = { ...prev, [name]: value }
      return updated
    })
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      if (isLogin) {
        // Login
        const result = await loginMutation.mutateAsync({
          email: formData.email,
          password: formData.password,
        })

        if (result?.access_token) {
          onClose()
          if (redirectTo) {
            navigate(redirectTo)
          } else {
            // Navigate to current location to refresh auth state without full reload
            navigate(window.location.pathname, { replace: true })
            // Trigger auth change event
            window.dispatchEvent(new Event("authChange"))
          }
        }
      } else {
        // Register
        const result = await registerMutation.mutateAsync({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })

        if (result?.access_token) {
          onClose()
          if (redirectTo) {
            navigate(redirectTo)
          } else {
            // Navigate to current location to refresh auth state without full reload
            navigate(window.location.pathname, { replace: true })
            // Trigger auth change event
            window.dispatchEvent(new Event("authChange"))
          }
        }
      }
    } catch (err) {
      // Handle error
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        (isLogin ? "Login failed. Please try again." : "Registration failed. Please try again.")
      setError(errorMessage)
      console.error("Auth error:", err)
    }
  }

  const handleSocialAuth = (provider) => {
    // Handle social authentication
    console.log(`Authenticating with ${provider}`)
    onClose()
    if (redirectTo) {
      navigate(redirectTo)
    }
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setFormData({ name: "", email: "", password: "" })
    setError("") // Clear error when switching modes
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 z-10">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-[#272727] mb-8">
          {isLogin ? "Log in" : "Create an Account"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Name Field - Only for Sign Up */}
          {!isLogin && (
            <div>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-[#272727] bg-white focus:border-[#EC2323] focus:ring-[#EC2323]"
                required
                disabled={loginMutation.isPending || registerMutation.isPending}
              />
            </div>
          )}

          {/* Email Field */}
          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-[#272727] bg-white focus:border-[#EC2323] focus:ring-[#EC2323]"
              required
              disabled={loginMutation.isPending || registerMutation.isPending}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm text-[#272727] bg-white focus:border-[#EC2323] focus:ring-[#EC2323]"
              required
              disabled={loginMutation.isPending || registerMutation.isPending}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={loginMutation.isPending || registerMutation.isPending}
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loginMutation.isPending || registerMutation.isPending}
            className="w-full bg-[#EC2323] hover:bg-[#d02020] text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending || registerMutation.isPending
              ? "Loading..."
              : isLogin
              ? "Log in"
              : "Sign up"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300" />
          <span className="px-4 text-sm text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        {/* Social Auth Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialAuth("google")}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition-colors"
          >
            <img src={googleIcon} alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium text-[#272727]">
              Continue with Google
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialAuth("facebook")}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition-colors"
          >
            <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
            <span className="text-sm font-medium text-[#272727]">
              Continue with Facebook
            </span>
          </button>
        </div>

        {/* Toggle Auth Mode */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? (
            <>
              New in termbi?{" "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="text-[#EC2323] font-medium hover:underline"
              >
                Create new account
              </button>
            </>
          ) : (
            <>
              already have an account?{" "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="text-[#EC2323] font-medium hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default AuthModal

