import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ActionButtonsProps {
  backTo?: string;
  nextTo?: string;
  onBack?: () => void;
  onNext?: () => void;
  showDraftButton?: boolean;
  onSaveDraft?: () => void;
  backText?: string;
  nextText?: string;
  draftText?: string;
  disabledNext?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ backTo, nextTo, onBack, onNext, showDraftButton = false, onSaveDraft, backText = '戻る', nextText = '次へ', draftText = '下書き', disabledNext = false }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) return onBack();
    if (backTo) navigate(backTo);
  };

  const handleNext = () => {
    if (onNext) return onNext();
    if (nextTo) navigate(nextTo);
  };

  return (
    <div className="flex gap-4 justify-center mt-8">
      <button onClick={handleBack} className="btn btn--light w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-100 text-slate-900">
        {backText}
      </button>
      {showDraftButton && onSaveDraft && (
        <button onClick={onSaveDraft} className="btn w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-200 text-slate-700">
          {draftText}
        </button>
      )}
      <button disabled={disabledNext} onClick={handleNext} className="btn btn--dark w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-900 text-white disabled:opacity-50">
        {nextText}
      </button>
    </div>
  );
};
