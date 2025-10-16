import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function RootLayout(): React.ReactElement {
  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3 border-b" style={{ borderColor: 'var(--line)' }}>
        <div className="justify-self-start">
          <Link to="/">
            <img src="/assets/images/beams-logo.svg" alt="BEAMS" className="h-12" />
          </Link>
        </div>
        <div className="justify-self-center">
          <img src="/assets/images/header_image.png" alt="Custom Tailor" className="h-[62px]" />
        </div>
        <div className="justify-self-end text-sm text-slate-900">
          <div className="flex gap-1 justify-end">
            <span className="text-slate-500">店番：</span>
            <span>001</span>
          </div>
          <div className="flex gap-1 justify-end">
            <span className="text-slate-500">店略：</span>
            <span>FPT</span>
          </div>
        </div>
      </header>
      <main className="p-5">
        <Outlet />
      </main>
    </div>
  );
}
