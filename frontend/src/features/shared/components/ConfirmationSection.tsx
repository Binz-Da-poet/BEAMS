import React from 'react';
import { ConfirmationSectionProps } from '../../types/order';

export const ConfirmationSection: React.FC<ConfirmationSectionProps> = ({ title, children }) => {
  return (
    <div className="border-t pt-4">
      <h3 className="font-semibold text-slate-800 mb-4">{title}</h3>
      {children}
    </div>
  );
};
