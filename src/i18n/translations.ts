export type Language = 'tr' | 'en';

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
];

const tr = {
  locale: 'tr-TR',
  currency: 'TL',
  dailyTitle: 'Günlük',
  transaction: 'İşlem',
  noTransactions: 'Henüz işlem yok.',
  descriptionPlaceholder: 'Açıklama #etiket',
  addIncome: '+ GELİR',
  addExpense: '- GİDER',
  missingInfoTitle: 'Eksik Bilgi',
  missingAmount: 'Lütfen miktar giriniz.',
  deleteTxTitle: 'İşlemi Sil',
  deleteTxMessage: 'Bu işlemi silmek istediğinize emin misiniz?',
  cancel: 'İptal',
  delete: 'Sil',
  netBalance: 'Net Bakiye',
  income: 'Gelir',
  expense: 'Gider',
  net: 'Net',
  byTags: 'Etiketlere Göre Dağılım',
  pastMonths: 'Geçmiş Aylar',
  noHistory: 'Geçmiş veri bulunamadı.',
  settings: 'Ayarlar',
  colorPalette: 'Renk Paleti',
  language: 'Dil',
  labels: 'Etiketler',
  manageLabels: 'Etiketleri Yönet',
  panelPreview: 'Panel Görünümü',
  appName: 'Harcamalarım Legacy',
  wipeAll: 'Bütün Bakiyeyi Sil',
  newLabelPlaceholder: 'Yeni etiket...',
  add: 'EKLE',
  close: 'KAPAT',
  warning: 'DİKKAT',
  wipeConfirm: 'Silmek istiyon mu cidden aq',
  no: 'HAYIR',
  yes: 'EVET',
  otherTag: '#diğer',
  updateReady: 'Yeni güncelleme hazır!',
  restart: 'Yeniden Başlat',
};

export type Translation = typeof tr;

const en: Translation = {
  locale: 'en-US',
  currency: 'TL',
  dailyTitle: 'Daily',
  transaction: 'Transaction',
  noTransactions: 'No transactions yet.',
  descriptionPlaceholder: 'Description #tag',
  addIncome: '+ INCOME',
  addExpense: '- EXPENSE',
  missingInfoTitle: 'Missing Info',
  missingAmount: 'Please enter an amount.',
  deleteTxTitle: 'Delete Transaction',
  deleteTxMessage: 'Are you sure you want to delete this transaction?',
  cancel: 'Cancel',
  delete: 'Delete',
  netBalance: 'Net Balance',
  income: 'Income',
  expense: 'Expense',
  net: 'Net',
  byTags: 'Breakdown by Tags',
  pastMonths: 'Past Months',
  noHistory: 'No history found.',
  settings: 'Settings',
  colorPalette: 'Color Palette',
  language: 'Language',
  labels: 'Tags',
  manageLabels: 'Manage Tags',
  panelPreview: 'Panel Preview',
  appName: 'Harcamalarım Legacy',
  wipeAll: 'Delete All Data',
  newLabelPlaceholder: 'New tag...',
  add: 'ADD',
  close: 'CLOSE',
  warning: 'WARNING',
  wipeConfirm: 'Do you really want to delete everything?',
  no: 'NO',
  yes: 'YES',
  otherTag: '#other',
  updateReady: 'A new update is ready!',
  restart: 'Restart',
};

export const translations: Record<Language, Translation> = { tr, en };

export const detectDeviceLanguage = (): Language => {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale || '';
    return locale.toLowerCase().startsWith('tr') ? 'tr' : 'en';
  } catch {
    return 'tr';
  }
};
