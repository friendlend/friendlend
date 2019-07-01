import React from 'react';
import { useUser } from './context/auth-context';
const UnAuthenticatedApp = () => {
	const { handleGoogleSignIn } = useUser();
	return (
		<div>
			<p>UNNNNNAuthenticated!</p>
			<button onClick={handleGoogleSignIn}>Sign in with Google</button>
		</div>
	);
};

export default UnAuthenticatedApp;
