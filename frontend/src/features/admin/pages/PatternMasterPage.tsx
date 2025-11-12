import React, { useCallback, useMemo } from 'react';
import MasterListPage, { MasterColumn } from '../components/MasterListPage';
import { ApiService, PatternMaster } from '@/services/api';
import { useMasterListData } from '../hooks/useMasterListData';

interface PatternRecord {
  id: number;
  patternNo: string;
  itemType: string;
  size: string;
  description: string;
  updatedAt: string;
}

const columns: MasterColumn<PatternRecord>[] = [
  { key: 'patternNo', label: 'パターンコード', widthClass: 'min-w-[140px]' },
  { key: 'itemType', label: 'アイテム種別' },
  { key: 'size', label: '基準サイズ' },
  { key: 'description', label: '備考', widthClass: 'max-w-[320px]' },
  { key: 'updatedAt', label: '最終更新日', widthClass: 'min-w-[120px]' },
];

const formatDate = (value?: string): string => {
  if (!value) return '―';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
};

const PatternMasterPage: React.FC = () => {
  const fetchPatterns = useCallback(() => ApiService.getPatterns(), []);
  const { data, isLoading, error, reload } = useMasterListData<PatternMaster>(fetchPatterns);

  const records = useMemo<PatternRecord[]>(() => {
    return data.map((pattern) => {
      const notes: string[] = [];
      if (pattern.stitchSpec) notes.push(`ステッチ: ${pattern.stitchSpec}`);
      if (pattern.liningSpec) notes.push(`裏仕様: ${pattern.liningSpec}`);
      return {
        id: pattern.id,
        patternNo: pattern.patternNo,
        itemType: pattern.itemTypeCode?.name ?? pattern.itemTypeCode?.code ?? '―',
        size: pattern.size ?? '―',
        description: notes.length > 0 ? notes.join(' / ') : '―',
        updatedAt: formatDate(pattern.updatedAt),
      };
    });
  }, [data]);

  return (
    <MasterListPage<PatternRecord>
      title="パターンマスタ"
      description="アイテムごとの基準サイズや仕様（体型補正）を管理します。"
      columns={columns}
      records={records}
      isLoading={isLoading}
      error={error}
      onRetry={reload}
      searchKeys={['patternNo', 'itemType', 'size', 'description']}
      addButtonLabel="パターンを登録"
      addDisabled
    />
  );
};

export default PatternMasterPage;

