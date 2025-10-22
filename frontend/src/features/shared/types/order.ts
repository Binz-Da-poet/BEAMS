export type FormDataShape = Record<string, string>;

export interface OrderConfirmationProps {
  title: string;
  itemType: string;
  price: string;
  storageKey: string;
  backPath: string;
  nextPath: string;
}

export interface ConfirmationSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface ConfirmationFieldProps {
  label: string;
  value: string;
}

export interface ConfirmationButtonProps {
  onBack: () => void;
  onNext: () => void;
  backText?: string;
  nextText?: string;
}

export type ItemType = 'jacket' | 'coat' | 'suit' | 'pants' | 'vest';

export type PlanType = 'basic' | 'custom' | 'full';

export type PeriodType = 'regular' | 'fair';

export type ReceiveType = 'store' | 'delivery';
