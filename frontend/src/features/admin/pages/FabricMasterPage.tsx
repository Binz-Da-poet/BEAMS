import React, { useCallback, useMemo } from 'react';
import MasterListPage, { MasterColumn } from '../components/MasterListPage';
import { ApiService, HeavyFabricMaster } from '@/services/api';
import { useMasterListData } from '../hooks/useMasterListData';

interface FabricRecord {
  id: number;
  fabricNo: string;
  manufacturer: string;
  color: string;
  fairPrice?: number;
  regularPrice?: number;
  supplier: string;
  stockFlag?: boolean;
  updatedAt: string;
}

const columns: MasterColumn<FabricRecord>[] = [
  { key: 'fabricNo', label: '生地品番', widthClass: 'min-w-[140px]' },
  { key: 'manufacturer', label: 'メーカー' },
  { key: 'color', label: 'カラー' },
  {
    key: 'fairPrice',
    label: 'フェア価格 (円)',
    render: (row) => (row.fairPrice != null ? row.fairPrice.toLocaleString() : '―'),
    widthClass: 'text-right',
  },
  {
    key: 'regularPrice',
    label: '通常価格 (円)',
    render: (row) => (row.regularPrice != null ? row.regularPrice.toLocaleString() : '―'),
    widthClass: 'text-right',
  },
  { key: 'supplier', label: '仕入先' },
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
  { key: 'updatedAt', label: '最終更新日', widthClass: 'min-w-[120px]' },
];

const formatDate = (value?: string): string => {
  if (!value) return '―';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
};

const FabricMasterPage: React.FC = () => {
  const fetchFabrics = useCallback(() => ApiService.getHeavyFabrics(), []);
  const { data, isLoading, error, reload } = useMasterListData<HeavyFabricMaster>(fetchFabrics);

  const records = useMemo<FabricRecord[]>(() => {
    return data.map((fabric) => ({
      id: fabric.id,
      fabricNo: fabric.fabricNo,
      manufacturer: fabric.fabricManufacturer ?? '―',
      color: fabric.color ?? '―',
      fairPrice: fabric.fairFabricPrice,
      regularPrice: fabric.regularFabricPrice,
      supplier: fabric.supplier?.supplierName ?? '―',
      stockFlag: fabric.stockFlag,
      updatedAt: formatDate(fabric.fabricDataUpdate),
    }));
  }, [data]);

  return (
    <MasterListPage<FabricRecord>
      title="重衣料生地マスタ"
      description="フェア価格・通常価格・仕入先など、生地のマスタ情報を管理します。"
      columns={columns}
      records={records}
      isLoading={isLoading}
      error={error}
      onRetry={reload}
      searchKeys={['fabricNo', 'manufacturer', 'color', 'supplier']}
      addButtonLabel="生地を登録"
      addDisabled
    />
  );
};

export default FabricMasterPage;

