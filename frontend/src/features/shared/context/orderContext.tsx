import React from 'react';
import { STORAGE_KEYS } from '../constants';

export type OrderCommonFields = {
  item?: string;
  plan?: string;
  staffName?: string;
  fabricCode?: string;
  note?: string;
  receivedDate?: string;
  arrivalDate?: string;
};

type OrderContextValue = {
  data: Record<string, string>;
  setMany: (patch: Partial<Record<string, string>>) => void;
  reset: () => void;
};

const OrderContext = React.createContext<OrderContextValue | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.active);
      setData(raw ? (JSON.parse(raw) as Record<string, string>) : {});
    } catch {
      setData({});
    }
  }, []);

  const setMany = React.useCallback((patch: Partial<Record<string, string>>) => {
    setData((prev) => {
      const next = { ...prev, ...patch } as Record<string, string>;
      try {
        localStorage.setItem(STORAGE_KEYS.active, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const reset = React.useCallback(() => {
    setData({});
    try {
      localStorage.removeItem(STORAGE_KEYS.active);
    } catch {}
  }, []);

  const value = React.useMemo(() => ({ data, setMany, reset }), [data, setMany, reset]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrderContext = (): OrderContextValue => {
  const ctx = React.useContext(OrderContext);
  if (!ctx) throw new Error('useOrderContext must be used within OrderProvider');
  return ctx;
};
