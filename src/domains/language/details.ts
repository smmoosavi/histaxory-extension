import { t } from '@lingui/macro';
import { Language, LanguageDetail } from './types';

export const languageDetails: Record<Language, LanguageDetail> = {
  'fa-IR': {
    code: 'fa',
    name: 'fa-IR',
    label: t`فارسی`,
    direction: 'rtl',
  },
  'en-US': {
    code: 'en',
    name: 'en-US',
    label: t`English`,
    direction: 'ltr',
  },
};
