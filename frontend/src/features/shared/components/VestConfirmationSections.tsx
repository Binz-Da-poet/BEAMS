import React from 'react';
import { ConfirmationSection } from './ConfirmationSection';
import { ConfirmationField } from './ConfirmationField';

interface VestConfirmationSectionsProps {
  getDisplayValue: (key: string, fallback?: string) => string;
}

export const VestConfirmationSections: React.FC<VestConfirmationSectionsProps> = ({ getDisplayValue }) => {
  return (
    <>
      {/* Body Lining Details */}
      <ConfirmationSection title="【胴裏】">
        <ConfirmationField label="【胴裏】品番" value={getDisplayValue('bodyLining')} />
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
