import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import HeroSection from "../components/HeroSection";
import WhyTermbi from "../components/Why-Termbi";
import DashboardSection from "../components/DashboardSection";
import PricingPackages from "../components/PricingPackages";
import TrustedRestaurants from "../components/TrustedRestaurants";
import { useEffect } from "react";

function Home() {
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
            <HeroSection />
            <TrustedRestaurants />
            <div className="space-y-12">
            <div className='mt-16'> 
           <WhyTermbi />
           </div>
           <PricingPackages />
           <DashboardSection />
      
           </div>
            <Footer />
        </div>
    )
}

export default Home;
