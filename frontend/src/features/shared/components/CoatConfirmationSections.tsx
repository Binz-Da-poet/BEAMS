import React from 'react';
import { ConfirmationSection } from './ConfirmationSection';
import { ConfirmationField } from './ConfirmationField';

interface CoatConfirmationSectionsProps {
  getDisplayValue: (key: string, fallback?: string) => string;
}

export const CoatConfirmationSections: React.FC<CoatConfirmationSectionsProps> = ({ getDisplayValue }) => {
  return (
    <>
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
        <ConfirmationField label="釦品番" value={getDisplayValue('button')} />
      </ConfirmationSection>

      {/* Options */}
      <ConfirmationSection title="オプション">
        <ConfirmationField label="オプション" value={getDisplayValue('options')} />
      </ConfirmationSection>
    </>
  );
};
