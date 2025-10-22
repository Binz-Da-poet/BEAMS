import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrderData } from '../../shared/hooks/useOrderData';
import { saveDraft } from '../../shared/utils/draftUtils';
import { BreadcrumbNavigation } from '../../shared/components/BreadcrumbNavigation';

function hiraToKata(s: string): string {
  return s.replace(/[\u3041-\u3096\u309D-\u309E]/g, (ch) => {
    const code = ch.charCodeAt(0);
    if (code === 0x309d) return String.fromCharCode(0x30fd); // ゝ -> ヽ
    if (code === 0x309e) return String.fromCharCode(0x30fe); // ゞ -> ヾ
    return String.fromCharCode(code + 0x60);
  });
}

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
  const { orderData, currentItemType, updateOrderData, getStorageKey } = useOrderData();

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
      const raw = localStorage.getItem(getStorageKey());
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
      const customerData = {
        lastKana: lastKanaRef.current?.value || '',
        firstKana: firstKanaRef.current?.value || '',
        lastName: lastNameRef.current?.value || '',
        firstName: firstNameRef.current?.value || '',
        phone: phoneRef.current?.value || '',
      };
      updateOrderData(customerData);
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
    const customerData = {
      lastKana: lastKanaRef.current?.value || '',
      firstKana: firstKanaRef.current?.value || '',
      lastName: lastNameRef.current?.value || '',
      firstName: firstNameRef.current?.value || '',
      phone: phoneRef.current?.value || '',
    };

    // persist inputs so saveDraft can merge from storage
    updateOrderData(customerData);

    // use shared saveDraft (will validate staffName and merge all forms)
    const storagePrefix = getStorageKey().replace('.form.v1', '');
    saveDraft(storagePrefix, customerData as any, currentItemType, (orderData as any).fabricCode);
  }, [currentItemType, getStorageKey, orderData, updateOrderData]);

  return (
    <div className="container-card">
      <BreadcrumbNavigation currentStep={1} />

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
          <button
            onClick={() => {
              // Save current form data
              const customerData = {
                lastKana: lastKanaRef.current?.value || '',
                firstKana: firstKanaRef.current?.value || '',
                lastName: lastNameRef.current?.value || '',
                firstName: firstNameRef.current?.value || '',
                phone: phoneRef.current?.value || '',
              };
              updateOrderData(customerData);

              // Navigate to appropriate order confirmation page
              const confirmationPaths = {
                jacket: '/jacket-order-confirmation',
                coat: '/coat-order-confirmation',
                suit: '/suit-order-confirmation',
                pants: '/pants-order-confirmation',
                vest: '/vest-order-confirmation',
                heavy: '/order-confirmation', // fallback
              };
              const confirmationPath = confirmationPaths[currentItemType as keyof typeof confirmationPaths] || '/';
              navigate(confirmationPath);
            }}
            className="btn btn--dark w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-900 text-white"
          >
            次へ
          </button>
        </div>
      </form>
    </div>
  );
}
