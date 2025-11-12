import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.context';

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const roleLabels: Record<string, string> = {
    ADMIN: '管理者',
    STORE: '店舗スタッフ',
    FACTORY_STAFF: '生産担当',
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">{user.name?.charAt(0).toUpperCase() || 'U'}</div>
        <div className="text-left hidden md:block">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500">{roleLabels[user.role] || user.role}</div>
        </div>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20 border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              {user.email && <p className="text-xs text-gray-500 mt-1">{user.email}</p>}
              <p className="text-xs text-indigo-600 mt-1 font-semibold">{roleLabels[user.role] || user.role}</p>
              {user.storeName && <p className="text-xs text-gray-500 mt-1">所属店舗: {user.storeName}</p>}
            </div>

            <div className="py-1">
              {user.role === 'ADMIN' && (
                <button
                  onClick={() => {
                    navigate('/admin');
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="inline-block mr-2">⚙️</span>
                  管理者ダッシュボード
                </button>
              )}

              <button
                onClick={() => {
                  navigate('/menu');
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span className="inline-block mr-2">🏠</span>
                メニュー画面
              </button>

              <button
                onClick={() => {
                  navigate('/drafts');
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span className="inline-block mr-2">📝</span>
                下書き一覧
              </button>
            </div>

            <div className="border-t border-gray-200 py-1">
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <span className="inline-block mr-2">🚪</span>
                ログアウト
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
