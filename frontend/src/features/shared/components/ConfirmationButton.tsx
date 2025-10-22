import React from 'react';
import { Link } from 'react-router-dom';
import { ConfirmationButtonProps } from '../types/order';

interface ExtendedConfirmationButtonProps extends ConfirmationButtonProps {
  showDraftButton?: boolean;
  onSaveDraft?: () => void;
}

export const ConfirmationButton: React.FC<ExtendedConfirmationButtonProps> = ({ onBack, onNext, backText = '戻る', nextText = '次へ', showDraftButton = false, onSaveDraft }) => {
  return (
    <div className="flex gap-4 justify-center mt-8">
      <button onClick={onBack} className="btn btn--light w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-100 text-slate-900">
        {backText}
      </button>
      {showDraftButton && onSaveDraft && (
        <button onClick={onSaveDraft} className="btn btn--secondary w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-200 text-slate-700">
          下書き
        </button>
      )}
      <button onClick={onNext} className="btn btn--dark w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-900 text-white">
        {nextText}
      </button>
    </div>
  );
};
