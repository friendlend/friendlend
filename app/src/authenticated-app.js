import { Redirect, Router } from '@reach/router';
import React from 'react';
import CardForm from './component/CardForm/CardForm';
import { auth, db } from './firebase';
const AuthenticatedApp = () => {
	return (
		<div>
			<p>Authenticated!</p>
			<Routes />
		</div>
	);
};

function Routes() {
	return (
		<Router>
			{/* <Redirector path="/" /> */}
			<Placeholder path="/" />
			<NotFound default />
			<CardForm path="/cardform" />
		</Router>
	);
}
function Nav() {
	return <button onClick={() => auth().signOut()}>signout</button>;
}
function Placeholder() {
	return <p>Placeholder Page</p>;
}
function NotFound() {
	return <p>Not found</p>;
}
function Redirector() {
	return <Redirect to="/something" />;
}
export default AuthenticatedApp;
