import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/auth.context';

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();

  const menuItems = [
    {
      title: 'スタッフ管理',
      description: '店舗スタッフの登録・権限を管理します',
      icon: '👥',
      path: '/admin/staff',
      color: 'bg-blue-500',
    },
    {
      title: '店舗管理',
      description: '店舗情報・担当者・連絡先を管理します',
      icon: '🏪',
      path: '/admin/stores',
      color: 'bg-green-500',
    },
    {
      title: 'マスタ管理',
      description: '生地・型紙・付属品などのマスタ情報を管理します',
      icon: '🗄️',
      path: '/admin/database',
      color: 'bg-purple-500',
    },
    {
      title: '重衣料生地マスタ',
      description: '仕入先・品番・価格情報を更新します',
      icon: '🧵',
      path: '/admin/database/fabrics',
      color: 'bg-indigo-500',
    },
    {
      title: 'パターンマスタ',
      description: 'サイズや仕様のマスタ情報を管理します',
      icon: '📐',
      path: '/admin/database/patterns',
      color: 'bg-pink-500',
    },
    {
      title: '裏地マスタ',
      description: '胴裏・袖裏などの情報を管理します',
      icon: '🎨',
      path: '/admin/database/body-linings',
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">管理者ダッシュボード</h1>
              <p className="mt-1 text-sm text-gray-600">お疲れさまです、{user?.name || '管理者'} さん</p>
            </div>
            <Link to="/" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              ← メニューに戻る
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">登録スタッフ数</p>
                <p className="text-2xl font-bold text-gray-900">24名</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏪</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">登録店舗数</p>
                <p className="text-2xl font-bold text-gray-900">8店舗</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">マスタ登録件数</p>
                <p className="text-2xl font-bold text-gray-900">1,234件</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 group">
              <div className="flex items-start">
                <div className={`${item.color} rounded-lg p-3 group-hover:scale-110 transition-transform`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">最近の更新履歴</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { action: 'スタッフを追加しました', user: '管理者', time: '2時間前', type: 'create' },
                { action: '店舗情報を更新しました', user: '管理者', time: '5時間前', type: 'update' },
                { action: '生地マスタを追加しました', user: '管理者', time: '1日前', type: 'create' },
                { action: 'パターン情報を変更しました', user: '管理者', time: '2日前', type: 'update' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full mr-3 ${activity.type === 'create' ? 'bg-green-500' : 'bg-blue-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">更新者: {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
