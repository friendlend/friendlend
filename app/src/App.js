import React from 'react';
import AuthenticatedApp from './authenticated-app';
import UnAuthenticatedApp from './unauthenticated-app';
import { useUser } from './context/auth-context';
function App() {
	const { user } = useUser();
	console.log(user, 'userrr');
	return user ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
}

export default App;
