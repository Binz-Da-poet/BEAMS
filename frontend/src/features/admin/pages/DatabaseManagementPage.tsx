import React from 'react';
import { Link } from 'react-router-dom';

const DatabaseManagementPage: React.FC = () => {
  const masterTables = [
    {
      name: '重衣料生地マスタ',
      description: '品番・色・価格・仕入先などの情報を管理します',
      icon: '🧵',
      path: '/admin/database/fabrics',
      color: 'bg-indigo-500',
      count: 145,
    },
    {
      name: 'パターンマスタ',
      description: 'ジャケット・コート・スーツ等の型紙情報を管理します',
      icon: '📐',
      path: '/admin/database/patterns',
      color: 'bg-pink-500',
      count: 89,
    },
    {
      name: '胴裏マスタ',
      description: '胴裏の素材・カラー・在庫状況を管理します',
      icon: '🎨',
      path: '/admin/database/body-linings',
      color: 'bg-yellow-500',
      count: 56,
    },
    {
      name: '袖裏マスタ',
      description: '袖裏の素材・カラー・在庫状況を管理します',
      icon: '👕',
      path: '/admin/database/sleeve-linings',
      color: 'bg-green-500',
      count: 42,
    },
    {
      name: 'ボタンマスタ',
      description: 'ボタン種類・カラー・価格を管理します',
      icon: '⚫',
      path: '/admin/database/buttons',
      color: 'bg-gray-600',
      count: 78,
    },
    {
      name: 'オプションマスタ',
      description: '裏仕様や追加オプションの情報を管理します',
      icon: '⚙️',
      path: '/admin/database/options',
      color: 'bg-blue-500',
      count: 34,
    },
    {
      name: 'サプライヤーマスタ',
      description: '仕入先の基本情報・連絡先を管理します',
      icon: '🏭',
      path: '/admin/database/suppliers',
      color: 'bg-orange-500',
      count: 12,
    },
    {
      name: 'コードマスタ (MCode)',
      description: 'プラン・アイテム種別などのコードを管理します',
      icon: '🔤',
      path: '/admin/database/mcodes',
      color: 'bg-purple-500',
      count: 67,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">マスタ管理</h1>
              <p className="mt-1 text-sm text-gray-600">各種マスタデータの閲覧・登録・更新を行います</p>
            </div>
            <Link to="/admin" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              ← ダッシュボードに戻る
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">マスタ概要</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{masterTables.reduce((acc, t) => acc + t.count, 0)}</div>
              <div className="text-sm text-gray-600 mt-1">総登録件数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{masterTables.length}</div>
              <div className="text-sm text-gray-600 mt-1">マスタテーブル数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600 mt-1">運用中のテーブル</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">145</div>
              <div className="text-sm text-gray-600 mt-1">直近の更新件数</div>
            </div>
          </div>
        </div>

        {/* Master Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {masterTables.map((table) => (
            <Link key={table.path} to={table.path} className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-6 group relative overflow-hidden">
              {/* Background Icon */}
              <div className="absolute -right-4 -top-4 text-9xl opacity-5 group-hover:opacity-10 transition">{table.icon}</div>

              {/* Content */}
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${table.color} rounded-lg p-3 group-hover:scale-110 transition-transform`}>
                    <span className="text-3xl">{table.icon}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{table.count}</div>
                    <div className="text-xs text-gray-500">records</div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition mb-2">{table.name}</h3>
                <p className="text-sm text-gray-600">{table.description}</p>

                {/* Action Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-blue-600 font-medium group-hover:underline">管理画面へ →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">クイック操作</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-left">
              <div className="font-semibold">全データをエクスポート</div>
              <div className="text-sm opacity-90">CSV形式でマスタを出力します</div>
            </button>
            <button className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-left">
              <div className="font-semibold">データをインポート</div>
              <div className="text-sm opacity-90">CSVファイルから一括登録します</div>
            </button>
            <button className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-left">
              <div className="font-semibold">バックアップ作成</div>
              <div className="text-sm opacity-90">最新のバックアップを作成します</div>
            </button>
          </div>
        </div>

        {/* Recent Changes */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">最近のマスタ更新</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { table: '重衣料生地マスタ', action: '追加', record: 'FAB-2024-145', time: '2時間前', user: '管理者' },
                { table: 'パターンマスタ', action: '更新', record: 'PTN-JKT-089', time: '5時間前', user: '管理者' },
                { table: 'ボタンマスタ', action: '追加', record: 'BTN-BLK-078', time: '1日前', user: '管理者' },
                { table: 'サプライヤーマスタ', action: '更新', record: 'SUP-012', time: '2日前', user: '管理者' },
              ].map((change, index) => (
                <div key={index} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full mr-3 ${change.action === '追加' ? 'bg-green-500' : 'bg-blue-500'}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{change.table}</span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{change.action}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">レコード: {change.record}</span>
                      <span className="text-xs text-gray-400">• 更新者: {change.user}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{change.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManagementPage;
