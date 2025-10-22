import React from 'react';
import { ConfirmationSection } from './ConfirmationSection';
import { ConfirmationField } from './ConfirmationField';

interface PantsConfirmationSectionsProps {
  getDisplayValue: (key: string, fallback?: string) => string;
}

export const PantsConfirmationSections: React.FC<PantsConfirmationSectionsProps> = ({ getDisplayValue }) => {
  return (
    <>
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
