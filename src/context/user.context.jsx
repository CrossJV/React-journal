import { createContext, useState } from 'react';

export const UserContext = createContext({
	userId: 1,
	record: 0
}); 

export const UserContextProvider = ({ children }) => {
	const {0: userId, 1: setUserId} = useState(1);

	return <UserContext.Provider value={ {userId, setUserId} } >
		{children}
	</UserContext.Provider>;
};