import React from 'react';
import { Link } from 'react-router-dom';
import { ConfirmationSection } from './ConfirmationSection';
import { ConfirmationField } from './ConfirmationField';
import { ActionButtons } from './ActionButtons';
import { BreadcrumbNavigation } from './BreadcrumbNavigation';
import { OrderConfirmationProps } from '../types/order';

interface ConfirmationLayoutProps extends OrderConfirmationProps {
  formData: Record<string, string>;
  getDisplayValue: (key: string, fallback?: string) => string;
  getItemLabel: (value: string) => string;
  getPlanLabel: (value: string) => string;
  getPeriodLabel: (value: string) => string;
  getReceiveLabel: (value: string) => string;
  children?: React.ReactNode;
  showDraftButton?: boolean;
  onSaveDraft?: () => void;
  currentStep?: number; // 0-4: オーダー入力, お客様情報入力, オーダー確認, お客様情報確認, 完了
  onlyCustomSections?: boolean; // When true, render only children sections
}

export const ConfirmationLayout: React.FC<ConfirmationLayoutProps> = ({
  title,
  itemType,
  price,
  formData,
  getDisplayValue,
  getItemLabel,
  getPlanLabel,
  getPeriodLabel,
  getReceiveLabel,
  backPath,
  nextPath,
  children,
  showDraftButton = false,
  onSaveDraft,
  currentStep = 2,
  onlyCustomSections = false,
}) => {
  return (
    <div className="container-card">
      <BreadcrumbNavigation currentStep={currentStep} />

      <h1 className="text-[22px] font-semibold my-2">{title}</h1>

      <div className="bg-white border rounded-lg p-6 space-y-6">
        {!onlyCustomSections && (
          <>
            {/* Order Item Details */}
            <ConfirmationField label="オーダーアイテム" value={getItemLabel(getDisplayValue('item', itemType))} />
            <ConfirmationField label="プラン" value={getPlanLabel(getDisplayValue('plan', 'basic'))} />
            <ConfirmationField label="ご注文期間" value={getPeriodLabel(getDisplayValue('period', 'regular'))} />
            <ConfirmationField label="生地品番" value={getDisplayValue('fabricCode')} />
            <ConfirmationField label="パターンNo" value={getDisplayValue('patternNo')} />
          </>
        )}

        {/* Custom sections for each item type */}
        {children}

        {!onlyCustomSections && (
          <>
            {/* Notes */}
            <ConfirmationSection title="備考">
              <ConfirmationField label="備考" value={getDisplayValue('note')} multiline />
            </ConfirmationSection>
            {/* Order Details */}
            <ConfirmationSection title="注文詳細">
              <ConfirmationField label="販売価格" value={price} highlight />
              <ConfirmationField label="受付日" value={getDisplayValue('receivedDate')} />
              <ConfirmationField label="店舗到着予定日" value={getDisplayValue('arrivalDate')} />
              <ConfirmationField label="店名" value="ビームス　FPT　福岡" />
              <ConfirmationField label="担当者" value={getDisplayValue('staffName')} />
              <ConfirmationField label="受取方法" value={getReceiveLabel(getDisplayValue('receive', 'store'))} />
            </ConfirmationSection>
          </>
        )}
      </div>

      <ActionButtons backTo={backPath} nextTo={nextPath} showDraftButton={showDraftButton} onSaveDraft={onSaveDraft} />
    </div>
  );
};
