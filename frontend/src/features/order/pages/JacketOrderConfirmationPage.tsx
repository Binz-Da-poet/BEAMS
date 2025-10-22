import React from 'react';
import { ConfirmationLayout } from '../../shared/components/ConfirmationLayout';
import { JacketConfirmationSections } from '../../shared/components/JacketConfirmationSections';
import { useOrderConfirmation } from '../../shared/hooks/useOrderConfirmation';
import { saveDraft } from '../../shared/utils/draftUtils';

export default function JacketOrderConfirmationPage(): React.ReactElement {
  const { formData, getDisplayValue, getItemLabel, getPlanLabel, getPeriodLabel, getReceiveLabel } = useOrderConfirmation('jacketOrder.form.v1');

  const handleSaveDraft = () => {
    saveDraft('jacketOrder', formData, 'jacket', formData.fabricCode);
  };

  return (
    <ConfirmationLayout
      title="ジャケットオーダー確認"
      itemType="jacket"
      price="¥120,000（税込）"
      storageKey="jacketOrder.form.v1"
      backPath="/customer"
      nextPath="/customer-info-confirmation"
      formData={formData}
      getDisplayValue={getDisplayValue}
      getItemLabel={getItemLabel}
      getPlanLabel={getPlanLabel}
      getPeriodLabel={getPeriodLabel}
      getReceiveLabel={getReceiveLabel}
      showDraftButton={true}
      onSaveDraft={handleSaveDraft}
      currentStep={2}
    >
      <JacketConfirmationSections getDisplayValue={getDisplayValue} />
    </ConfirmationLayout>
  );
}
