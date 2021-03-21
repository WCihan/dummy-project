import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ContactUs from './contactUs/contactUs';
import Footer from './footer/footer';
import Homepage from './homepage/homepage';
import Login from './login/login';
import Main from './Main';
import Navbar from './navbar/navbar';

function App() {
	const { t } = useTranslation();
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	useEffect(() => {
		document.title = t('navbar.title');
	}, [t]);

	return (
		<Main>
			<Router basename='/'>
				<div className='app-container'>
					<Navbar isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
					<Switch>
						<Route path='/' exact component={Homepage} />
						<Route path='/contact-us' exact component={ContactUs} />
					</Switch>
					{isLoginModalOpen && (
						<Login isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
					)}
					<Footer />
				</div>
			</Router>
		</Main>
	);
}

export default App;
