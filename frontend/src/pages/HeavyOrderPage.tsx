import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

type FormDataShape = Record<string, string>;

const STORAGE_KEY = 'heavyOrder.form.v1';
const DRAFTS_KEY = 'heavyOrder.drafts.v1';

function serializeForm(form: HTMLFormElement): FormDataShape {
  const fd = new FormData(form);
  const data: FormDataShape = {};
  for (const [key, value] of fd.entries()) data[key] = String(value);
  return data;
}

function restoreForm(form: HTMLFormElement, data: FormDataShape | null): void {
  if (!data) return;
  for (const [key, value] of Object.entries(data)) {
    const elements = form.querySelectorAll(`[name="${CSS.escape(key)}"]`) as NodeListOf<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    elements.forEach((el) => {
      const type = (el as HTMLInputElement).type?.toLowerCase?.() ?? '';
      if (type === 'radio' || type === 'checkbox') {
        (el as HTMLInputElement).checked = (el as HTMLInputElement).value === String(value);
      } else {
        el.value = String(value);
      }
    });
  }
}

export default function HeavyOrderPage(): React.ReactElement {
  const formRef = React.useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  React.useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    if (params.has('reset')) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      form.reset();
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved = raw ? (JSON.parse(raw) as FormDataShape) : null;

      // Merge query params (item/plan) into saved state so they are kept with drafts
      const qItem = params.get('item');
      const qPlan = params.get('plan');
      if (qItem || qPlan) {
        const next = Object.assign({}, saved || {}, qItem ? { item: qItem } : {}, qPlan ? { plan: qPlan } : {});
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        restoreForm(form, next);
      } else {
        restoreForm(form, saved);
      }
    } catch {}

    const onChange = () => {
      if (!formRef.current) return;
      try {
        const data = serializeForm(formRef.current);
        // Preserve non-form values (item/plan) from existing storage
        const base = (() => {
          try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
          } catch {
            return {} as Record<string, string>;
          }
        })();
        const merged = Object.assign({}, base, data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {}
    };

    form.addEventListener('change', onChange, true);
    form.addEventListener('input', onChange, true);
    return () => {
      form.removeEventListener('change', onChange, true);
      form.removeEventListener('input', onChange, true);
    };
  }, [params]);

  const saveDraft = React.useCallback(() => {
    const form = formRef.current;
    if (!form) return;
    try {
      const data = serializeForm(form);
      // Attach non-form params item/plan from query or storage
      const qItem = params.get('item');
      const qPlan = params.get('plan');
      let finalData: FormDataShape = { ...data };
      try {
        const base = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
        finalData = Object.assign({}, base, data, qItem ? { item: qItem } : {}, qPlan ? { plan: qPlan } : {});
      } catch {}
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalData));
      const now = new Date();
      const entry = {
        id: now.getTime(),
        title: finalData.staffName || finalData.fabricCode || finalData.patternNo || 'Draft',
        savedAt: now.toISOString(),
        form: finalData,
      };
      const arr = JSON.parse(localStorage.getItem(DRAFTS_KEY) || '[]');
      arr.unshift(entry);
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(arr));
      navigate('/');
    } catch {}
  }, [navigate, params]);

  return (
    <div className="container-card">
      <nav className="grid grid-cols-5 gap-3 my-2">
        {['オーダー入力', 'お客様情報入力', 'オーダー確認', 'お客様情報確認', '完了'].map((label, i) => (
          <div key={label} className={`relative text-center text-sm pb-2 ${i === 0 ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
            {label}
            <span className={`absolute left-[10%] right-[10%] bottom-0 h-1 rounded-full ${i === 0 ? 'bg-slate-900' : 'bg-slate-200'}`} />
          </div>
        ))}
      </nav>

      <h1 className="text-[22px] font-semibold my-2">ジャケットオーダー入力</h1>

      <form ref={formRef} id="heavyOrderForm" className="grid grid-cols-[220px_1fr] gap-x-5 gap-y-4">
        <fieldset className="contents">
          <label className="self-center">
            ご注文期間 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-5 items-center">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="period" value="regular" defaultChecked /> レギュラー期間
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="period" value="fair" /> フェア期間
            </label>
          </div>
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">
            生地品番 <span className="text-red-500">*</span>
          </label>
          <div>
            <select className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50 focus:outline-none focus:border-slate-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,41,55,0.08)]" id="fabricCode" name="fabricCode" defaultValue="">
              <option value="" disabled>
                ------------選択してください------------
              </option>
              {['AG55111', 'AG55112', 'AG55113', 'AG55114', 'AG55115', 'AG55116'].map((v) => (
                <option key={v} value={v}>{`${v} - ANGELICO`}</option>
              ))}
            </select>
            <div className="col-span-1 text-slate-500 text-xs mt-1">※ 生地品番や生地メーカー名を入力して検索できます</div>
          </div>
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">
            パターンNo <span className="text-red-500">*</span>
          </label>
          <div>
            <select className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50 focus:outline-none focus:border-slate-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,41,55,0.08)]" id="patternNo" name="patternNo" defaultValue="">
              <option value="" disabled>
                ------------検索してください------------
              </option>
              {['BFB-23303-C', 'BFB-23303-F', 'BFB-23303-P', 'BFB-23305-3P', 'BFB-23305-C', 'BFB-23305-F', 'BFB-23305-P'].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">[胴裏]品番</label>
          <div>
            <select className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50 focus:outline-none focus:border-slate-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,41,55,0.08)]" id="liningProduct" name="liningProduct" defaultValue="">
              <option value="" disabled>
                ------------検索してください------------
              </option>
              <option value="AK1800">AK1800</option>
              <option value="AK1802">AK1802</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">備考</label>
          <textarea className="w-full min-h-[140px] rounded-lg border px-4 py-3 text-sm bg-gray-50 resize-y focus:outline-none focus:border-slate-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,41,55,0.08)]" id="note" name="note" rows={5} />
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">販売価格</label>
          <div className="w-full rounded-lg border px-4 py-3 bg-gray-50">¥120,000（税込）</div>
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">
            受付日 <span className="text-red-500">*</span>
          </label>
          <input className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50 focus:outline-none focus:border-slate-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,41,55,0.08)]" id="receivedDate" name="receivedDate" type="date" />
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">
            店舗到着予定日 <span className="text-red-500">*</span>
          </label>
          <input className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50 focus:outline-none focus:border-slate-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,41,55,0.08)]" id="arrivalDate" name="arrivalDate" type="date" />
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">店名</label>
          <div className="w-full rounded-lg border px-4 py-3 bg-gray-50">ビームス　FPT　福岡</div>
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">
            担当者 <span className="text-red-500">*</span>
          </label>
          <input className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50 focus:outline-none focus:border-slate-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,41,55,0.08)]" id="staffName" name="staffName" />
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">
            受取方法 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-5 items-center">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="receive" value="store" defaultChecked /> ご来店
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="receive" value="delivery" /> 配送
            </label>
          </div>
        </fieldset>

        <div className="col-start-2 flex gap-4 justify-center mt-6">
          <Link to="/" className="btn btn--light w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-100 text-slate-900 no-underline">
            ホームに戻る
          </Link>
          <button type="button" onClick={saveDraft} className="btn btn--light w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-100 text-slate-900">
            下書き
          </button>
          <Link to="/customer" className="btn btn--dark w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-900 text-white no-underline">
            次へ
          </Link>
        </div>
      </form>
    </div>
  );
}
