import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from '../../translations/en';
import amTranslations from '../../translations/am';
import ruTranslations from '../../translations/ru';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        detection: {
            order: ['localStorage'],
            lookupLocalStorage: 'language',
            caches: ['localStorage']
        },
        resources: {
            en: {
                translations: enTranslations
            },
            am: {
                translations: amTranslations
            },
            ru: {
                translations: ruTranslations
            }
        },
        fallbackLng: 'en',
        debug: true,
        ns: ['translations'],
        defaultNS: 'translations',
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
