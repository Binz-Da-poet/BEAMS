import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiService, Plan, ItemType } from '../../../services/api';

export default function MenuPage(): React.ReactElement {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState('');
  const [plan, setPlan] = React.useState('');
  const [items, setItems] = React.useState<ItemType[]>([]);
  const [plans, setPlans] = React.useState<Plan[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Load data from API on component mount
  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [itemTypesData, plansData] = await Promise.all([ApiService.getItemTypes(), ApiService.getPlans()]);

        setItems(itemTypesData);
        setPlans(plansData);
        setError(null);
      } catch (err) {
        setError('データの読み込みに失敗しました');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  function onConfirm(): void {
    if (!item || !plan) return;
    setOpen(false);
    const selectedItem = items.find((i) => i.code === item);
    if (selectedItem) {
      // Map item codes to paths
      const pathMap: { [key: string]: string } = {
        jacket: '/jacket-order',
        pants: '/pants-order',
        vest: '/vest-order',
        coat: '/coat-order',
        suit: '/suit-order',
      };
      const path = pathMap[selectedItem.code];
      if (path) {
        navigate(`${path}?reset=1&item=${encodeURIComponent(item)}&plan=${encodeURIComponent(plan)}`);
      }
    }
  }

  if (loading) {
    return (
      <div className="max-w-[980px] mx-auto mt-10 px-4 flex flex-col items-center gap-6">
        <div className="w-[720px] h-14 bg-slate-200 text-slate-500 rounded-[10px] text-[22px] tracking-wider flex items-center justify-center">データを読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[980px] mx-auto mt-10 px-4 flex flex-col items-center gap-6">
        <div className="w-[720px] h-14 bg-red-100 text-red-600 rounded-[10px] text-[22px] tracking-wider flex items-center justify-center">{error}</div>
        <button onClick={() => window.location.reload()} className="w-[720px] h-14 bg-blue-600 text-white rounded-[10px] text-[22px] tracking-wider flex items-center justify-center hover:brightness-110 active:translate-y-px">
          再読み込み
        </button>
      </div>
    );
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
                        <option key={opt.id} value={opt.code}>
                          {opt.name}
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
                        <option key={opt.id} value={opt.code}>
                          {opt.name}
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
