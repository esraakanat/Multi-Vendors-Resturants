// تعريف المسارات المركزية
export const appRoutes = {
  home: '/',
  auth: {
    login: '/login',
    signup: '/signup'
  },
  contact:{
    main: '/contact'
  },
  about:{
    main: '/about'
  },
  services:{
    main: '/services'
  },
  restaurantHome:{
    main: '/RestaurantHome'
  },
  cart:{
    main: '/RestaurantHome/cart'
  },
  checkout:{
    main: '/RestaurantHome/cart/checkout'
  },
  placeOrder:{
    main: '/RestaurantHome/cart/checkout/place-order'
  },
  confirmOrder:{
    main: '/RestaurantHome/cart/checkout/place-order/confirm-order'
  },
  manageProfile:{
    main: '/RestaurantHome/my-profile/manage-profile'
  },
  myOrder:{
    main: '/RestaurantHome/my-profile/my-order'
  },
  myBookings:{
    main: '/RestaurantHome/my-profile/my-bookings'
  },
  myReviews:{
    main: '/RestaurantHome/my-profile/my-reviews'
  },
  reserveDetails:{
    main: '/RestaurantHome/reserve-details'
  }
}