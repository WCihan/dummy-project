import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ContactUs from './contactUs/contactUs';
import Footer from './footer/footer';
import Homepage from './homepage/homepage';
import Main from './Main';
import Navbar from './navbar/navbar';

function App() {
	const { t } = useTranslation();

	useEffect(() => {
		document.title = t('navbar.title');
	}, [t]);

	return (
		<Main>
			<Router basename='/'>
				<Navbar />
				<Switch>
					<Route path='/' exact component={Homepage} />
					<Route path='/contact-us' exact component={ContactUs} />
				</Switch>
				<Footer />
			</Router>
		</Main>
	);
}

export default App;
