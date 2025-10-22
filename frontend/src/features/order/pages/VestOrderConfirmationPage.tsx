import React from 'react';
import { ConfirmationLayout } from '../../shared/components/ConfirmationLayout';
import { VestConfirmationSections } from '../../shared/components/VestConfirmationSections';
import { useOrderConfirmation } from '../../shared/hooks/useOrderConfirmation';
import { saveDraft } from '../../shared/utils/draftUtils';

export default function VestOrderConfirmationPage(): React.ReactElement {
  const { formData, getDisplayValue, getItemLabel, getPlanLabel, getPeriodLabel, getReceiveLabel } = useOrderConfirmation('vestOrder.form.v1');

  const handleSaveDraft = () => {
    saveDraft('vestOrder', formData, 'vest', formData.fabricCode);
  };

  return (
    <ConfirmationLayout
      title="ベストオーダー確認"
      itemType="vest"
      price="¥60,000（税込）"
      storageKey="vestOrder.form.v1"
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
      <VestConfirmationSections getDisplayValue={getDisplayValue} />
    </ConfirmationLayout>
  );
}
