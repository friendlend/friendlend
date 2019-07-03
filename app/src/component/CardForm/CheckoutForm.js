import React, { useState, useEffect } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import styled from 'styled-components';
import moment from 'moment';
import { firebase, db } from '../../firebase';
import { useUser } from '../../context/auth-context';

const CheckoutForm = props => {
  const [loan, setLoan] = useState(null);
  const { stripe, location, navigate } = props;
  const { user } = useUser();

  const loanId = location && location.state ? location.state.loanId : null;

  useEffect(() => {
    const fetchData = async () => {
      const loanRef = await db.doc(`/loans/${loanId}`).get();
      const loanInfo = loanRef.data();
      const borrower = await loanRef.data().borrower.get();
      loanInfo.borrower = borrower.data();
      setLoan(() => loanInfo);
    };
    fetchData();
  }, [loanId]);

  const submit = async ev => {
    ev.preventDefault();

    const { token } = await stripe.createToken({ currency: 'usd' });

    const createStripeCard = firebase
      .functions()
      .httpsCallable('createStripeCard');

    const stripeResponse = await createStripeCard({
      token: token.id,
      stripeId: user.stripeId,
      id: user.uid,
    });
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
    navigate(`/loan/${loanId}`);
  };

  if (location.pathname === '/cardform') {
    return (
      <CardPage>
        <h2>Where should we send the money?</h2>
        <p>
          Please note that we can only send money to debit cards at this time
        </p>
        <div style={{ width: '100%', margin: '10px' }}>
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
    return loan ? (
      <CardPage>
        <h2>You're SUCH a good person</h2>
        <p>
          {loan.borrower.displayName}'s day is really going to be made by your
          generosity.
        </p>
        <p>
          As a reminder, this loan is for $${(loan.total / 100).toFixed(2)} and
          is scheduled to be paid back on{' '}
          {moment(loan.dueDate, 'X').format('dddd, MMMM Do, YYYY')}
        </p>
        <div style={{ width: '100%', margin: '10px' }}>
          <CardElement />
        </div>
        <button onClick={payLoanSubmit}>Send</button>
      </CardPage>
    ) : (
      <p>Loading...</p>
    );
  }
};

export default injectStripe(CheckoutForm);

const CardPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  width: 50%;
  margin: 0 auto;
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
