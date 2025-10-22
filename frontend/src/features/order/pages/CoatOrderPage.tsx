import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { saveDraft as saveDraftUtil } from '../../shared/utils/draftUtils';
import { BreadcrumbNavigation } from '../../shared/components/BreadcrumbNavigation';

type FormDataShape = Record<string, string>;

const STORAGE_KEY = 'coatOrder.form.v1';
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

export default function CoatOrderPage(): React.ReactElement {
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
      let globalForm: FormDataShape = {};
      try {
        const graw = localStorage.getItem('heavyOrder.form.v1');
        globalForm = graw ? (JSON.parse(graw) as FormDataShape) : {};
      } catch {}

      const qItem = params.get('item');
      const qPlan = params.get('plan');
      if (qItem || qPlan) {
        const next = Object.assign({}, globalForm, saved || {}, qItem ? { item: qItem } : {}, qPlan ? { plan: qPlan } : {});
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        restoreForm(form, next);
      } else {
        const next = Object.assign({}, globalForm, saved || {});
        restoreForm(form, next);
      }
    } catch {}

    const onChange = () => {
      if (!formRef.current) return;
      try {
        const data = serializeForm(formRef.current);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      saveDraftUtil('coatOrder', data, 'coat', data.fabricCode);
    } catch {}
  }, []);

  return (
    <div className="container-card">
      <BreadcrumbNavigation currentStep={0} />

      <h1 className="text-[22px] font-semibold my-2">コートオーダー入力</h1>

      <form ref={formRef} id="coatOrderForm" className="grid grid-cols-[220px_1fr] gap-x-5 gap-y-4">
        <input type="hidden" name="item" defaultValue={params.get('item') || ''} />
        <input type="hidden" name="plan" defaultValue={params.get('plan') || ''} />
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
              <option value="FAB001">FAB001 - サンプル生地1</option>
              <option value="FAB002">FAB002 - サンプル生地2</option>
              <option value="FAB003">FAB003 - サンプル生地3</option>
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
              <option value="COAT001">COAT001 - コートパターン1</option>
              <option value="COAT002">COAT002 - コートパターン2</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">[胴裏]品番</label>
          <div>
            <select className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50 focus:outline-none focus:border-slate-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,41,55,0.08)]" id="bodyLining" name="bodyLining" defaultValue="">
              <option value="" disabled>
                ------------検索してください------------
              </option>
              <option value="BL001">BL001 - 胴裏1</option>
              <option value="BL002">BL002 - 胴裏2</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">[袖裏]品番</label>
          <div>
            <select className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50 focus:outline-none focus:border-slate-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,41,55,0.08)]" id="sleeveLining" name="sleeveLining" defaultValue="">
              <option value="" disabled>
                ------------検索してください------------
              </option>
              <option value="SL001">SL001 - 袖裏1</option>
              <option value="SL002">SL002 - 袖裏2</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">釦品番</label>
          <div>
            <select className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50 focus:outline-none focus:border-slate-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,41,55,0.08)]" id="button" name="button" defaultValue="">
              <option value="" disabled>
                ------------検索してください------------
              </option>
              <option value="BF-31">BF-31 - 釦1</option>
              <option value="HORN">HORN - 釦2</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">オプション</label>
          <div>
            <select className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50 focus:outline-none focus:border-slate-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,41,55,0.08)]" id="options" name="options" defaultValue="">
              <option value="" disabled>
                ------------選択してください------------
              </option>
              <option value="OPT001">カスタムフィッティング</option>
              <option value="OPT002">特別仕様</option>
              <option value="OPT003">急ぎ仕上げ</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">備考</label>
          <textarea className="w-full min-h-[140px] rounded-lg border px-4 py-3 text-sm bg-gray-50 resize-y focus:outline-none focus:border-slate-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,41,55,0.08)]" id="note" name="note" rows={5} />
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">販売価格</label>
          <div className="w-full rounded-lg border px-4 py-3 bg-gray-50">¥150,000（税込）</div>
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
