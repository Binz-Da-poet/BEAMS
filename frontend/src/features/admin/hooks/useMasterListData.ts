import { useCallback, useEffect, useState } from 'react';

export interface MasterListState<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export function useMasterListData<T>(fetcher: () => Promise<T[]>): MasterListState<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'データの取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  return {
    data,
    isLoading,
    error,
    reload: loadData,
  };
}

