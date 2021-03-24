import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '../../context/AppContext';
import SearchableDropdown from '../commons/searchableDropdown/searchableDropdown';
import countriesEn from '../../locales/en/countries.json';
import countriesTr from '../../locales/tr/countries.json';
import './contactUs.scss';

export interface ICountry {
	code: string;
	name: string;
}

export default function ContactUs() {
	const { t, i18n } = useTranslation();
	const countries = (i18n.language === 'tr' ? countriesTr : countriesEn).map(({ code, name }) => ({
		key: code,
		label: name
	}));
	const { userInfo } = useContext(AppContext);
	const [name, setName] = useState(userInfo.name || '');
	const [email, setEmail] = useState(userInfo.email || '');
	const [phone, setPhone] = useState('');
	const [country, setCountry] = useState('');
	const [text, setText] = useState('');
	const [isFormSubmited, setIsFormSubmited] = useState(false);

	useEffect(() => {
		userInfo.name && setName(userInfo.name);
		userInfo.email && setEmail(userInfo.email);
	}, [userInfo]);

	return (
		<div className='contact-us-container'>
			<h2 className='contact-us-container__title'>{t('contact-us.title')}</h2>
			<form
				action='https://example.com'
				method='post'
				target='__blank'
				className={`contact-us__form${isFormSubmited ? ' contact-us__form--submited' : ''}`}
			>
				<input
					className='contact-us__form__field'
					name='name'
					value={name}
					placeholder={t('contact-us.namePlaceholder')}
					onChange={({ target: { value } }) => setName(value)}
					required
				/>
				<input
					className='contact-us__form__field'
					name='email'
					type='email'
					value={email}
					placeholder={t('contact-us.emailPlaceholder')}
					onChange={({ target: { value } }) => setEmail(value)}
					required
				/>
				<input
					className='contact-us__form__field'
					name='phone'
					type='tel'
					value={phone}
					placeholder={t('contact-us.phonePlaceholder')}
					onChange={({ target: { value } }) => setPhone(value)}
					required
				/>
				<SearchableDropdown
					parentClass='contact-us__form__field--country'
					selectedItem={country}
					setSelectedItem={setCountry}
					options={countries}
					required
				/>
				<textarea
					className='contact-us__form__field'
					name='text'
					value={text}
					placeholder={t('contact-us.textPlaceholder')}
					onChange={({ target: { value } }) => setText(value)}
					required
				/>
				<button
					className='contact-us__form__field contact-us__form__submit-button'
					type='submit'
					onClick={() => setIsFormSubmited(true)}
				>
					{t('contact-us.send')}
				</button>
			</form>
		</div>
	);
}
