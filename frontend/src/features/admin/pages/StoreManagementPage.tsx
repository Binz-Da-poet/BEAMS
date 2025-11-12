import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService, Store, StoreInput } from '@/services/api';
import { useMasterListData } from '../hooks/useMasterListData';

const StoreManagementPage: React.FC = () => {
  const fetchStores = useCallback(() => ApiService.getStores(), []);
  const { data: stores, isLoading, error, reload } = useMasterListData<Store>(fetchStores);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredStores = useMemo(
    () =>
      stores.filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.code?.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [stores, searchQuery],
  );

  const handleCreate = () => {
    setEditingStore(null);
    setIsModalOpen(true);
  };

  const handleEdit = (store: Store) => {
    setEditingStore(store);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('店舗情報を削除しますか？')) return;
    try {
      setIsSubmitting(true);
      await ApiService.deleteStore(id);
      await reload();
    } catch (err) {
      console.error(err);
      window.alert('店舗の削除に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async (payload: StoreInput) => {
    try {
      setIsSubmitting(true);
      if (editingStore) {
        await ApiService.updateStore(editingStore.id, payload);
      } else {
        await ApiService.createStore(payload);
      }
      await reload();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      window.alert('店舗情報の保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">店舗情報を読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-8 space-y-4 text-center">
          <p className="text-gray-600">店舗情報の取得に失敗しました。</p>
          <button
            onClick={reload}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
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
              <h1 className="text-3xl font-bold text-gray-900">店舗管理</h1>
              <p className="mt-1 text-sm text-gray-600">店舗の所在地・連絡先・担当者を管理します</p>
            </div>
            <Link to="/admin" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              ← ダッシュボードに戻る
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600">店舗数</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">{stores.length} 店</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600">稼働中の店舗</div>
            <div className="text-3xl font-bold text-green-600 mt-1">
              {stores.filter((store) => store.isActive).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600">休止中の店舗</div>
            <div className="text-3xl font-bold text-red-600 mt-1">
              {stores.filter((store) => !store.isActive).length}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <input
              type="text"
              placeholder="店舗名・コードで検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button onClick={handleCreate} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              + 店舗を追加
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">店舗名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">店舗コード</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">店長 / 担当者</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">電話番号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">エリア</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStores.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{store.name}</div>
                    <div className="text-sm text-gray-500">{store.address ?? '―'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{store.code ?? '―'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{store.managerName ?? '―'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{store.phone ?? '―'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{store.region ?? '―'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        store.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {store.isActive ? '稼働中' : '休止中'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(store)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(store.id)}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStores.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">該当する店舗が見つかりません</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <StoreModal store={editingStore} onClose={() => setIsModalOpen(false)} onSave={handleSave} isSubmitting={isSubmitting} />
      )}
    </div>
  );
};

interface StoreModalProps {
  store: Store | null;
  onClose: () => void;
  onSave: (data: StoreInput) => Promise<void>;
  isSubmitting: boolean;
}

const StoreModal: React.FC<StoreModalProps> = ({ store, onClose, onSave, isSubmitting }) => {
  const [formData, setFormData] = useState<StoreInput>({
    name: store?.name ?? '',
    code: store?.code ?? '',
    address: store?.address ?? '',
    phone: store?.phone ?? '',
    email: store?.email ?? '',
    region: store?.region ?? '',
    managerName: store?.managerName ?? '',
    isActive: store?.isActive ?? true,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{store ? '店舗情報を編集' : '店舗を追加'}</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">店舗名 *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">店舗コード</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">エリア</label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">住所</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">店長 / 担当者</label>
              <input
                type="text"
                value={formData.managerName}
                onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">稼働中</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
              disabled={isSubmitting}
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreManagementPage;

