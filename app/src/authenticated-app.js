import React from 'react';
import { Redirect, Router, Link } from '@reach/router';
import styled from 'styled-components';
import CardForm from './component/CardForm/CardForm';
import * as mq from './styles/media-queries';
import { auth } from './firebase';
import SetUpLoan from './setUpLoan.js';
import Dashboard from './Dashboard';

const Container = styled.div`
	transition: box-shadow 0.3s;
	border-radius: 10px;
	border: 1px solid #ccc;
	background: #fff;
	box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
	transition: box-shadow 0.5s;
	display: grid;
	width: 100%;
	max-width: 1220px;
	height: 75%;
	grid-gap: 1em;
	margin: 0 auto;
	margin-top: 2rem;
	${mq.small} {
		border: 2px solid rebeccapurple;
		background-color: yellow;
	}
`;
const AuthenticatedApp = () => {
	return (
		<Test>
			<Nav />
			<Container>
				<Routes />
			</Container>
		</Test>
	);
};
const Test = styled.div`
	display: flex;
	align-items: center;
	height: 100vh;
	background-color: whitesmoke;
	flex-direction: column;
`;
function Routes() {
	return (
		<Router>
			<Redirector path="/" />
			<CardForm path="/cardform" />
			<ToLoan path="/SetUpLoan" />
			<Dashboard path="/dashboard" />
			<NotFound default />
		</Router>
	);
}
function Nav() {
	return (
		<NavWrapper>
			<Link to="/cardform">CardForm</Link>
			<Link to="/dashboard">Dashboard</Link>
			<Link to="/SetUpLoan">Setup Loan</Link>
			<button onClick={() => auth().signOut()}>signout</button>
		</NavWrapper>
	);
}
const NavWrapper = styled.nav`
	display: flex;
	width: 100%;
	position: sticky;
	padding: 2em 1.5em;
	background-color: #333333;
	& > * {
		color: white;
	}
	& > button {
		color: red;
	}
`;
function ToLoan() {
	return <SetUpLoan />;
}

function NotFound() {
	return <p>Not found</p>;
}
function Redirector() {
	return <Redirect to="/dashboard" />;
}
export default AuthenticatedApp;
