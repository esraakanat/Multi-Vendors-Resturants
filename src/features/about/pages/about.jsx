import Navbar from "@/shared/components/Navbar"
import Footer from "@/shared/components/Footer"
import AboutHero from "../component/AboutHero"
import AboutMission from "../component/AboutMission"
import AboutValues from "../component/AboutValues"
import AboutStats from "../component/AboutStats"
import AboutVision from "../component/AboutVision"
import { useEffect } from "react"

function About() {
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
            <AboutHero />
            <div className="space-y-12">
                <div className="mt-16">
                    <AboutMission />
                </div>
                <AboutValues />
                <AboutStats />
                <AboutVision />
            </div>
            <Footer />
        </div>
    )
}

export default About;