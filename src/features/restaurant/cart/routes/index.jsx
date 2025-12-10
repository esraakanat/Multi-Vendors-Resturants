import { lazy } from 'react';

const Cart = lazy(() => import('../pages/Cart'));

export const cartRoutes = [
  {
    path: '/RestaurantHome/cart',
    element: <Cart />
  }
];

export default cartRoutes;