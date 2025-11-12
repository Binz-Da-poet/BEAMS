import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService, StaffInput, StaffMember, Store } from '@/services/api';
import { useMasterListData } from '../hooks/useMasterListData';

const StaffManagementPage: React.FC = () => {
  const fetchStaff = useCallback(() => ApiService.getStaff(), []);
  const { data: staff, isLoading, error, reload } = useMasterListData<StaffMember>(fetchStaff);

  const fetchStores = useCallback(() => ApiService.getStores(), []);
  const { data: stores } = useMasterListData<Store>(fetchStores);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredStaff = useMemo(() => staff.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()) || member.email?.toLowerCase().includes(searchQuery.toLowerCase())), [staff, searchQuery]);

  const handleCreate = () => {
    setEditingStaff(null);
    setIsModalOpen(true);
  };

  const handleEdit = (staffMember: StaffMember) => {
    setEditingStaff(staffMember);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('スタッフ情報を削除しますか？')) return;
    try {
      setIsSubmitting(true);
      await ApiService.deleteStaff(id);
      await reload();
    } catch (err) {
      console.error(err);
      window.alert('スタッフの削除に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async (payload: StaffInput | (Partial<StaffInput> & { storeId: number })) => {
    try {
      setIsSubmitting(true);
      if (editingStaff) {
        await ApiService.updateStaff(editingStaff.id, payload);
      } else {
        await ApiService.createStaff(payload as StaffInput);
      }
      await reload();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      window.alert('スタッフ情報の保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">スタッフ情報を読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-8 space-y-4 text-center">
          <p className="text-gray-600">スタッフ情報の取得に失敗しました。</p>
          <button onClick={reload} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            再試行
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">スタッフ管理</h1>
              <p className="mt-1 text-sm text-gray-600">スタッフの基本情報・権限を管理します</p>
            </div>
            <Link to="/admin" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              ← ダッシュボードに戻る
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <input type="text" placeholder="スタッフ名・メールを検索" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <button onClick={handleCreate} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              + スタッフを追加
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">氏名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メール</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">電話番号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">役割</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">所属店舗</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.map((staffMember) => (
                <tr key={staffMember.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{staffMember.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{staffMember.email ?? '―'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{staffMember.phone ?? '―'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{staffMember.role ?? 'スタッフ'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{staffMember.store?.name ?? '―'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(staffMember)} className="text-indigo-600 hover:text-indigo-900 mr-4 disabled:opacity-50" disabled={isSubmitting}>
                      編集
                    </button>
                    <button onClick={() => handleDelete(staffMember.id)} className="text-red-600 hover:text-red-900 disabled:opacity-50" disabled={isSubmitting}>
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">該当するスタッフが見つかりません</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && <StaffModal staff={editingStaff} stores={stores} onClose={() => setIsModalOpen(false)} onSave={handleSave} isSubmitting={isSubmitting} />}
    </div>
  );
};

interface StaffModalProps {
  staff: StaffMember | null;
  stores: Store[];
  onClose: () => void;
  onSave: (data: StaffInput | (Partial<StaffInput> & { storeId: number })) => Promise<void>;
  isSubmitting: boolean;
}

const StaffModal: React.FC<StaffModalProps> = ({ staff, stores, onClose, onSave, isSubmitting }) => {
  const defaultStoreId = staff?.storeId ?? stores[0]?.id ?? 0;
  const [formData, setFormData] = useState<StaffInput>({
    name: staff?.name ?? '',
    email: staff?.email ?? '',
    phone: staff?.phone ?? '',
    role: staff?.role ?? '',
    storeId: defaultStoreId,
  });

  useEffect(() => {
    if (!formData.storeId && stores.length > 0) {
      setFormData((prev) => ({ ...prev, storeId: stores[0].id }));
    }
  }, [stores, formData.storeId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.storeId) {
      window.alert('所属店舗を選択してください');
      return;
    }
    await onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{staff ? 'スタッフ情報を編集' : 'スタッフを追加'}</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">氏名 *</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
            <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">役割 / 職種</label>
            <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">所属店舗 *</label>
            <select value={formData.storeId} onChange={(e) => setFormData({ ...formData, storeId: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
              <option value={0} disabled>
                店舗を選択してください
              </option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              キャンセル
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60" disabled={isSubmitting}>
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffManagementPage;
