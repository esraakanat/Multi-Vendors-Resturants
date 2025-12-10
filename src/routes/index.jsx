import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// استيراد مسارات الميزات
import homeRoutes from '../features/home/routes';
import authRoutes from '../features/auth/routes';
import contactRoutes from '../features/contact/routes';
import aboutRoutes from '../features/about/routes';
import ServicesRoutes from '../features/services/routes';
import RestaurantHomeRoutes from '../features/restaurant/home/routes';
import cartRoutes from '../features/restaurant/cart/routes';
import checkoutRoutes from '../features/restaurant/checkout/routes';
import placeOrderRoutes from '../features/restaurant/PlaceOrder/routes';
import confirmOrderRoutes from '../features/restaurant/ConfirmOrder/routes';
import manageProfileRoutes from '../features/restaurant/MyProfile/routes';
import myOrderRoutes from '../features/restaurant/MyProfile/routes';
import myBookingsRoutes from '../features/restaurant/MyProfile/routes';
import myReviewsRoutes from '../features/restaurant/MyProfile/routes';
import reserveDetailsRoutes from '../features/restaurant/ReserveDetails/routes';
// استيراد مكون 404
import NotFoundPage from '../shared/components/NotFoundPage';

// تعريف المسارات الرئيسية
const routes = [
  {
    path: '/',
    element: <Outlet />,
    children: [
      ...homeRoutes,
      ...contactRoutes,
      ...authRoutes,
      ...ServicesRoutes,
      ...aboutRoutes,
      ...RestaurantHomeRoutes,
      ...cartRoutes,
      ...checkoutRoutes,
      ...placeOrderRoutes,
      ...confirmOrderRoutes,
      ...manageProfileRoutes,
      ...myOrderRoutes,
      ...myBookingsRoutes,
      ...myReviewsRoutes,
      ...reserveDetailsRoutes,
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
];

// إنشاء الراوتر
const router = createBrowserRouter(routes);

// مكون مقدم الراوتر
export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}

