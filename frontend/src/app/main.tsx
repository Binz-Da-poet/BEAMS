import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import '../styles.css';
import { AuthProvider, ProtectedRoute } from '../features/auth';
import RootLayout from './RootLayout';
import { MenuPage } from '../features/menu';
import { HeavyOrderPage, JacketOrderPage, CoatOrderPage, SuitOrderPage, PantsOrderPage, VestOrderPage, JacketOrderConfirmationPage, CoatOrderConfirmationPage, SuitOrderConfirmationPage, PantsOrderConfirmationPage, VestOrderConfirmationPage } from '../features/order';
import { CustomerInfoPage, CustomerConfirmationPage } from '../features/customer';
import { CompletePage, DraftsPage } from '../features/shared';
import LoginPage from '../features/auth/pages/LoginPage';
import { DashboardPage } from '../features/dashboard';
import {
  AdminDashboardPage,
  StaffManagementPage,
  StoreManagementPage,
  DatabaseManagementPage,
  FabricMasterPage,
  PatternMasterPage,
  BodyLiningMasterPage,
  SleeveLiningMasterPage,
  ButtonMasterPage,
  OptionMasterPage,
  SupplierMasterPage,
  MCodeMasterPage,
} from '../features/admin';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute><RootLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Navigate to="/menu" replace /> },
      
      // Store & Factory Staff Routes
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
      { path: 'dashboard', element: <DashboardPage /> },
      
      // Admin-only Routes
      {
        path: 'admin',
        element: <ProtectedRoute allowedRoles={['ADMIN']} />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'staff', element: <StaffManagementPage /> },
          { path: 'stores', element: <StoreManagementPage /> },
          { path: 'database', element: <DatabaseManagementPage /> },
          { path: 'database/fabrics', element: <FabricMasterPage /> },
          { path: 'database/patterns', element: <PatternMasterPage /> },
          { path: 'database/body-linings', element: <BodyLiningMasterPage /> },
          { path: 'database/sleeve-linings', element: <SleeveLiningMasterPage /> },
          { path: 'database/buttons', element: <ButtonMasterPage /> },
          { path: 'database/options', element: <OptionMasterPage /> },
          { path: 'database/suppliers', element: <SupplierMasterPage /> },
          { path: 'database/mcodes', element: <MCodeMasterPage /> },
        ],
      },
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
