import React from 'react';
import { Redirect, Router, Link } from '@reach/router';
import styled from 'styled-components';
import CardForm from './component/CardForm/CardForm';
import * as mq from './styles/media-queries';
import { auth } from './firebase';
import SetUpLoan from './setUpLoan.js';
import { useUser, signout } from './context/auth-context';

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
const AuthenticatedApp = () => {
  const user = useUser();
  console.log(user);
  return (
    <Container>
      <Nav />
      <p>Authenticated!</p>
      <Routes />
    </Container>
  );
};

function Routes() {
  return (
    <Router>
      {/* <Redirector path="/" /> */}
      <Placeholder path='/' />
      <NotFound default />
      <CardForm path='/cardform' />
      <ToLoan path='/SetUpLoan' />
    </Router>
  );
}
function Nav() {
  return (
    <>
      <Link to='/cardform'>CardForm</Link>
      <Link to='/'>Home</Link>
      <button onClick={() => signout()}>signout</button>
    </>
  );
}

function ToLoan() {
  return <SetUpLoan />;
}

function Placeholder() {
  return <p>Placeholder Page</p>;
}
function NotFound() {
  return <p>Not found</p>;
}
function Redirector() {
  return <Redirect to='/something' />;
}
export default AuthenticatedApp;
