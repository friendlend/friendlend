import React from 'react';
import {
  CardElement,
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements';
import styled from 'styled-components';
import { firebase } from '../../firebase';
import { useUser } from '../../context/auth-context';

const CheckoutForm = props => {
  const { stripe, location, navigate } = props;
  const { user } = useUser();

  const loanId = location && location.state ? location.state.loanId : null;

  const submit = async ev => {
    ev.preventDefault();

    const { token } = await stripe.createToken({ currency: 'usd' });

    const createStripeCard = firebase
      .functions()
      .httpsCallable('createStripeCard');

    const stripeResponse = await createStripeCard({
      token: token.id,
      stripeId: user.stripeId,
      token: token.id,
      id: user.uid,
    });

    console.log(token);

    if (stripeResponse.data.success) {
      loanId ? navigate(`/review/${loanId}`) : navigate('/');
    } else {
      console.log(stripeResponse);
    }
  };

  const payLoanSubmit = async e => {
    e.preventDefault();

    const { token } = await stripe.createToken({ currency: 'usd' });

    const payLoan = firebase.functions().httpsCallable('payLoan');

    const stripeResponse = await payLoan({
      loanId,
      token: token.id,
      stripeId: user.stripeId,
      userId: user.uid,
    });

    console.log(stripeResponse);
  };

  if (location.pathname === '/cardform') {
    return (
      <CardPage>
        <h2>Where should we send the money?</h2>
        <p>
          Please note that we can only send money to debit cards at this time
        </p>
        <div style={{ width: '45%' }}>
          <CardElement
            style={{
              base: {
                fontSize: '1.5rem',
                letterSpacing: '0.025em',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            }}
          />
        </div>
        <button onClick={submit}>Send</button>
      </CardPage>
    );
  } else if (location.pathname.includes('/payloan')) {
    return (
      <CardPage>
        <h2>You're SUCH a good person</h2>
        <CardElement />
        <button onClick={payLoanSubmit}>Send</button>
      </CardPage>
    );
  }
};

export default injectStripe(CheckoutForm);

const CardPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  p {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  button {
    cursor: pointer;
    width: 25%;
    height: 30px;
    font-size: 1.8rem;
    margin: 20px;
    border: 1px solid black;
    border-radius: 5px;
    background: black;
    color: white;
    transition: all 200ms linear;
    &:hover {
      background: white;
      color: black;
    }
  }
`;
