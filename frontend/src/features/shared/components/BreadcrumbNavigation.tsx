import React from 'react';

interface BreadcrumbNavigationProps {
  currentStep: number; // 0-4: オーダー入力, お客様情報入力, オーダー確認, お客様情報確認, 完了
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ currentStep }) => {
  const steps = ['オーダー入力', 'お客様情報入力', 'オーダー確認', 'お客様情報確認', '完了'];

  return (
    <nav className="grid grid-cols-5 gap-3 my-2">
      {steps.map((label, i) => (
        <div key={label} className={`relative text-center text-sm pb-2 ${i === currentStep ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
          {label}
          <span className={`absolute left-[10%] right-[10%] bottom-0 h-1 rounded-full ${i === currentStep ? 'bg-slate-900' : 'bg-slate-200'}`} />
        </div>
      ))}
    </nav>
  );
};
