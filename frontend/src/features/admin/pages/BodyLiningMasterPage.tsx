import React, { useCallback, useMemo } from 'react';
import MasterListPage, { MasterColumn } from '../components/MasterListPage';
import { ApiService, BodyLiningMaster } from '@/services/api';
import { useMasterListData } from '../hooks/useMasterListData';

interface LiningRecord {
  id: number;
  productNo: string;
  colorNo?: string;
  orientation?: string;
  stockFlag?: boolean;
}

const columns: MasterColumn<LiningRecord>[] = [
  { key: 'productNo', label: '裏地コード', widthClass: 'min-w-[140px]' },
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

const BodyLiningMasterPage: React.FC = () => {
  const fetchLinings = useCallback(() => ApiService.getBodyLinings(), []);
  const { data, isLoading, error, reload } = useMasterListData<BodyLiningMaster>(fetchLinings);

  const records = useMemo<LiningRecord[]>(() => {
    return data.map((lining) => ({
      id: lining.id,
      productNo: lining.productNo,
      colorNo: lining.colorNo ?? '―',
      orientation: lining.orientation ?? '―',
      stockFlag: lining.stockFlag ?? undefined,
    }));
  }, [data]);

  return (
    <MasterListPage<LiningRecord>
      title="胴裏マスタ"
      description="胴裏の素材・カラー・仕入先などの情報を管理します。"
      columns={columns}
      records={records}
      isLoading={isLoading}
      error={error}
      onRetry={reload}
      searchKeys={['productNo', 'colorNo', 'orientation']}
      addButtonLabel="胴裏を登録"
      addDisabled
    />
  );
};

export default BodyLiningMasterPage;

