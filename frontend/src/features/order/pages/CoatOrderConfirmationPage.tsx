import React from 'react';
import { ConfirmationLayout } from '../../shared/components/ConfirmationLayout';
import { CoatConfirmationSections } from '../../shared/components/CoatConfirmationSections';
import { useOrderConfirmation } from '../../shared/hooks/useOrderConfirmation';
import { saveDraft } from '../../shared/utils/draftUtils';

export default function CoatOrderConfirmationPage(): React.ReactElement {
  const { formData, getDisplayValue, getItemLabel, getPlanLabel, getPeriodLabel, getReceiveLabel } = useOrderConfirmation('coatOrder.form.v1');

  const handleSaveDraft = () => {
    saveDraft('coatOrder', formData, 'coat', formData.fabricCode);
  };

  return (
    <ConfirmationLayout
      title="コートオーダー確認"
      itemType="coat"
      price="¥150,000（税込）"
      storageKey="coatOrder.form.v1"
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
      <CoatConfirmationSections getDisplayValue={getDisplayValue} />
    </ConfirmationLayout>
  );
}
