import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '../../context/AppContext';
import LocaleSelector from '../commons/localeSelector/localeSelector';
import './login.css';

export interface ILoginProps {
	isLoginModalOpen: boolean;
	setIsLoginModalOpen: (isOpen: boolean) => void;
}

export interface IFormElements extends HTMLFormControlsCollection {
	name: HTMLInputElement;
	email: HTMLInputElement;
}

export default function Login({ isLoginModalOpen, setIsLoginModalOpen }: ILoginProps) {
	const { t } = useTranslation();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isFormSubmited, setIsFormSubmited] = useState(false);
	const { setUserInfo } = useContext(AppContext);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const nameField = ((e.target as HTMLFormElement).elements as IFormElements).name;
		const emailField = ((e.target as HTMLFormElement).elements as IFormElements).email;

		if (nameField.checkValidity() && emailField.checkValidity()) {
			setUserInfo({
				name: nameField.value,
				email: emailField.value
			});
			setIsLoginModalOpen(!isLoginModalOpen);
		}
	}

	return (
		<div className={`login-modal-container${isLoginModalOpen ? ' login--open' : ''}`}>
			<div className='login__modal'>
				<button
					className='login__modal__close-button'
					type='button'
					onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
				>
					X
				</button>
				<div className='login__modal__contet'>
					<h2>{t('login.title')}</h2>
					<form
						onSubmit={onSubmit}
						className={`login__modal__contet__form${isFormSubmited ? ' login__form--submited' : ''}`}
					>
						<input
							className='login__modal__content__input'
							name='name'
							value={name}
							placeholder={t('login.namePlaceholder')}
							onChange={({ target: { value } }) => setName(value)}
							required
						/>
						<input
							className='login__modal__content__input'
							name='email'
							type='email'
							value={email}
							placeholder={t('login.emailPlaceholder')}
							onChange={({ target: { value } }) => setEmail(value)}
							required
						/>
						<input
							className='login__modal__content__input'
							name='password'
							type='password'
							value={password}
							placeholder={t('login.passwordPlaceholder')}
							onChange={({ target: { value } }) => setPassword(value)}
							required
						/>
						<button
							className='login__modal__submit-button'
							type='submit'
							onClick={() => setIsFormSubmited(true)}
						>
							{t('login.title')}
						</button>
					</form>
					<div className='login__modal__contet__locale'>
						<LocaleSelector />
					</div>
				</div>
			</div>
			<div className='login-modal__overlay' />
		</div>
	);
}
