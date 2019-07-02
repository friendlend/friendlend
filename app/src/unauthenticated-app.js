import React from 'react';
import { Router, Redirect } from '@reach/router';
import LandingPage from './component/LandingPage';
import Login from './component/Auth/Login';
import SignUp from './component/Auth/SignUp';
import LoanRequest from './component/LoanRequest';

const UnAuthenticatedApp = () => {
  return (
    <>
      <Router>
        <LandingPage path='/' exact />
        <Login path='/login' />
        <SignUp path='/signup' />
        <LoanRequest path='/request/:loanId' />
      </Router>
    </>
  );
};

export default UnAuthenticatedApp;
