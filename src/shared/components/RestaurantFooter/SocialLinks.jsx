import faceIcon from "@/assets/shared/Face.svg"
import instaIcon from "@/assets/shared/Insta.svg"
import xIcon from "@/assets/shared/X.svg"
import { useSocialLinks } from "@/features/restaurant/home/services/querySocialLinks"

// Map API type to icon
const getSocialIcon = (type) => {
  const typeLower = type?.toLowerCase() || ""
  
  if (typeLower.includes("facebook") || typeLower === "facebook") {
    return faceIcon
  } else if (typeLower.includes("instagram") || typeLower === "instagram") {
    return instaIcon
  } 
  // Default icon if type doesn't match
  return xIcon
}

function SocialLinks({ restaurantAdminId = 8 }) {
  const { data: socialLinks } = useSocialLinks(restaurantAdminId)

  // Default social links if API fails or no data
  const defaultSocialLinks = [
    { icon: faceIcon, alt: "Facebook", href: "#" },
    { icon: instaIcon, alt: "Instagram", href: "#" },
    { icon: xIcon, alt: "X (Twitter)", href: "#" },
  ]

  // Use API data if available, otherwise use defaults
  const linksToDisplay = socialLinks && Array.isArray(socialLinks) && socialLinks.length > 0
    ? socialLinks.map((link) => ({
        icon: getSocialIcon(link.type),
        href: link.url || "#",
      }))
    : defaultSocialLinks

  return (
    <div className="flex items-center gap-3">
      {linksToDisplay.map((social, index) => (
        <a
          key={social.href || index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
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
  )
}

export default SocialLinks

