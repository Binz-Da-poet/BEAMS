import React from 'react';
import { ConfirmationFieldProps } from '../types/order';

interface ExtendedConfirmationFieldProps extends ConfirmationFieldProps {
  multiline?: boolean;
  highlight?: boolean;
}

export const ConfirmationField: React.FC<ExtendedConfirmationFieldProps> = ({ label, value, multiline = false, highlight = false }) => {
  const valueClasses = highlight ? 'text-slate-900 font-semibold' : 'text-slate-900';

  const displayValue = multiline ? <div className={`${valueClasses} whitespace-pre-wrap`}>{value}</div> : <div className={valueClasses}>{value}</div>;

  return (
    <div className="grid grid-cols-[200px_1fr] gap-4">
      <div className="font-medium text-slate-700">{label}</div>
      {displayValue}
    </div>
  );
};
