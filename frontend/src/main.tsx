import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles.css';
import RootLayout from '@/routes/RootLayout';
import MenuPage from '@/pages/MenuPage';
import HeavyOrderPage from '@/pages/HeavyOrderPage';
import CustomerInfoPage from '@/pages/CustomerInfoPage';
import DraftsPage from '@/pages/DraftsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <MenuPage /> },
      { path: 'order', element: <HeavyOrderPage /> },
      { path: 'customer', element: <CustomerInfoPage /> },
      { path: 'drafts', element: <DraftsPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
