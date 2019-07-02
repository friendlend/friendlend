// MyStoreCheckout.js
import React from 'react';
import { Elements } from 'react-stripe-elements';
import { Location } from '@reach/router';
import CheckoutForm from './CheckoutForm';

class CheckoutPage extends React.Component {
  render() {
    return (
      <Location>
        {({ location, navigate }) => (
          <Elements>
            <CheckoutForm location={location} navigate={navigate} />
          </Elements>
        )}
      </Location>
    );
  }
}

export default CheckoutPage;
