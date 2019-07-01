import React from 'react';
import { Router, Redirect } from '@reach/router';
import { auth } from 'firebase';
const AuthenticatedApp = () => {
	return (
		<div>
			<Nav />
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
