// Draft utility functions
import { STORAGE_KEYS, ITEM_LABELS } from '../constants';

export const saveDraft = (_storageKey: string, formData: Record<string, string>, itemType: string, fabricCode?: string) => {
  // Merge all relevant data from known form keys + current page form
  const candidateKeys = ['jacketOrder.form.v1', 'coatOrder.form.v1', 'suitOrder.form.v1', 'pantsOrder.form.v1', 'vestOrder.form.v1', 'heavyOrder.form.v1'];
  const mergedFromStorage = candidateKeys.reduce<Record<string, string>>((acc, key) => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) Object.assign(acc, JSON.parse(raw) as Record<string, string>);
    } catch {}
    return acc;
  }, {});

  const mergedForm: Record<string, string> = { ...mergedFromStorage, ...formData };

  // Require 担当者 (staffName)
  const staffName = (mergedForm?.staffName || '').trim();
  if (!staffName) {
    alert('担当者を入力してください。');
    return;
  }

  const savedAt = new Date().toISOString();

  // Get existing drafts from the unified key that DraftsPage uses
  const existingDrafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.drafts) || '[]');

  const newDraft = {
    id: Date.now(),
    savedAt,
    form: mergedForm,
  };

  try {
    const updatedDrafts = [...existingDrafts, newDraft];
    localStorage.setItem(STORAGE_KEYS.drafts, JSON.stringify(updatedDrafts));
  } catch (e) {
    console.error('Failed to save draft', e);
    alert('下書き保存に失敗しました。ストレージ容量を確認してください。');
    return;
  }

  // Navigate to drafts page
  window.location.href = '/drafts';
};

const getItemLabel = (itemType: string): string => ITEM_LABELS[itemType] || itemType;
