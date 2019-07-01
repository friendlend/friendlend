import React from 'react';
import { useUser } from './context/auth-context';
import { auth } from 'firebase';

const UnAuthenticatedApp = () => {
	const { handleGoogleSignIn, setUser } = useUser();
	function handleEmailPassSignIn(event) {
		event.preventDefault();
		const { email, password } = event.target.elements;
		auth()
			.createUserWithEmailAndPassword(email.value, password.value)
			.catch(err => console.log(err, 'ERROR'));
	}
	return (
		<>
			<p>UNNNNNAuthenticated!</p>
			<button onClick={handleGoogleSignIn}>Sign in with Google</button>
			<form onSubmit={handleEmailPassSignIn}>
				<label htmlFor="email">Email</label>
				<input id="email" />
				<label htmlFor="password">Password</label>
				<input id="password" type="password" />
				<button type="submit">Sign in with Email & Password</button>
			</form>
		</>
	);
};

export default UnAuthenticatedApp;
