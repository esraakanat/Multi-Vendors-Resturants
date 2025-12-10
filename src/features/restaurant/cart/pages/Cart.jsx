import RestaurantNavbar from "@/shared/components/RestaurantNavbar"
import RestaurantFooter from "@/shared/components/RestaurantFooter"
import CartPage from "../components/CartPage"
import { useEffect } from "react";

function Cart() {
    useEffect(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, []);
  return (
    <div >
      <RestaurantNavbar />
      <CartPage />
      <RestaurantFooter />
    </div>
  )
}

export default Cart
