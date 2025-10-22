import React from 'react';
import { ConfirmationSection } from './ConfirmationSection';
import { ConfirmationField } from './ConfirmationField';

interface SuitConfirmationSectionsProps {
  getDisplayValue: (key: string, fallback?: string) => string;
}

export const SuitConfirmationSections: React.FC<SuitConfirmationSectionsProps> = ({ getDisplayValue }) => {
  return (
    <>
      {/* Pattern Details */}
      <ConfirmationSection title="パターン">
        <ConfirmationField label="ジャケットパターンNo" value={getDisplayValue('jacketPatternNo')} />
        <ConfirmationField label="パンツパターンNo" value={getDisplayValue('pantsPatternNo')} />
      </ConfirmationSection>

      {/* Body Lining Details */}
      <ConfirmationSection title="【胴裏】">
        <ConfirmationField label="【胴裏】品番" value={getDisplayValue('bodyLining')} />
      </ConfirmationSection>

      {/* Sleeve Lining Details */}
      <ConfirmationSection title="【袖裏】">
        <ConfirmationField label="【袖裏】品番" value={getDisplayValue('sleeveLining')} />
      </ConfirmationSection>

      {/* Button Details */}
      <ConfirmationSection title="釦">
        <ConfirmationField label="ジャケット釦品番" value={getDisplayValue('jacketButton')} />
        <ConfirmationField label="パンツ釦品番" value={getDisplayValue('pantsButton')} />
      </ConfirmationSection>

      {/* Options */}
      <ConfirmationSection title="オプション">
        <ConfirmationField label="オプション" value={getDisplayValue('options')} />
      </ConfirmationSection>
    </>
  );
};
