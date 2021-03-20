import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import tr from './locales/tr/translation.json';

export const resources = {
	en: {
		translation: en
	},
	tr: {
		translation: tr
	}
} as const;

i18n.use(initReactI18next).init({
	fallbackLng: 'en',
	debug: !process.env.NODE_ENV || process.env.NODE_ENV === 'development', // disable in production
	resources
});

export default i18n;
