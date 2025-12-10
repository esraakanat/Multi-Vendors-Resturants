import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import contactImage from "@/assets/contact-assets/contact-us.png"
import phoneIcon from "@/assets/contact-assets/phone.svg"
import faxIcon from "@/assets/contact-assets/fax.svg"
import emailIcon from "@/assets/contact-assets/email.svg"

function ContactComponent() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    findUs: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Show success toast
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for contacting us. We will get back to you soon.",
      className: "bg-green-500 text-white border-green-600",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      findUs: "",
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="w-full bg-white py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Section - Form and Contact Info */}
          <div className="space-y-8 md:mx-auto lg:mx-0 mt-20">
            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-4xl font-heading font-bold text-[#EC2323]">
                Contact <span className="text-[#272727]">Us</span>
              </h1>
              <p className="text-base max-w-lg font-sans text-[#272727] leading-relaxed">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Name Field */}
               <div className="space-y-2">
                 <div className="relative">
                   <Input
                     id="name"
                     name="name"
                     type="text"
                     required
                     value={formData.name}
                     onChange={handleChange}
                     className="max-w-lg border-gray-300 focus:border-[#EC2323] focus:ring-[#EC2323] h-auto !py-3"
                   />
                   {!formData.name && (
                     <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm font-sans ">
                       <span className="text-[#272727]">Name</span>
                       <span className="text-[#EC2323]"> *</span>
                     </div>
                   )}
                 </div>
               </div>

              {/* Email Field */}
              <div className="space-y-2">
                 <div className="relative">
                   <Input
                     id="email"
                     name="email"
                     type="email"
                     value={formData.email}
                     onChange={handleChange}
                     className="max-w-lg border-gray-300 focus:border-[#EC2323] focus:ring-[#EC2323] h-auto !py-3"
                   />
                  {!formData.email && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm font-sans text-[#272727]">
                      Email
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                 <div className="relative">
                   <Input
                     id="phone"
                     name="phone"
                     type="tel"
                     required
                     value={formData.phone}
                     onChange={handleChange}
                     className="max-w-lg border-gray-300 focus:border-[#EC2323] focus:ring-[#EC2323] h-auto !py-3"
                   />
                  {!formData.phone && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm font-sans">
                      <span className="text-[#272727]">Phone number</span>
                      <span className="text-[#EC2323]"> *</span>
                    </div>
                  )}
                </div>
              </div>

              {/* How did you find us? */}
              <div className="space-y-2">
                <Select value={formData.findUs} onValueChange={(value) => setFormData({ ...formData, findUs: value })}>
                  <SelectTrigger className="max-w-lg border-gray-300 focus:border-[#EC2323] focus:ring-[#EC2323] data-[placeholder]:text-[#272727]">
                    <SelectValue placeholder="How did you find us?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="max-w-lg">
              <Button
                type="submit"
                className="w-full   bg-[#EC2323] hover:bg-red-700 text-white font-sans text-base py-6 rounded-md font-medium"
              >
                SEND
              </Button>
              </div>
            </form>

            {/* Contact Information */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 pt-8">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <img src={phoneIcon} alt="phone" className="w-6 h-6 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm font-sans font-semibold text-[#272727] mb-1">PHONE</span>
                  <span className="text-xs font-sans text-[#272727] ">+44 543 871 1234</span>
                </div>
              </div>

              {/* Fax */}
              <div className="flex items-start gap-4">
                <img src={faxIcon} alt="fax" className="w-6 h-6 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm font-sans font-semibold text-[#272727] mb-1">FAX</span>
                  <span className="text-xs font-sans text-[#272727] ">+44 543 871 1234</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <img src={emailIcon} alt="email" className="w-6 h-6 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm font-sans font-semibold text-[#272727] mb-1">EMAIL</span>
                  <span className="text-xs font-sans text-[#272727">info@termbi.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center mt-24 ">
            <div className="w-full max-w-lg">
              <img
                src={contactImage}
                alt="Contact us illustration"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactComponent

