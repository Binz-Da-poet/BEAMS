import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserMenu, AuthGuard } from '../features/auth';

export default function RootLayout(): React.ReactElement {
  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3 border-b" style={{ borderColor: 'var(--line)' }}>
        <div className="justify-self-start">
          <Link to="/">
            <img src="/assets/images/beams-logo.svg" alt="BEAMS" className="h-12" />
          </Link>
        </div>
        <div className="justify-self-center flex items-center space-x-6">
          <img src="/assets/images/header_image.png" alt="Custom Tailor" className="h-[62px]" />
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Dashboard
            </Link>
            <Link to="/menu" className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Menu
            </Link>
          </nav>
        </div>
        <div className="justify-self-end flex items-center space-x-4">
          <div className="text-sm text-slate-900">
            <div className="flex gap-1 justify-end">
              <span className="text-slate-500">店番：</span>
              <span>001</span>
            </div>
            <div className="flex gap-1 justify-end">
              <span className="text-slate-500">店略：</span>
              <span>FPT</span>
            </div>
          </div>
          <UserMenu />
        </div>
      </header>
      <main className="p-5">
        <AuthGuard>
          <Outlet />
        </AuthGuard>
      </main>
    </div>
  );
}
