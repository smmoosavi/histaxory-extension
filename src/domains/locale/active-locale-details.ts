import { languageDetails } from 'src/domains/language';
import { activeLanguage } from 'src/constants';

export const activeLocale = {
  language: languageDetails[activeLanguage],
};
