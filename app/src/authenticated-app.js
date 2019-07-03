import { Link, Redirect, Router } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import CardForm from './component/CardForm/CheckoutPage';
import { signout, useUser } from './context/auth-context';
import SetUpLoan from './setUpLoan.js';
import * as mq from './styles/media-queries';
import ReviewLoan from './component/ReviewLoan';
import LoanRequest from './component/LoanRequest';
import Bailout from './Bailout';
import { auth } from './firebase';
import Dashboard from './Dashboard';
import LandingPage from './component/LandingPage';

// const Container = styled.div`
//   transition: box-shadow 0.3s;
//   border-radius: 10px;
//   border: 1px solid #ccc;
//   background: #fff;
//   box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
//   transition: box-shadow 0.5s;
//   display: flex;
//   width: 100%;
//   max-width: 1220px;
//   height: 85%;
//   padding: 10px;
//   margin: 0 auto;
//   margin-top: 2rem;
//   ${mq.small} {
//     border: 2px solid rebeccapurple;
//     background-color: yellow;
//   }
// `;
const AuthenticatedApp = () => {
  return (
    <Test>
      <Nav />
      {/* <Container> */}
      <Routes />
      {/* </Container> */}
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
      <ToLoan path='/SetUpLoan' />
      <Dashboard path='/dashboard' />
      <Bailout path='/request/:id' />
      <LandingPage path='/' />
      <NotFound default />
    </Router>
  );
}
function Nav() {
  return (
    <NavWrapper>
      <LinkWrapper>
        <Link to='/cardform'>CardForm</Link>
      </LinkWrapper>
      <LinkWrapper>
        <Link to='/dashboard'>Dashboard</Link>
      </LinkWrapper>
      <LinkWrapper>
        <Link to='/SetUpLoan'>Setup Loan</Link>
      </LinkWrapper>
      <ButtonWrapper>
        <div onClick={() => auth().signOut()}>Signout</div>
      </ButtonWrapper>
    </NavWrapper>
  );
}
const NavWrapper = styled.nav`
  width: 100%;
  position: sticky;
  background-color: #202021;
`;

const LinkWrapper = styled.div`
  float: left;
  display: flex;
  align-content: center;
  align-items: center;
  border-right: 1px solid white;
  height: 40px;
  padding: 10px 30px;
  & > * {
    color: white;
    text-decoration: none;
  }
  &:hover {
    background: #91959c;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  float: right;
  border-left: 1px solid #bbb;
  height: 40px;
  padding: 10px 30px;
  & > * {
    color: white;
  }
  &:hover {
    background: #91959c;
  }
`;
function ToLoan() {
  return <SetUpLoan />;
}

function NotFound() {
  return <p>Not found</p>;
}
function Redirector() {
  return <Redirect to='/dashboard' />;
}
export default AuthenticatedApp;
