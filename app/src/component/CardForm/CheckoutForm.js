import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { firebase } from '../../firebase';
import { useUser } from '../../context/auth-context';

const CheckoutForm = ({ stripe, location, navigate }) => {
  const { user } = useUser();

  const loanId = location && location.state ? location.state.loanId : null;

  const submit = async ev => {
    ev.preventDefault();

    const { token } = await stripe.createToken();

    const createStripeCard = firebase
      .functions()
      .httpsCallable('createStripeCard');

    const stripeResponse = await createStripeCard({
      stripeId: user.stripeId,
      token: token.id,
      id: user.uid,
    });

    if (stripeResponse.data.success) {
      loanId ? navigate(`/confirm/${loanId}`) : navigate('/');
    } else {
      console.log(stripeResponse);
    }
  };

  return (
    <div className='checkout'>
      <p>Where should we send the money?</p>
      <CardElement style={{ fontSize: '2rem' }} />
      <button onClick={submit}>Send</button>
    </div>
  );
};

export default injectStripe(CheckoutForm);
