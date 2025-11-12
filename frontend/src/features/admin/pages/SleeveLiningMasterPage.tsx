import React, { useCallback, useMemo } from 'react';
import MasterListPage, { MasterColumn } from '../components/MasterListPage';
import { ApiService, SleeveLiningMaster } from '@/services/api';
import { useMasterListData } from '../hooks/useMasterListData';

interface SleeveLiningRecord {
  id: number;
  productNo: string;
  colorNo?: string;
  orientation?: string;
  stockFlag?: boolean;
}

const columns: MasterColumn<SleeveLiningRecord>[] = [
  { key: 'productNo', label: '袖裏コード', widthClass: 'min-w-[140px]' },
  { key: 'colorNo', label: 'カラーNo.' },
  { key: 'orientation', label: '向き区分' },
  {
    key: 'stockFlag',
    label: '在庫状況',
    render: (row) => (
      <span
        className={`px-2 py-0.5 text-xs rounded-full ${
          row.stockFlag ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-700'
        }`}
      >
        {row.stockFlag ? '在庫あり' : '確認必要'}
      </span>
    ),
  },
];

const SleeveLiningMasterPage: React.FC = () => {
  const fetchSleeveLinings = useCallback(() => ApiService.getSleeveLinings(), []);
  const { data, isLoading, error, reload } = useMasterListData<SleeveLiningMaster>(fetchSleeveLinings);

  const records = useMemo<SleeveLiningRecord[]>(() => {
    return data.map((lining) => ({
      id: lining.id,
      productNo: lining.productNo,
      colorNo: lining.colorNo ?? '―',
      orientation: lining.orientation ?? '―',
      stockFlag: lining.stockFlag ?? undefined,
    }));
  }, [data]);

  return (
    <MasterListPage<SleeveLiningRecord>
      title="袖裏マスタ"
      description="袖裏の素材・カラー・仕入先などの情報を管理します。"
      columns={columns}
      records={records}
      isLoading={isLoading}
      error={error}
      onRetry={reload}
      searchKeys={['productNo', 'colorNo', 'orientation']}
      addButtonLabel="袖裏を登録"
      addDisabled
    />
  );
};

export default SleeveLiningMasterPage;

