import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../styles.css';
import { AuthProvider } from '../features/auth';
import RootLayout from './RootLayout';
import { MenuPage } from '../features/menu';
import { HeavyOrderPage, JacketOrderPage, CoatOrderPage, SuitOrderPage, PantsOrderPage, VestOrderPage, JacketOrderConfirmationPage, CoatOrderConfirmationPage, SuitOrderConfirmationPage, PantsOrderConfirmationPage, VestOrderConfirmationPage } from '../features/order';
import { CustomerInfoPage, CustomerConfirmationPage } from '../features/customer';
import { CompletePage, DraftsPage } from '../features/shared';
import LoginPage from '../features/auth/pages/LoginPage';
import { DashboardPage } from '../features/dashboard';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'order', element: <HeavyOrderPage /> },
      { path: 'jacket-order', element: <JacketOrderPage /> },
      { path: 'coat-order', element: <CoatOrderPage /> },
      { path: 'suit-order', element: <SuitOrderPage /> },
      { path: 'pants-order', element: <PantsOrderPage /> },
      { path: 'vest-order', element: <VestOrderPage /> },
      { path: 'jacket-order-confirmation', element: <JacketOrderConfirmationPage /> },
      { path: 'coat-order-confirmation', element: <CoatOrderConfirmationPage /> },
      { path: 'suit-order-confirmation', element: <SuitOrderConfirmationPage /> },
      { path: 'pants-order-confirmation', element: <PantsOrderConfirmationPage /> },
      { path: 'vest-order-confirmation', element: <VestOrderConfirmationPage /> },
      { path: 'customer', element: <CustomerInfoPage /> },
      { path: 'customer-info-confirmation', element: <CustomerConfirmationPage /> },
      { path: 'complete', element: <CompletePage /> },
      { path: 'drafts', element: <DraftsPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
