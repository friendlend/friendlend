import { Link, Redirect, Router } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import CardForm from './component/CardForm/CheckoutPage';
import { signout, useUser } from './context/auth-context';
import SetUpLoan from './setUpLoan.js';
import * as mq from './styles/media-queries';
import ReviewLoan from './component/ReviewLoan';
import LoanRequest from './component/LoanRequest';

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
      <SetUpLoan path='/SetUpLoan' />
      <ReviewLoan path='/review/:loanId' />
      <LoanRequest path='/request/:loanId' />
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
