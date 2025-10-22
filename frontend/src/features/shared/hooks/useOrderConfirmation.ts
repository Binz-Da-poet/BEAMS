import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormDataShape, ItemType, PlanType, PeriodType, ReceiveType } from '../types/order';

export const useOrderConfirmation = (storageKey: string) => {
  const [params] = useSearchParams();
  const [formData, setFormData] = useState<FormDataShape>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const saved = raw ? (JSON.parse(raw) as FormDataShape) : {};
      setFormData(saved);
    } catch {
      setFormData({});
    }
  }, [storageKey]);

  const getDisplayValue = (key: string, fallback: string = '—') => {
    return formData[key] || fallback;
  };

  const getItemLabel = (value: string): string => {
    switch (value) {
      case 'jacket':
        return 'ジャケット';
      case 'coat':
        return 'コート';
      case 'suit':
        return 'スーツ';
      case 'pants':
        return 'パンツ';
      case 'vest':
        return 'ベスト';
      default:
        return value;
    }
  };

  const getPlanLabel = (value: string): string => {
    switch (value) {
      case 'basic':
        return 'ベーシックオーダー';
      case 'custom':
        return 'カスタムオーダー';
      case 'full':
        return 'フルオーダー';
      default:
        return value;
    }
  };

  const getPeriodLabel = (value: string): string => {
    switch (value) {
      case 'regular':
        return 'レギュラー期間';
      case 'fair':
        return 'フェア期間';
      default:
        return value;
    }
  };

  const getReceiveLabel = (value: string): string => {
    switch (value) {
      case 'store':
        return 'ご来店';
      case 'delivery':
        return '配送';
      default:
        return value;
    }
  };

  return {
    formData,
    getDisplayValue,
    getItemLabel,
    getPlanLabel,
    getPeriodLabel,
    getReceiveLabel,
  };
};
