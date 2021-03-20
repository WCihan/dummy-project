import { createContext } from 'react';

export interface IUserInfo {
	name: string;
	email: string;
}

const AppContext = createContext({
	userInfo: {} as IUserInfo
});

export default AppContext;
