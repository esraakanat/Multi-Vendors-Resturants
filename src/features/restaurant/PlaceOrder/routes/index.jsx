import { lazy } from 'react';

const PlaceOrder = lazy(() => import('../pages/PlaceOrder'));

export const placeOrderRoutes = [
  {
    path: '/RestaurantHome/cart/checkout/place-order',
    element: <PlaceOrder />
  }
];

export default placeOrderRoutes;