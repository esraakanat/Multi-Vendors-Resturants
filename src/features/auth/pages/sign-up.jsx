import SignUp from "../components/sign-up"
import Navbar from "@/shared/components/Navbar"
import { useEffect } from "react";

const Signup = () => {
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
      <SignUp />
     
    </div>
  )
};

export default Signup;
