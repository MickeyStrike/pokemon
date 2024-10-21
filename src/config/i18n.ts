import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locale/en.json';
import id from '@/locale/id.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      id: { common: id },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: false },
  });

export default i18n;