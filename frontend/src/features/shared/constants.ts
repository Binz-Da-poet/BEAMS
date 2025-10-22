export const STORAGE_KEYS = {
  active: 'heavyOrder.form.v1',
  drafts: 'heavyOrder.drafts.v1',
  itemForms: ['jacketOrder.form.v1', 'coatOrder.form.v1', 'suitOrder.form.v1', 'pantsOrder.form.v1', 'vestOrder.form.v1'],
} as const;

export const DATE_FORMAT = 'YYYY/MM/DD HH:mm';

export const STEP_LABELS = ['オーダー入力', 'お客様情報入力', 'オーダー確認', 'お客様情報確認', '完了'] as const;

export const ITEM_LABELS: Record<string, string> = {
  jacket: 'ジャケット',
  coat: 'コート',
  suit: 'スーツ',
  pants: 'パンツ',
  vest: 'ベスト',
};
