import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/image/logo.svg';
import AppContext, { IUserInfo } from '../../context/AppContext';
import LocaleSelector from '../commons/localeSelector/localeSelector';
import { ILoginProps } from '../login/login';
import './navbar.css';

function Navbar({ isLoginModalOpen, setIsLoginModalOpen }: ILoginProps) {
	const { t } = useTranslation();
	const location = useLocation();
	const { userInfo, setUserInfo } = useContext(AppContext);
	const [isMenuActive, setIsMenuActive] = useState(false);

	return (
		<div className={`navbar-container${isMenuActive ? ' --hamburger-active' : ''}`}>
			<div className='navbar__hamburger-icon'>
				<input type='checkbox' onChange={() => setIsMenuActive(!isMenuActive)} checked={isMenuActive} />
				<span />
				<span />
				<span />
			</div>
			<div className='navbar__mobil-menu navbar--flex-row'>
				<div className='navbar__left navbar--flex-row'>
					<Logo />
					<div className='navbar__left__title'>
						{t(location.pathname === '/' ? 'navbar.title' : `navbar.${location.pathname.substring(1)}`)}
					</div>
				</div>
				<div className='navbar__right navbar--flex-row'>
					<div className='navbar__right__item'>
						<Link
							to='/'
							className={`navbar--button${location.pathname === '/' ? ' navbar--button--active' : ''}`}
						>
							{t('navbar.homepage')}
						</Link>
					</div>
					<div className='navbar__right__item'>
						<Link
							to='/contact-us'
							className={`navbar--button${
								location.pathname === '/contact-us' ? ' navbar--button--active' : ''
							}`}
						>
							{t('navbar.contact-us')}
						</Link>
					</div>
					<div className='navbar__right__item'>
						<LocaleSelector />
					</div>
					<div className='navbar__right__item'>
						{userInfo && userInfo.name ? (
							<div className='navbar__right__item__user'>
								<div className='navbar__right__item__user__name'>{userInfo.name}</div>
								<div className='navbar__right__item__user__dropdown'>
									<ul>
										<li className='navbar__right__item__user__dropdown__item'>{userInfo.email}</li>
										<li className='navbar__right__item__user__dropdown__item'>
											<button
												type='button'
												className='navbar__right__item__user__logout navbar--button'
												onClick={() => setUserInfo({} as IUserInfo)}
											>
												{t('navbar.logout')}
											</button>
										</li>
									</ul>
								</div>
							</div>
						) : (
							<button
								type='button'
								className='navbar__right__item__login navbar--button'
								onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
							>
								{t('navbar.login')}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
export default Navbar;
