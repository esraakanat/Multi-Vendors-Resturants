import { lazy } from 'react';

const ConfirmOrder = lazy(() => import('../pages/ConfirmOrder'));

export const confirmOrderRoutes = [
  {
    path: '/RestaurantHome/cart/checkout/place-order/confirm-order',
    element: <ConfirmOrder />
  }
];

export default confirmOrderRoutes;