import React from 'react';
import { useNavigate } from 'react-router-dom';

const DRAFTS_KEY = 'heavyOrder.drafts.v1';

type Draft = {
  id: number;
  title: string;
  savedAt: string;
  form: Record<string, string>;
};

export default function DraftsPage(): React.ReactElement {
  const navigate = useNavigate();
  const [drafts, setDrafts] = React.useState<Draft[]>([]);
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

  React.useEffect(() => {
    try {
      setDrafts(JSON.parse(localStorage.getItem(DRAFTS_KEY) || '[]'));
    } catch {
      setDrafts([]);
    }
  }, []);

  function saveDrafts(next: Draft[]): void {
    setDrafts(next);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(next));
  }

  function formatDate(iso: string): string {
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  }

  function labelItem(value?: string): string {
    switch (value) {
      case 'jacket':
        return 'ジャケット';
      case 'pants':
        return 'パンツ';
      case 'vest':
        return 'ベスト';
      case 'coat':
        return 'コート';
      default:
        return '—';
    }
  }

  function labelPlan(value?: string): string {
    switch (value) {
      case 'basic':
        return 'ベーシックオーダー';
      case 'custom':
        return 'カスタムオーダー';
      case 'full':
        return 'フルオーダー';
      default:
        return '—';
    }
  }

  function openDraft(id: number): void {
    const found = drafts.find((d) => d.id === id);
    if (!found) return;
    try {
      localStorage.setItem('heavyOrder.form.v1', JSON.stringify(found.form));
    } catch {}
    const item = found.form?.item;
    const paths: Record<string, string> = {
      jacket: '/jacket-order',
      coat: '/coat-order',
      suit: '/suit-order',
      pants: '/pants-order',
      vest: '/vest-order',
    };
    const path = paths[item] || '/';
    window.location.href = `${path}?reset=1${item ? `&item=${encodeURIComponent(item)}` : ''}${found.form?.plan ? `&plan=${encodeURIComponent(found.form.plan)}` : ''}`;
  }

  function deleteDraft(id: number): void {
    const next = drafts.filter((d) => d.id !== id);
    saveDrafts(next);
  }

  return (
    <div className="max-w-[1000px] mx-auto my-6 px-5">
      <h1 className="text-xl font-semibold">下書き一覧</h1>
      <div className="mt-4">
        {drafts.length === 0 ? (
          <p className="text-slate-500">下書きがありません。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-slate-500 font-semibold">
                  <th className="border-b px-2 py-2 text-left">#</th>
                  <th className="border-b px-2 py-2 text-left">担当者</th>
                  <th className="border-b px-2 py-2 text-left">オーダーアイテム</th>
                  <th className="border-b px-2 py-2 text-left">プラン</th>
                  <th className="border-b px-2 py-2 text-left">保存日時</th>
                  <th className="border-b px-2 py-2 text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                {drafts.map((d, idx) => (
                  <tr key={d.id}>
                    <td className="border-b px-2 py-2">{idx + 1}</td>
                    <td className="border-b px-2 py-2">{d.form?.staffName || '—'}</td>
                    <td className="border-b px-2 py-2">{labelItem(d.form.item)}</td>
                    <td className="border-b px-2 py-2">{labelPlan(d.form.plan)}</td>
                    <td className="border-b px-2 py-2">{formatDate(d.savedAt)}</td>
                    <td className="border-b px-2 py-2">
                      <div className="flex gap-2">
                        <button className="h-9 px-3 rounded-md bg-slate-900 text-white" onClick={() => openDraft(d.id)}>
                          開く
                        </button>
                        <button className="h-9 px-3 rounded-md bg-slate-100" onClick={() => deleteDraft(d.id)}>
                          削除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="flex gap-3 mt-4 flex-wrap">
        <button onClick={() => setOpen(true)} className="h-11 px-5 rounded-[10px] bg-slate-900 text-white inline-flex items-center">
          新規作成
        </button>
        <a href="/" className="h-11 px-5 rounded-[10px] bg-slate-100 inline-flex items-center">
          ホームに戻る
        </a>
      </div>

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
                <button
                  onClick={() => {
                    if (!item || !plan) return;
                    setOpen(false);
                    navigate(`/order?reset=1&item=${encodeURIComponent(item)}&plan=${encodeURIComponent(plan)}`);
                  }}
                  disabled={!item || !plan}
                  className="h-10 px-4 rounded-md bg-blue-600 text-white disabled:opacity-50"
                >
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
