import React from 'react';
import { Link } from 'react-router-dom';

const DatabaseManagementPage: React.FC = () => {
  const masterTables = [
    {
      name: 'Heavy Fabric Master',
      description: 'Quản lý thông tin vải, màu sắc, giá cả',
      icon: '🧵',
      path: '/admin/database/fabrics',
      color: 'bg-indigo-500',
      count: 145,
    },
    {
      name: 'Pattern Master',
      description: 'Quản lý các mẫu thiết kế jacket, coat, suit',
      icon: '📐',
      path: '/admin/database/patterns',
      color: 'bg-pink-500',
      count: 89,
    },
    {
      name: 'Body Lining Master',
      description: 'Quản lý lớp lót thân áo',
      icon: '🎨',
      path: '/admin/database/body-linings',
      color: 'bg-yellow-500',
      count: 56,
    },
    {
      name: 'Sleeve Lining Master',
      description: 'Quản lý lớp lót tay áo',
      icon: '👕',
      path: '/admin/database/sleeve-linings',
      color: 'bg-green-500',
      count: 42,
    },
    {
      name: 'Button Master',
      description: 'Quản lý thông tin nút áo và giá',
      icon: '⚫',
      path: '/admin/database/buttons',
      color: 'bg-gray-600',
      count: 78,
    },
    {
      name: 'Option Master',
      description: 'Quản lý các tùy chọn thêm',
      icon: '⚙️',
      path: '/admin/database/options',
      color: 'bg-blue-500',
      count: 34,
    },
    {
      name: 'Supplier Master',
      description: 'Quản lý thông tin nhà cung cấp',
      icon: '🏭',
      path: '/admin/database/suppliers',
      color: 'bg-orange-500',
      count: 12,
    },
    {
      name: 'MCode Master',
      description: 'Quản lý master codes (Plan, ItemType, etc.)',
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
              <h1 className="text-3xl font-bold text-gray-900">Database Management</h1>
              <p className="mt-1 text-sm text-gray-600">Manage master data tables and records</p>
            </div>
            <Link
              to="/admin"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Database Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{masterTables.reduce((acc, t) => acc + t.count, 0)}</div>
              <div className="text-sm text-gray-600 mt-1">Total Records</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{masterTables.length}</div>
              <div className="text-sm text-gray-600 mt-1">Master Tables</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600 mt-1">Active Tables</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">145</div>
              <div className="text-sm text-gray-600 mt-1">Latest Updates</div>
            </div>
          </div>
        </div>

        {/* Master Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {masterTables.map((table) => (
            <Link
              key={table.path}
              to={table.path}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-6 group relative overflow-hidden"
            >
              {/* Background Icon */}
              <div className="absolute -right-4 -top-4 text-9xl opacity-5 group-hover:opacity-10 transition">
                {table.icon}
              </div>

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

                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition mb-2">
                  {table.name}
                </h3>
                <p className="text-sm text-gray-600">{table.description}</p>

                {/* Action Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-blue-600 font-medium group-hover:underline">
                    Manage →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-left">
              <div className="font-semibold">Export All Data</div>
              <div className="text-sm opacity-90">Download database as CSV</div>
            </button>
            <button className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-left">
              <div className="font-semibold">Import Data</div>
              <div className="text-sm opacity-90">Bulk upload from CSV file</div>
            </button>
            <button className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-left">
              <div className="font-semibold">Backup Database</div>
              <div className="text-sm opacity-90">Create full backup</div>
            </button>
          </div>
        </div>

        {/* Recent Changes */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Database Changes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { table: 'Heavy Fabric Master', action: 'Added', record: 'FAB-2023-145', time: '2 hours ago', user: 'Admin' },
                { table: 'Pattern Master', action: 'Updated', record: 'PTN-JKT-089', time: '5 hours ago', user: 'Admin' },
                { table: 'Button Master', action: 'Added', record: 'BTN-BLK-078', time: '1 day ago', user: 'Admin' },
                { table: 'Supplier Master', action: 'Updated', record: 'SUP-012', time: '2 days ago', user: 'Admin' },
              ].map((change, index) => (
                <div key={index} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    change.action === 'Added' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{change.table}</span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {change.action}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">Record: {change.record}</span>
                      <span className="text-xs text-gray-400">• by {change.user}</span>
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

