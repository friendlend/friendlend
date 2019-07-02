import React from 'react';
import ReactDOM from 'react-dom';
import { StripeProvider } from 'react-stripe-elements';
import App from './App';
import { UserProvider } from './context/auth-context';
ReactDOM.render(
  <StripeProvider apiKey='pk_test_bhm2j64NgGpCpZgdskK1qimN00N7hynJ4l'>
    <UserProvider>
      <App />
    </UserProvider>
  </StripeProvider>,
  document.getElementById('root'),
);
