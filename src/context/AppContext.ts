import { createContext } from 'react';

export interface IUserInfo {
	name: string;
	email: string;
}

const AppContext = createContext({
	userInfo: {} as IUserInfo,
	setUserInfo: (() => {}) as React.Dispatch<React.SetStateAction<IUserInfo>>
});

export default AppContext;
