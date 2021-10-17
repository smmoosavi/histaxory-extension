import { i18n } from '@lingui/core';
import { activeLanguage } from 'src/constants';
import { Language } from 'src/domains/language';
import { enMessages, faMessages } from 'src/locales';
import { en as enPlurals, fa as faPlurals } from 'make-plural/plurals';
import { AllLocaleData } from '@lingui/core/cjs/i18n';

const catalogs = { en: enMessages, fa: faMessages };

const langCodes: Record<Language, string> = {
  'en-US': 'en',
  'fa-IR': 'fa',
};

const allLocaleData: AllLocaleData = {
  en: { plurals: enPlurals },
  fa: { plurals: faPlurals },
};

export const configI18n = () => {
  i18n.load(catalogs);
  i18n.loadLocaleData(allLocaleData);
  i18n.activate(langCodes[activeLanguage]);
};
