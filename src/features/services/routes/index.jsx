
import {lazy} from 'react';

const Services = lazy(() => import('../pages/services'))

 export const servicesRoutes = [
  {
    path: '/services',
    element: <Services />
  },
];

export default servicesRoutes;


