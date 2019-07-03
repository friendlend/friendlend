import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
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
      <div className='checkout'>
        <p>Where should we send the money?</p>
        <CardElement style={{ fontSize: '2rem' }} />
        <button onClick={submit}>Send</button>
      </div>
    );
  } else if (location.pathname.includes('/payloan')) {
    return (
      <div className='checkout'>
        <p>You're SUCH a good person</p>
        <CardElement style={{ fontSize: '2rem' }} />
        <button onClick={payLoanSubmit}>Send</button>
      </div>
    );
  }
};

export default injectStripe(CheckoutForm);
