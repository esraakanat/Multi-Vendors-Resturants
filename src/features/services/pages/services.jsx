import Navbar from "@/shared/components/Navbar"
import Footer from "@/shared/components/Footer"
import ServicesHero from "../components/ServicesHero"
import GetWebsiteService from "../components/GetWebsiteService"
import ReservationService from "../components/ReservationService"
import OrderingService from "../components/OrderingService"
import MarketingService from "../components/MarketingService"
import { useEffect } from "react"

function Services() {
    useEffect(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, []);
    
    return (
        <div>
            <Navbar />
            <ServicesHero />
            <div className="space-y-12">
                <div className="mt-16">
                    <GetWebsiteService />
                </div>
                <ReservationService />
                <OrderingService />
                <MarketingService />
            </div>
            <Footer />
        </div>
    )
}

export default Services;