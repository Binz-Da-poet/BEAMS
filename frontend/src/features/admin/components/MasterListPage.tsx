import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export interface MasterColumn<T> {
  key: keyof T;
  label: string;
  widthClass?: string;
  render?: (row: T) => React.ReactNode;
}

export interface MasterListPageProps<T extends { id: number }> {
  title: string;
  description: string;
  breadcrumbs?: Array<{ label: string; path: string }>;
  columns: MasterColumn<T>[];
  records: T[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  addButtonLabel?: string;
  onAddClick?: () => void;
  addDisabled?: boolean;
}

export function MasterListPage<T extends { id: number }>({
  title,
  description,
  breadcrumbs = [
    { label: '管理者ダッシュボード', path: '/admin' },
    { label: 'マスタ管理', path: '/admin/database' },
  ],
  columns,
  records,
  isLoading = false,
  error = null,
  onRetry,
  searchKeys,
  searchPlaceholder = 'キーワードで検索',
  addButtonLabel = '新規登録',
  onAddClick,
  addDisabled = false,
}: MasterListPageProps<T>): React.ReactElement {
  const [search, setSearch] = useState('');

  const effectiveKeys = useMemo<(keyof T)[]>(() => {
    if (searchKeys && searchKeys.length > 0) return searchKeys;
    return columns.map((col) => col.key) as (keyof T)[];
  }, [columns, searchKeys]);

  const filtered = useMemo(() => {
    if (!search.trim()) return records;
    const keyword = search.toLowerCase();

    return records.filter((record) =>
      effectiveKeys.some((key) => {
        const value = record[key];
        if (value == null) return false;
        return String(value).toLowerCase().includes(keyword);
      }),
    );
  }, [records, search, effectiveKeys]);

  const canAdd = !!onAddClick && !addDisabled;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="text-xs text-gray-500 mb-2 space-x-1">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.path}>
                <Link to={crumb.path} className="hover:text-indigo-600">
                  {crumb.label}
                </Link>
                {index !== breadcrumbs.length - 1 && <span> / </span>}
              </React.Fragment>
            ))}
          </nav>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            </div>
            <Link
              to="/admin/database"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              ← マスタ一覧へ戻る
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-500">登録件数</p>
            <p className="text-2xl font-bold text-gray-900">{records.length.toLocaleString()} 件</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
              disabled={isLoading}
            />
            <button
              type="button"
              disabled={!canAdd || isLoading}
              onClick={canAdd ? onAddClick : undefined}
              className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              + {addButtonLabel}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          {isLoading ? (
            <div className="py-16 text-center text-gray-500 flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
              <p>データを読み込み中です…</p>
            </div>
          ) : error ? (
            <div className="py-16 px-6 text-center">
              <div className="max-w-md mx-auto bg-red-50 border border-red-200 text-red-800 rounded-lg p-6">
                <p className="font-medium mb-3">データの取得に失敗しました</p>
                <p className="text-sm mb-4">{error}</p>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    再試行
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {columns.map((column) => (
                        <th
                          key={String(column.key)}
                          className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${column.widthClass || ''}`}
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filtered.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50 transition">
                        {columns.map((column) => (
                          <td key={String(column.key)} className="px-4 py-3 text-sm text-gray-900 align-top">
                            {column.render ? column.render(row) : (row[column.key] as React.ReactNode) ?? '―'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filtered.length === 0 && (
                <div className="py-16 text-center text-gray-500 text-sm">該当するデータがありません</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MasterListPage;

