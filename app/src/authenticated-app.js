<<<<<<< HEAD
import { Redirect, Router } from '@reach/router';
import React from 'react';
import CardForm from './component/CardForm/CardForm';
=======
import React from 'react';
import { Redirect, Router, Link } from '@reach/router';
import styled from 'styled-components';
import CardForm from './component/CardForm/CardForm';
import * as mq from './styles/media-queries';
import { auth } from './firebase';
console.log(mq);
const Container = styled.div`
	display: grid;
	width: 100%;
	max-width: 880px;
	grid-gap: 1em;
	margin: 0 auto;
	border: 2px solid black;
	${mq.small} {
		border: 2px solid rebeccapurple;
		background-color: yellow;
	}
`;
>>>>>>> c78a10ca1c31b04f0c9b01ec27890e8d995d2089
const AuthenticatedApp = () => {
	return (
		<Container>
			<Nav />
			<p>Authenticated!</p>
			<Routes />
		</Container>
	);
};

function Routes() {
<<<<<<< HEAD
  return (
    <Router>
      {/* <Redirector path="/" /> */}
      <Placeholder path='/' />
      <NotFound default />
      <CardForm path='/cardform' />
    </Router>
  );
=======
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
	return (
		<>
			<Link to="/cardform">CardForm</Link>
			<Link to="/">Home</Link>
			<button onClick={() => auth().signOut()}>signout</button>
		</>
	);
>>>>>>> c78a10ca1c31b04f0c9b01ec27890e8d995d2089
}
function Placeholder() {
	return <p>Placeholder Page</p>;
}
function NotFound() {
	return <p>Not found</p>;
}
function Redirector() {
<<<<<<< HEAD
  return <Redirect to='/something' />;
=======
	return <Redirect to="/something" />;
>>>>>>> c78a10ca1c31b04f0c9b01ec27890e8d995d2089
}
export default AuthenticatedApp;
