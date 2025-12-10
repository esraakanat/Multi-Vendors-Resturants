import LoginComponent from "../components/login"
import Navbar from "@/shared/components/Navbar"
import { useEffect } from "react";

const Login = () => {
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
    <LoginComponent />

   </div>
  )
}

export default Login

