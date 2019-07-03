import { Link, Router } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import CardForm from './component/CardForm/CheckoutPage';
import SetUpLoan from './component/SetUpLoan';
import * as mq from './styles/media-queries';
import ReviewLoan from './component/ReviewLoan';
import LoanRequest from './component/LoanRequest';
import Dashboard from './Dashboard';
import LandingPage from './component/LandingPage';
import Loan from './component/Loan';
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
      <Loan path='/loan/:loanId' />
      <LandingPage path='/' />
      <NotFound default />
    </Router>
  );
}
function Nav() {
  return (
    <NavWrapper>
      <h1>friendlend</h1>
      <nav>
        <Link to='/newloan'>Create New Loan</Link>
        &nbsp;|&nbsp;
        <Link to='/dashboard'>Dashboard</Link>
        &nbsp;|&nbsp;
        <Link to='/' onClick={() => signout()}>
          Sign Out
        </Link>
      </nav>
    </NavWrapper>
  );
}
const NavWrapper = styled.header`
  display: flex;
  width: 100%;
  height: 75px;
  position: sticky;
  background-color: #333333;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: white;
    font-family: 'Permanent Marker', cursive;
    user-select: none;
    font-size: 3rem;
    margin-left: 5%;
  }

  nav {
    font-size: 1.6rem;
    color: white;
    margin-right: 5%;
    a {
      color: white;
      text-decoration: none;
      transition: 300ms;
      &:hover {
        color: green;
      }
    }
  }
`;

function NotFound() {
  return <p>Not found</p>;
}

export default AuthenticatedApp;
