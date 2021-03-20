import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/image/logo.svg';
import AppContext from '../../context/AppContext';
import { resources } from '../../i18n';
import './navbar.css';

const languages = Object.keys(resources);

function Navbar() {
	const { t, i18n } = useTranslation();
	const location = useLocation();
	const { userInfo } = useContext(AppContext);
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
						<select onChange={({ target: { value } }) => i18n.changeLanguage(value)} value={i18n.language}>
							{languages.map((l) => (
								<option value={l} key={l}>
									{l}
								</option>
							))}
						</select>
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
											>
												{t('navbar.logout')}
											</button>
										</li>
									</ul>
								</div>
							</div>
						) : (
							<button type='button' className='navbar__right__item__login navbar--button'>
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
