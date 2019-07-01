import React from 'react';
import { Router, Redirect } from '@reach/router';
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
		</Router>
	);
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
