import { useState } from 'react';
import AppContext, { IUserInfo } from '../context/AppContext';

export default function Main({ children }: { children: JSX.Element }) {
	const [userInfo, setUserInfo] = useState({} as IUserInfo);

	const value = {
		userInfo,
		setUserInfo
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
