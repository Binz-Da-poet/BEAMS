import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormDataShape } from '../types/order';

// Map item types to their storage keys
const STORAGE_KEY_MAP = {
  jacket: 'jacketOrder.form.v1',
  coat: 'coatOrder.form.v1',
  suit: 'suitOrder.form.v1',
  pants: 'pantsOrder.form.v1',
  vest: 'vestOrder.form.v1',
  heavy: 'heavyOrder.form.v1', // fallback for heavy order
};

export const useOrderData = () => {
  const [params] = useSearchParams();
  const [orderData, setOrderData] = useState<FormDataShape>({});
  const [currentItemType, setCurrentItemType] = useState<string>('');

  useEffect(() => {
    // Get item type from URL params or try to detect from localStorage
    const itemFromParams = params.get('item');
    const itemType = itemFromParams || detectItemTypeFromStorage();

    setCurrentItemType(itemType);

    // Get the appropriate storage key
    const storageKey = STORAGE_KEY_MAP[itemType as keyof typeof STORAGE_KEY_MAP] || STORAGE_KEY_MAP.heavy;

    try {
      const raw = localStorage.getItem(storageKey);
      const saved = raw ? (JSON.parse(raw) as FormDataShape) : {};
      setOrderData(saved);
    } catch {
      setOrderData({});
    }
  }, [params]);

  const detectItemTypeFromStorage = (): string => {
    // Try to detect item type by checking which storage has data
    for (const [itemType, storageKey] of Object.entries(STORAGE_KEY_MAP)) {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const data = JSON.parse(raw);
          if (data.item) {
            return data.item;
          }
        }
      } catch {
        // Continue to next storage key
      }
    }
    return 'heavy'; // fallback
  };

  const getStorageKey = (): string => {
    return STORAGE_KEY_MAP[currentItemType as keyof typeof STORAGE_KEY_MAP] || STORAGE_KEY_MAP.heavy;
  };

  const updateOrderData = (updates: Partial<FormDataShape>) => {
    const newData = { ...orderData, ...updates } as FormDataShape;
    setOrderData(newData);

    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(newData));
    } catch {
      // Handle storage error
    }
  };

  return {
    orderData,
    currentItemType,
    updateOrderData,
    getStorageKey,
  };
};
