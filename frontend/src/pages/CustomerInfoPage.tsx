import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function hiraToKata(s: string): string {
  return s.replace(/[\u3041-\u3096\u309D-\u309E]/g, (ch) => {
    const code = ch.charCodeAt(0);
    if (code === 0x309d) return String.fromCharCode(0x30fd); // ゝ -> ヽ
    if (code === 0x309e) return String.fromCharCode(0x30fe); // ゞ -> ヾ
    return String.fromCharCode(code + 0x60);
  });
}

const STORAGE_KEY = 'heavyOrder.form.v1';
const DRAFTS_KEY = 'heavyOrder.drafts.v1';

type OrderForm = {
  lastKana: string;
  firstKana: string;
  lastName: string;
  firstName: string;
  phone: string;
  staffName?: string;
  fabricCode?: string;
  patternNo?: string;
};

export default function CustomerInfoPage(): React.ReactElement {
  const navigate = useNavigate();

  const lastKanaRef = React.useRef<HTMLInputElement>(null);
  const firstKanaRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const phoneRef = React.useRef<HTMLInputElement>(null);
  const clubIdRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function attachKanaAutoConvert(el: HTMLInputElement | null) {
      if (!el) return;
      let isComposing = false;
      el.addEventListener('compositionstart', () => (isComposing = true));
      el.addEventListener('compositionend', () => {
        isComposing = false;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const converted = hiraToKata(el.value);
        if (converted !== el.value) {
          el.value = converted;
          if (start != null && end != null) el.setSelectionRange(start, end);
        }
      });
      el.addEventListener('input', (e: Event) => {
        if ((e as any).isComposing || isComposing) return;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const converted = hiraToKata(el.value);
        if (converted !== el.value) {
          el.value = converted;
          if (start != null && end != null) el.setSelectionRange(start, end);
        }
      });
    }
    [lastKanaRef.current, firstKanaRef.current].forEach((el) => attachKanaAutoConvert(el));
  }, []);

  // Restore saved values from localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) || {};

      const setVal = (el: HTMLInputElement | null, val: unknown, toKatakana = false) => {
        if (!el || val == null) return;
        const str = String(val);
        el.value = toKatakana ? hiraToKata(str) : str;
      };

      setVal(lastKanaRef.current, data.lastKana, true);
      setVal(firstKanaRef.current, data.firstKana, true);
      setVal(lastNameRef.current, data.lastName);
      setVal(firstNameRef.current, data.firstName);
      setVal(phoneRef.current, data.phone);

      if (clubIdRef.current) clubIdRef.current.textContent = data.clubId != null ? String(data.clubId) : '\u00A0';
    } catch {}
  }, []);

  // Persist customer inputs to localStorage on change
  React.useEffect(() => {
    const persist = () => {
      try {
        const base = (JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}) as Partial<OrderForm>;
        const merged: OrderForm = {
          lastKana: lastKanaRef.current?.value || '',
          firstKana: firstKanaRef.current?.value || '',
          lastName: lastNameRef.current?.value || '',
          firstName: firstNameRef.current?.value || '',
          phone: phoneRef.current?.value || '',
          staffName: base.staffName,
          fabricCode: base.fabricCode,
          patternNo: base.patternNo,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...base, ...merged }));
      } catch {}
    };

    const els: Array<HTMLInputElement | null> = [lastKanaRef.current, firstKanaRef.current, lastNameRef.current, firstNameRef.current, phoneRef.current];

    els.forEach((el) => {
      el?.addEventListener('input', persist);
      el?.addEventListener('change', persist);
    });

    return () => {
      els.forEach((el) => {
        el?.removeEventListener('input', persist);
        el?.removeEventListener('change', persist);
      });
    };
  }, []);

  const onSaveDraft = React.useCallback(() => {
    // Lấy form đã lưu (nếu có) và merge các trường của trang customer
    let base: Partial<OrderForm> = {};
    try {
      base = (JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}) as Partial<OrderForm>;
    } catch {}

    const merged: OrderForm = {
      ...base,
      lastKana: lastKanaRef.current?.value || '',
      firstKana: firstKanaRef.current?.value || '',
      lastName: lastNameRef.current?.value || '',
      firstName: firstNameRef.current?.value || '',
      phone: phoneRef.current?.value || '',
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {}

    // Tạo draft entry và lưu vào danh sách drafts
    const now = new Date();
    const entry = {
      id: now.getTime(),
      title: merged.staffName || merged.fabricCode || merged.patternNo || `${merged.lastName || ''} ${merged.firstName || ''}`.trim() || 'Draft',
      savedAt: now.toISOString(),
      form: merged,
    };

    try {
      const arr = JSON.parse(localStorage.getItem(DRAFTS_KEY) || '[]');
      arr.unshift(entry);
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(arr));
    } catch {}

    // Điều hướng sang trang danh sách draft
    navigate('/drafts');
  }, [navigate]);

  return (
    <div className="container-card">
      <nav className="grid grid-cols-5 gap-3 my-2">
        {['ジャケットオーダー入力', 'お客様情報入力', 'ジャケットオーダー確認', 'お客様情報確認', '完了'].map((label, i) => (
          <div key={label} className={`relative text-center text-sm pb-2 ${i === 1 ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
            {label}
            <span className={`absolute left-[10%] right-[10%] bottom-0 h-1 rounded-full ${i === 1 ? 'bg-slate-900' : 'bg-slate-200'}`} />
          </div>
        ))}
      </nav>

      <h1 className="text-[22px] font-semibold my-2">お客様情報入力</h1>

      <form className="grid grid-cols-[220px_1fr] gap-x-5 gap-y-4" id="customerForm">
        <fieldset className="contents">
          <label className="self-center">
            お客様名 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3" style={{ gridColumn: '2/3' }}>
            <input ref={lastKanaRef} className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50" id="lastKana" placeholder="フリガナ（セイ）" />
            <input ref={firstKanaRef} className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50" id="firstKana" placeholder="フリガナ（メイ）" />
            <input ref={lastNameRef} className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50" id="lastName" placeholder="姓" />
            <input ref={firstNameRef} className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50" id="firstName" placeholder="名" />
          </div>
          <div className="text-slate-500 text-xs mt-1" style={{ gridColumn: '2/3' }}>
            ひらがなで入力すると、自動的にカタカナに変換されます。
          </div>
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">BEAMS CLUB ID</label>
          <div ref={clubIdRef} className="w-full rounded-lg border px-4 py-3 bg-gray-50" id="clubId">
            &nbsp;
          </div>
        </fieldset>

        <fieldset className="contents">
          <label className="self-center">
            電話番号 <span className="text-red-500">*</span>
          </label>
          <input ref={phoneRef} className="w-full h-11 rounded-lg border px-4 text-sm bg-gray-50" id="phone" placeholder="09012345678" />
        </fieldset>

        <div className="col-start-2 flex gap-4 justify-center mt-6">
          <Link to="/order" className="btn btn--light w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-100 text-slate-900 no-underline">
            戻る
          </Link>
          <button type="button" onClick={onSaveDraft} className="btn btn--light w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-100 text-slate-900">
            下書き
          </button>
          <Link to="/" className="btn btn--dark w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-900 text-white no-underline">
            次へ
          </Link>
        </div>
      </form>
    </div>
  );
}
