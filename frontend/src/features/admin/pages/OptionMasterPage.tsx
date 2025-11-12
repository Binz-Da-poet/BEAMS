import React, { useCallback, useMemo } from 'react';
import MasterListPage, { MasterColumn } from '../components/MasterListPage';
import { ApiService, OptionMaster } from '@/services/api';
import { useMasterListData } from '../hooks/useMasterListData';

interface OptionRecord {
  id: number;
  name: string;
  cost?: number;
  retailPrice?: number;
  description: string;
}

const columns: MasterColumn<OptionRecord>[] = [
  { key: 'name', label: 'オプション名称', widthClass: 'min-w-[200px]' },
  {
    key: 'cost',
    label: '原価 (円)',
    render: (row) => (row.cost != null ? row.cost.toLocaleString() : '―'),
    widthClass: 'text-right',
  },
  {
    key: 'retailPrice',
    label: '追加料金 (円)',
    render: (row) => (row.retailPrice != null ? row.retailPrice.toLocaleString() : '―'),
    widthClass: 'text-right',
  },
  { key: 'description', label: '内容', widthClass: 'max-w-[280px]' },
];

const OptionMasterPage: React.FC = () => {
  const fetchOptions = useCallback(() => ApiService.getOptions(), []);
  const { data, isLoading, error, reload } = useMasterListData<OptionMaster>(fetchOptions);

  const records = useMemo<OptionRecord[]>(() => {
    return data.map((option) => ({
      id: option.id,
      name: option.optionName,
      cost: option.cost ?? undefined,
      retailPrice: option.retailPrice ?? undefined,
      description: option.textContent ?? '―',
    }));
  }, [data]);

  return (
    <MasterListPage<OptionRecord>
      title="オプションマスタ"
      description="裏仕様・ステッチ・仕立てオプション等の追加料金を管理します。"
      columns={columns}
      records={records}
      isLoading={isLoading}
      error={error}
      onRetry={reload}
      searchKeys={['name', 'description']}
      addButtonLabel="オプションを登録"
      addDisabled
    />
  );
};

export default OptionMasterPage;

