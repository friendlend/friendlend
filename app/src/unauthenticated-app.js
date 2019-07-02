import React from 'react';
import { Router, Redirect } from '@reach/router';
import { useUser } from './context/auth-context';
import { db, auth } from './firebase';
import LandingPage from './component/LandingPage';
import Login from './component/Auth/Login';
import SignUp from './component/Auth/SignUp';

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
			<Router>
				<LandingPage path="/" exact />
				<Login path="/login" />
				<SignUp path="/signup" />
				{/* <Redirector default /> */}
			</Router>
		</>
	);
};

function Redirector() {
	return <Redirect to="/" />;
}

export default UnAuthenticatedApp;
