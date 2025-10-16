import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function MenuPage(): React.ReactElement {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState('');
  const [plan, setPlan] = React.useState('');

  const items = [
    { value: 'jacket', label: 'ジャケット' },
    { value: 'pants', label: 'パンツ' },
    { value: 'vest', label: 'ベスト' },
    { value: 'coat', label: 'コート' },
  ];
  const plans = [
    { value: 'basic', label: 'ベーシックオーダー' },
    { value: 'custom', label: 'カスタムオーダー' },
    { value: 'full', label: 'フルオーダー' },
  ];

  function onConfirm(): void {
    if (!item || !plan) return;
    setOpen(false);
    navigate(`/order?reset=1&item=${encodeURIComponent(item)}&plan=${encodeURIComponent(plan)}`);
  }

  return (
    <div className="max-w-[980px] mx-auto mt-10 px-4 flex flex-col items-center gap-6">
      <button onClick={() => setOpen(true)} className="w-[720px] h-14 sm:h-14 md:h-14 lg:h-14 bg-slate-900 text-white rounded-[10px] text-[22px] tracking-wider flex items-center justify-center hover:brightness-110 active:translate-y-px">
        重衣料オーダー登録
      </button>
      <Link to="/drafts" className="w-[720px] h-14 bg-slate-900 text-white rounded-[10px] text-[22px] tracking-wider flex items-center justify-center hover:brightness-110 active:translate-y-px no-underline">
        下書き一覧
      </Link>
      <button className="mt-2 w-[720px] h-14 rounded-[10px] bg-slate-100 text-slate-900 text-[22px]">ログアウト</button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-0 flex items-start justify-center pt-16">
            <div className="w-full max-w-[620px] bg-white rounded-xl shadow-lg border" role="dialog" aria-modal="true">
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h2 className="text-lg font-semibold">重衣料オーダー登録</h2>
                <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-700">
                  ×
                </button>
              </div>
              <div className="p-5 space-y-4">
                <label className="block text-sm">
                  <div className="mb-1">オーダーアイテム</div>
                  <div className="relative">
                    <select value={item} onChange={(e) => setItem(e.target.value)} className="w-full h-11 rounded-lg border px-4 text-sm bg-white">
                      <option value="">選択してください</option>
                      {items.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>

                <label className="block text-sm">
                  <div className="mb-1">プラン</div>
                  <div className="relative">
                    <select value={plan} onChange={(e) => setPlan(e.target.value)} className="w-full h-11 rounded-lg border px-4 text-sm bg-white">
                      <option value="">選択してください</option>
                      {plans.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>
              <div className="px-5 py-4 border-t flex justify-end gap-3">
                <button onClick={() => setOpen(false)} className="h-10 px-4 rounded-md bg-slate-100">
                  キャンセル
                </button>
                <button onClick={onConfirm} disabled={!item || !plan} className="h-10 px-4 rounded-md bg-blue-600 text-white disabled:opacity-50">
                  決定
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
