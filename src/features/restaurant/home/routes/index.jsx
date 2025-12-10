import { lazy } from 'react';

const RestaurantHome = lazy(() => import('../pages/RestaurantHome'))

const RestaurantHomeRoutes = [  
  {
    path: '/RestaurantHome',
    element: <RestaurantHome/>
  },
];

export default RestaurantHomeRoutes;
