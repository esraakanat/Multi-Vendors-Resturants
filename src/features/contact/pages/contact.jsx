import Navbar from "@/shared/components/Navbar"
import Footer from "@/shared/components/Footer"
import ContactComponent from "../ContactComponent"
import { useEffect } from "react";

function Contact() {
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
            <ContactComponent />
            <Footer />
        </div>
    )
}

export default Contact;