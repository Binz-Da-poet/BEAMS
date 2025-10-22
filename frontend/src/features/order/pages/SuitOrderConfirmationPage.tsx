import React from 'react';
import { ConfirmationLayout } from '../../shared/components/ConfirmationLayout';
import { SuitConfirmationSections } from '../../shared/components/SuitConfirmationSections';
import { useOrderConfirmation } from '../../shared/hooks/useOrderConfirmation';
import { saveDraft } from '../../shared/utils/draftUtils';

export default function SuitOrderConfirmationPage(): React.ReactElement {
  const { formData, getDisplayValue, getItemLabel, getPlanLabel, getPeriodLabel, getReceiveLabel } = useOrderConfirmation('suitOrder.form.v1');

  const handleSaveDraft = () => {
    saveDraft('suitOrder', formData, 'suit', formData.fabricCode);
  };

  return (
    <ConfirmationLayout
      title="スーツオーダー確認"
      itemType="suit"
      price="¥200,000（税込）"
      storageKey="suitOrder.form.v1"
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
      <SuitConfirmationSections getDisplayValue={getDisplayValue} />
    </ConfirmationLayout>
  );
}
