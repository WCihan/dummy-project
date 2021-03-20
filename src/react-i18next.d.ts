import { resources } from './i18n';

declare module 'react-i18next' {
	type TDefaultResources = typeof resources['en'];
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface IResources extends TDefaultResources {}
}
