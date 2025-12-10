import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, EyeOff } from "lucide-react"
import { appRoutes } from "@/routes/routeDefinitions"
import logoLogin from "@/assets/login-assets/logo-login.svg"
import loginImage from "@/assets/login-assets/login.png"
import trueIcon from "@/assets/login-assets/true.svg"

const countryCodes = [
  { value: "+1", label: "+1", flag: "/flags/us.svg" },
  { value: "+966", label: "+966", flag: "/flags/sa.svg" },
  { value: "+963", label: "+963", flag: "/flags/sy.svg" },
]

const SignUp = () => {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantAddress: "",
    restaurantPhone: "",
    restaurantPhoneCode: "+1",
    fullName: "",
    email: "",
    userPhone: "",
    userPhoneCode: "+1",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCountryCodeChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStepSubmit = (event) => {
    event.preventDefault()

    if (step === 3) {
      if (formData.password !== formData.confirmPassword) {
        return
      }
      setStep(4)
      return
    }

    setStep((prev) => Math.min(prev + 1, 4))
  }

  const renderProgress = () => {
    const indicators = [1, 2, 3, 4]

    return (
      <div className="flex items-center gap-4">
        {indicators.map((value, index) => {
          const isCompleted = step > value
          const isActive = step === value
          const isCurrent = isActive || isCompleted

          return (
            <div key={value} className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  value === 4
                    ? step === 4
                      ? "bg-[#EC2323]"
                      : "bg-[#CCCCCC]"
                    : isCurrent
                    ? "bg-[#EC2323] text-white"
                    : "bg-[#CCCCCC] text-white"
                }`}
              >
                {value === 4 ? (
                  <img src={trueIcon} alt="Completed" className="h-5 w-5" />
                ) : (
                  value
                )}
              </div>

              {index !== indicators.length - 1 && (
                <div
                  className={`h-px w-10 md:w-20 ${
                    step > value ? "bg-[#EC2323]" : "bg-[#CCCCCC]"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const renderStepContent = () => {
    if (step === 4) {
      return (
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-heading font-bold text-[#272727]">
              Congratulation!
            </h2>
            <p className="text-xl font-heading font-semibold text-[#EC2323]">
              Your account has created successfully!
            </p>
            <p className="text-lg font-heading font-semibold text-[#272727]">
              Get your restaurant started
            </p>
            <p className="text-sm font-sans text-[#4B4B4B]">
              A verification code has been sent to your email. Please verify your
              account via email. {" "}
              <a href="#" className="text-[#EC2323] hover:underline">
                Open my email
              </a>
            </p>
          </div>

          <div className="text-sm font-sans text-[#272727]">
            You already have an account?{" "}
            <Link to={appRoutes.auth.login} className="text-[#EC2323] hover:underline">
              Log in
            </Link>
          </div>
        </div>
      )
    }

    return (
      <form onSubmit={handleStepSubmit} className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-heading font-bold text-[#272727] ">
            {step === 1
              ? "Tell us about your restaurant"
              : step === 2
              ? "Tell us about your yourself"
              : "Set your password"}
          </h2>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="restaurantName" className="text-sm font-heading">
                <span className="text-[#272727]">Restaurant name</span>
                <span className="text-[#EC2323]"> *</span>
              </label>
              <Input
                id="restaurantName"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleInputChange}
                className="h-12 border-gray-300 bg-white text-base focus:border-[#EC2323] focus:ring-[#EC2323]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="restaurantAddress" className="text-sm font-heading">
                <span className="text-[#272727]">Restaurant address</span>
                <span className="text-[#EC2323]"> *</span>
              </label>
              <Input
                id="restaurantAddress"
                name="restaurantAddress"
                value={formData.restaurantAddress}
                onChange={handleInputChange}
                className="h-12 border-gray-300 bg-white text-base focus:border-[#EC2323] focus:ring-[#EC2323]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="restaurantPhone" className="text-sm font-heading">
                <span className="text-[#272727]">Restaurant phone</span>
                <span className="text-[#EC2323]"> *</span>
              </label>
              <div className="flex gap-2 ">
                <Select
                  value={formData.restaurantPhoneCode}
                  onValueChange={(value) =>
                    handleCountryCodeChange("restaurantPhoneCode", value)
                  }
                >
                  <SelectTrigger className="w-28 h-12 border-gray-300 bg-[#FAEBEB] text-base focus:border-[#EC2323] focus:ring-[#EC2323]">
                    <SelectValue placeholder="Select">
                      {formData.restaurantPhoneCode && (
                        <div className="flex items-center gap-2 ">
                          <img
                            src={countryCodes.find((c) => c.value === formData.restaurantPhoneCode)?.flag || "/flags/us.svg"}
                            alt="flag"
                            className="h-4 w-4"
                          />
                          <span>{formData.restaurantPhoneCode}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((code) => (
                      <SelectItem key={code.value} value={code.value}>
                        <div className="flex items-center gap-2 ">
                          <img src={code.flag} alt="flag" className="h-4 w-4" />
                          <span>{code.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="restaurantPhone"
                  name="restaurantPhone"
                  value={formData.restaurantPhone}
                  onChange={handleInputChange}
                  className="h-12 flex-1 border-gray-300 bg-white text-base focus:border-[#EC2323] focus:ring-[#EC2323]"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-heading">
                <span className="text-[#272727]">Your name</span>
                <span className="text-[#EC2323]"> *</span>
              </label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="h-12 border-gray-300 bg-white text-base focus:border-[#EC2323] focus:ring-[#EC2323]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-heading">
                <span className="text-[#272727]">Your email</span>
                <span className="text-[#EC2323]"> *</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-12 border-gray-300 bg-white text-base focus:border-[#EC2323] focus:ring-[#EC2323]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="userPhone" className="text-sm font-heading">
                <span className="text-[#272727]">Your phone</span>
                <span className="text-[#EC2323]"> *</span>
              </label>
              <div className="flex gap-2">
                <Select
                  value={formData.userPhoneCode}
                  onValueChange={(value) => handleCountryCodeChange("userPhoneCode", value)}
                >
                  <SelectTrigger className="w-28 h-12 border-gray-300 bg-[#FAEBEB] text-base focus:border-[#EC2323] focus:ring-[#EC2323]">
                    <SelectValue placeholder="Select">
                      {formData.userPhoneCode && (
                        <div className="flex items-center gap-2">
                          <img
                            src={countryCodes.find((c) => c.value === formData.userPhoneCode)?.flag || "/flags/us.svg"}
                            alt="flag"
                            className="h-4 w-4"
                          />
                          <span>{formData.userPhoneCode}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((code) => (
                      <SelectItem key={code.value} value={code.value}>
                        <div className="flex items-center gap-2">
                          <img src={code.flag} alt="flag" className="h-4 w-4" />
                          <span>{code.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="userPhone"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleInputChange}
                  className="h-12 flex-1 border-gray-300 bg-white text-base focus:border-[#EC2323] focus:ring-[#EC2323]"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
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
                  value={formData.password}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 bg-white pr-10 text-base focus:border-[#EC2323] focus:ring-[#EC2323]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-heading">
                <span className="text-[#272727]">Confirm password</span>
                <span className="text-[#EC2323]"> *</span>
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 bg-white pr-10 text-base focus:border-[#EC2323] focus:ring-[#EC2323]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-[#EC2323] py-6 text-base font-medium text-white hover:bg-red-700"
        >
          {step === 3 ? "Register" : "Next"}
        </Button>

        <div className="text-center text-sm font-sans text-[#272727]">
          You already have an account?{" "}
          <Link to={appRoutes.auth.login} className="text-[#EC2323] hover:underline">
            Log in
          </Link>
        </div>
      </form>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 bg-[#FFF8F8] px-6 py-12 flex flex-col mt-16 ">
        <div className="mt-4 flex justify-center mt-20 ">{renderProgress()}</div>

        <div className="flex-1 flex items-center justify-center mt-12">
          {renderStepContent()}
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-start mt-24 px-12 py-12  bg-white">
        <div className="w-full  space-y-8">
          <div className="flex justify-center ">
            <img src={logoLogin} alt="termbi logo" className="h-12" />
          </div>
          <p className="text-center text-lg font-sans text-[#8F8F8F]">
            Restaurants Management System
          </p>
          <div className="flex justify-center">
            <img src={loginImage} alt="Sign up illustration" className="w-full max-w-2xl h-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
