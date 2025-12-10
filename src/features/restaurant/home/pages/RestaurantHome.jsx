import RestaurantNavbar from "@/shared/components/RestaurantNavbar";
import RestaurantFooter from "@/shared/components/RestaurantFooter";
import HeroSection from "../components/HeroSection";
import OurMenu from "../components/OurMenu";
import AboutAs from "../components/AboutAs";
import { useEffect } from "react";

function RestaurantHome() {
   
    
    useEffect(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, []);
    return (
        <div>
            <RestaurantNavbar />
            <HeroSection restaurantSlug="tempora" />
            <AboutAs restaurantAdminId={8} />
            <OurMenu />
            <RestaurantFooter restaurantSlug="tempora" restaurantAdminId={8} />
        </div>
    )
}

export default RestaurantHome;
