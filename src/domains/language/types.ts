export type Language = 'fa-IR' | 'en-US';

export interface LanguageDetail {
  code: string;
  name: Language;
  label: string;
  direction: 'ltr' | 'rtl';
}
