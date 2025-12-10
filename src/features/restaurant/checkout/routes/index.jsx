import { lazy } from 'react';

const Checkout = lazy(() => import('../pages/Checkout'));

export const checkoutRoutes = [
  {
    path: '/RestaurantHome/cart/checkout',
    element: <Checkout />
  }
];

export default checkoutRoutes;