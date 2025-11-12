import React, { useCallback, useMemo } from 'react';
import MasterListPage, { MasterColumn } from '../components/MasterListPage';
import { ApiService, MCode } from '@/services/api';
import { useMasterListData } from '../hooks/useMasterListData';

interface MCodeRecord {
  id: number;
  category: string;
  code: string;
  label: string;
  order: number;
  description: string;
}

const columns: MasterColumn<MCodeRecord>[] = [
  { key: 'category', label: 'カテゴリ', widthClass: 'min-w-[140px]' },
  { key: 'code', label: 'コード', widthClass: 'min-w-[100px]' },
  { key: 'label', label: '表示名', widthClass: 'min-w-[140px]' },
  { key: 'order', label: '表示順', widthClass: 'text-right' },
  { key: 'description', label: '説明', widthClass: 'max-w-[320px]' },
];

const MCodeMasterPage: React.FC = () => {
  const fetchMCodes = useCallback(() => ApiService.getMCodes(), []);
  const { data, isLoading, error, reload } = useMasterListData<MCode>(fetchMCodes);

  const records = useMemo<MCodeRecord[]>(() => {
    return data
      .slice()
      .sort((a, b) => a.category.localeCompare(b.category) || a.sortOrder - b.sortOrder)
      .map((code) => ({
        id: code.id,
        category: code.category,
        code: code.code,
        label: code.name,
        order: code.sortOrder,
        description: code.description ?? '―',
      }));
  }, [data]);

  return (
    <MasterListPage<MCodeRecord>
      title="コードマスタ (MCode)"
      description="プラン・アイテム種別・ステータス等のコードを管理します。"
      columns={columns}
      records={records}
      isLoading={isLoading}
      error={error}
      onRetry={reload}
      searchKeys={['category', 'code', 'label', 'description']}
      addButtonLabel="コードを登録"
      addDisabled
    />
  );
};

export default MCodeMasterPage;
