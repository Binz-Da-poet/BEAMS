import React, { useCallback, useMemo } from 'react';
import MasterListPage, { MasterColumn } from '../components/MasterListPage';
import { ApiService, Supplier } from '@/services/api';
import { useMasterListData } from '../hooks/useMasterListData';

interface SupplierRecord {
  id: number;
  supplierNo: string;
  supplierName: string;
  manager?: string;
  email?: string;
  email2?: string;
  supplierAddress?: string;
}

const columns: MasterColumn<SupplierRecord>[] = [
  { key: 'supplierNo', label: '仕入先コード', widthClass: 'min-w-[140px]' },
  { key: 'supplierName', label: '仕入先名', widthClass: 'min-w-[180px]' },
  { key: 'manager', label: '担当者' },
  { key: 'email', label: 'メール' },
  { key: 'email2', label: '予備メール' },
  { key: 'supplierAddress', label: '住所', widthClass: 'max-w-[320px]' },
];

const SupplierMasterPage: React.FC = () => {
  const fetchSuppliers = useCallback(() => ApiService.getSuppliers(), []);
  const { data, isLoading, error, reload } = useMasterListData<Supplier>(fetchSuppliers);

  const records = useMemo<SupplierRecord[]>(() => {
    return data.map((supplier) => ({
      id: supplier.id,
      supplierNo: supplier.supplierNo,
      supplierName: supplier.supplierName,
      manager: supplier.manager ?? '―',
      email: supplier.email1 ?? '―',
      email2: supplier.email2 ?? '―',
      supplierAddress: supplier.supplierAddress ?? '―',
    }));
  }, [data]);

  return (
    <MasterListPage<SupplierRecord>
      title="サプライヤーマスタ"
      description="仕入先の連絡先・担当者・取引メモを管理します。"
      columns={columns}
      records={records}
      isLoading={isLoading}
      error={error}
      onRetry={reload}
      searchKeys={['supplierNo', 'supplierName', 'manager', 'email', 'email2', 'supplierAddress']}
      addButtonLabel="仕入先を登録"
      addDisabled
    />
  );
};

export default SupplierMasterPage;

