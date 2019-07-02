import React from 'react';
import { useUser } from './context/auth-context';
import { db, auth } from './firebase';

const UnAuthenticatedApp = () => {
	const { handleGoogleSignIn } = useUser();
	async function signup({
		email,
		password,
		displayName,
		photoUrl = 'https://placekitten.com/200/200',
	}) {
		console.log(email, password, displayName, 'values');
		try {
			const { user } = await auth().createUserWithEmailAndPassword(
				email,
				password
			);
			await user.updateProfile({ displayName, photoUrl });
			await db.doc(`users/${user.uid}`).set({
				displayName,
				uid: user.uid,
				email,
				photoUrl: 'https://placekitten.com/200/200',
			});
			return user.uid;
		} catch (e) {
			throw e;
		}
	}
	function handleEmailPassSignIn(event) {
		event.preventDefault();
		const { email, password, displayName } = event.target.elements;
		signup({
			email: email.value,
			password: password.value,
			displayName: displayName.value,
		});
	}
	return (
		<>
			<p>UNNNNNAuthenticated!</p>
			<button onClick={handleGoogleSignIn}>Sign in with Google</button>
			<form onSubmit={handleEmailPassSignIn}>
				<label htmlFor="displayName">name</label>
				<input id="displayName" />
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
