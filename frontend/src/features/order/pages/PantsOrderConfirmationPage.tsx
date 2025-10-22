import React from 'react';
import { ConfirmationLayout } from '../../shared/components/ConfirmationLayout';
import { PantsConfirmationSections } from '../../shared/components/PantsConfirmationSections';
import { useOrderConfirmation } from '../../shared/hooks/useOrderConfirmation';
import { saveDraft } from '../../shared/utils/draftUtils';

export default function PantsOrderConfirmationPage(): React.ReactElement {
  const { formData, getDisplayValue, getItemLabel, getPlanLabel, getPeriodLabel, getReceiveLabel } = useOrderConfirmation('pantsOrder.form.v1');

  const handleSaveDraft = () => {
    saveDraft('pantsOrder', formData, 'pants', formData.fabricCode);
  };

  return (
    <ConfirmationLayout
      title="パンツオーダー確認"
      itemType="pants"
      price="¥80,000（税込）"
      storageKey="pantsOrder.form.v1"
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
      <PantsConfirmationSections getDisplayValue={getDisplayValue} />
    </ConfirmationLayout>
  );
}
