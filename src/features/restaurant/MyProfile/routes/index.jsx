import { lazy } from 'react';

const ManageProfile = lazy(() => import('../pages/ManageProfile'));
const MyOrder = lazy(() => import('../pages/MyOrder'));
const MyBookings = lazy(() => import('../pages/MyBookings'));
const MyReviews = lazy(() => import('../pages/MyReviews'));

export const manageProfileRoutes = [
  {
    path: '/RestaurantHome/my-profile/manage-profile',
    element: <ManageProfile />
  },
  {
    path: '/RestaurantHome/my-profile/my-order',
    element: <MyOrder />
  },
  {
    path: '/RestaurantHome/my-profile/my-bookings',
    element: <MyBookings />
  },
  {
    path: '/RestaurantHome/my-profile/my-reviews',
    element: <MyReviews />
  }
];

export default manageProfileRoutes;