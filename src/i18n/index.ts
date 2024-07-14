import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import viTranslation from './translation/vi.json';
import cnTranslation from './translation/cn.json';
// Khởi tạo i18n
i18n.use(initReactI18next).init({
  resources: {
    vi: {
      translation: viTranslation,
    },
    cn: {
      translation: cnTranslation,
    },
  },
  lng: 'cn',
  fallbackLng: 'cn',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
