import React, { useCallback, useMemo } from 'react';
import MasterListPage, { MasterColumn } from '../components/MasterListPage';
import { ApiService, HeavyFabricButtonMaster } from '@/services/api';
import { useMasterListData } from '../hooks/useMasterListData';

interface ButtonRecord {
  id: number;
  productNo: string;
  colorNo?: string;
  pantsProductNo?: string;
  cost?: number;
  retailPrice?: number;
}

const columns: MasterColumn<ButtonRecord>[] = [
  { key: 'productNo', label: 'ボタンコード', widthClass: 'min-w-[140px]' },
  { key: 'colorNo', label: 'カラーNo.' },
  { key: 'pantsProductNo', label: 'パンツ用コード' },
  {
    key: 'cost',
    label: '原価 (円)',
    render: (row) => (row.cost != null ? row.cost.toLocaleString() : '―'),
    widthClass: 'text-right',
  },
  {
    key: 'retailPrice',
    label: '希望小売 (円)',
    render: (row) => (row.retailPrice != null ? row.retailPrice.toLocaleString() : '―'),
    widthClass: 'text-right',
  },
];

const ButtonMasterPage: React.FC = () => {
  const fetchButtons = useCallback(() => ApiService.getHeavyFabricButtons(), []);
  const { data, isLoading, error, reload } = useMasterListData<HeavyFabricButtonMaster>(fetchButtons);

  const records = useMemo<ButtonRecord[]>(() => {
    return data.map((button) => ({
      id: button.id,
      productNo: button.productNo,
      colorNo: button.colorNo ?? '―',
      pantsProductNo: button.pantsProductNo ?? '―',
      cost: button.cost1 ?? undefined,
      retailPrice: button.retailPrice1 ?? undefined,
    }));
  }, [data]);

  return (
    <MasterListPage<ButtonRecord>
      title="ボタンマスタ"
      description="ボタンの種類・素材・カラー・単価を管理します。"
      columns={columns}
      records={records}
      isLoading={isLoading}
      error={error}
      onRetry={reload}
      searchKeys={['productNo', 'colorNo', 'pantsProductNo']}
      addButtonLabel="ボタンを登録"
      addDisabled
    />
  );
};

export default ButtonMasterPage;

