import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '../../context/AppContext';
import './footer.scss';

export default function Footer() {
	const { t } = useTranslation();
	const {
		userInfo: { name }
	} = useContext(AppContext);

	return (
		<div className='footer-container'>
			<span>{t('footer.descripton')}</span>
			{name && <span>{`${t('footer.welcome')} ${name}`}</span>}
		</div>
	);
}
