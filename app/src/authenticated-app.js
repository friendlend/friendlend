import { Link, Router } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import CardForm from './component/CardForm/CheckoutPage';
import SetUpLoan from './setUpLoan.js';
import * as mq from './styles/media-queries';
import ReviewLoan from './component/ReviewLoan';
import LoanRequest from './component/LoanRequest';
import { auth } from './firebase';
import Dashboard from './Dashboard';
import LandingPage from './component/LandingPage';
import { signout } from './context/auth-context';

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
      <CardForm path='/cardform' />
      <CardForm path='/payloan/:loanId' />
      <SetUpLoan path='/newloan' />
      <Dashboard path='/dashboard' />
      <ReviewLoan path='/review/:loanId' />
      <LoanRequest path='/request/:loanId' />
      <LandingPage path='/' />
      <NotFound default />
    </Router>
  );
}
function Nav() {
  return (
    <NavWrapper>
      <Link to='/cardform'>CardForm</Link>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/SetUpLoan'>Setup Loan</Link>
      <Link to='/' onClick={() => signout()}>
        signout
      </Link>
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

function NotFound() {
  return <p>Not found</p>;
}

export default AuthenticatedApp;
