import { lazy } from 'react';

const ReserveDetails = lazy(() => import('../pages/ReserveTable'));

export const reserveDetailsRoutes = [
  {
    path: '/RestaurantHome/reserve-details',
    element: <ReserveDetails />
  }
];

export default reserveDetailsRoutes;