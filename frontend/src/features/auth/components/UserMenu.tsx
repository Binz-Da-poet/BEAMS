import React, { useState } from 'react';
import { useAuth } from '../auth.context';

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case '店舗':
        return 'Cửa hàng';
      case '店員':
        return 'Nhân viên';
      case 'admin':
        return 'Admin';
      default:
        return role;
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 text-sm text-slate-900 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md px-3 py-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">{user.name.charAt(0).toUpperCase()}</div>
        <div className="text-left">
          <div className="font-medium">{user.name}</div>
          <div className="text-xs text-slate-500">{getRoleDisplayName(user.role)}</div>
        </div>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-gray-500">{getRoleDisplayName(user.role)}</div>
              {user.storeName && <div className="text-xs text-gray-500">{user.storeName}</div>}
            </div>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Đăng xuất
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
