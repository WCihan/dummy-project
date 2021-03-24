import { useTranslation } from 'react-i18next';
import './homepage.scss';

export default function Homepage() {
	const { t } = useTranslation();

	return (
		<div className='homepage-container'>
			<h3 className='homepage__title'>{t('homepage.title')}</h3>
			<div className='homepage__description'>{t('homepage.description')}</div>
		</div>
	);
}
