import React from 'react';
import { useAuth } from '../../auth';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

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

  const getRoleDescription = (role: string) => {
    switch (role) {
      case '店舗':
        return 'Quản lý cửa hàng, xem báo cáo và quản lý đơn hàng';
      case '店員':
        return 'Tạo đơn hàng, quản lý khách hàng và xử lý giao dịch';
      case 'admin':
        return 'Quản lý toàn bộ hệ thống, cấu hình và báo cáo tổng quan';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Chào mừng, {user.name}!</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Thông tin tài khoản</h2>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Tên:</span>
                  <span className="ml-2 text-sm text-gray-900">{user.name}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                  <span className="ml-2 text-sm text-gray-900">{user.email}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Role:</span>
                  <span className="ml-2 text-sm text-gray-900">{getRoleDisplayName(user.role)}</span>
                </div>
                {user.storeName && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Cửa hàng:</span>
                    <span className="ml-2 text-sm text-gray-900">{user.storeName}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Quyền hạn</h2>
              <p className="text-sm text-gray-700">{getRoleDescription(user.role)}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Chức năng chính</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-900 mb-2">Tạo đơn hàng</h3>
                <p className="text-sm text-gray-600">Tạo đơn hàng mới cho khách hàng</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-900 mb-2">Quản lý khách hàng</h3>
                <p className="text-sm text-gray-600">Xem và cập nhật thông tin khách hàng</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-900 mb-2">Báo cáo</h3>
                <p className="text-sm text-gray-600">Xem báo cáo doanh thu và thống kê</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
