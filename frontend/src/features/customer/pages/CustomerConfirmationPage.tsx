import React from 'react';
import { ConfirmationLayout } from '../../shared/components/ConfirmationLayout';
import { useOrderData } from '../../shared/hooks/useOrderData';
import { useOrderConfirmation } from '../../shared/hooks/useOrderConfirmation';
import { saveDraft } from '../../shared/utils/draftUtils';

export default function CustomerConfirmationPage(): React.ReactElement {
  const { orderData, currentItemType, getStorageKey } = useOrderData();
  const { getDisplayValue, getItemLabel, getPlanLabel, getPeriodLabel, getReceiveLabel } = useOrderConfirmation(getStorageKey());

  const getOrderConfirmationPath = () => {
    const confirmationPaths = {
      jacket: '/jacket-order-confirmation',
      coat: '/coat-order-confirmation',
      suit: '/suit-order-confirmation',
      pants: '/pants-order-confirmation',
      vest: '/vest-order-confirmation',
      heavy: '/order-confirmation',
    };
    return confirmationPaths[currentItemType as keyof typeof confirmationPaths] || '/';
  };

  const handleSaveDraft = () => {
    const storageKey = getStorageKey().replace('.form.v1', '');
    saveDraft(storageKey, orderData, currentItemType, orderData.fabricCode);
  };

  return (
    <ConfirmationLayout
      title="お客様情報確認"
      itemType={currentItemType}
      price="¥0（税込）"
      storageKey=""
      backPath={getOrderConfirmationPath()}
      nextPath="/complete"
      formData={orderData}
      getDisplayValue={getDisplayValue}
      getItemLabel={getItemLabel}
      getPlanLabel={getPlanLabel}
      getPeriodLabel={getPeriodLabel}
      getReceiveLabel={getReceiveLabel}
      showDraftButton={true}
      onSaveDraft={handleSaveDraft}
      currentStep={3}
      onlyCustomSections={true}
    >
      {/* Customer Information Sections */}
      <div className="border-t pt-4">
        <div className="grid grid-cols-[200px_1fr] gap-4">
          <div className="font-medium text-slate-700">お名前（フリガナ）</div>
          <div className="text-slate-900">
            {getDisplayValue('lastKana')} {getDisplayValue('firstKana')}
          </div>
        </div>
        <div className="grid grid-cols-[200px_1fr] gap-4 mt-2">
          <div className="font-medium text-slate-700">お名前</div>
          <div className="text-slate-900">
            {getDisplayValue('lastName')} {getDisplayValue('firstName')}
          </div>
        </div>
        <div className="grid grid-cols-[200px_1fr] gap-4 mt-2">
          <div className="font-medium text-slate-700">電話番号</div>
          <div className="text-slate-900">{getDisplayValue('phone')}</div>
        </div>
      </div>
    </ConfirmationLayout>
  );
}
