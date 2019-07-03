import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useUser } from '../context/auth-context';
import { db } from '../firebase';

const ReviewLoan = ({ loanId, navigate }) => {
  const { user } = useUser();

  const [loan, setLoan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const loan = await db.doc(`loans/${loanId}`).get();
      setLoan(loan.data());
    };
    fetchData();
    console.log(loan);
  }, [loanId]);

  return loan ? (
    <>
      <h2>Review Loan Details</h2>
      <table>
        <tbody>
          <tr>
            <td>Amount Requested:</td>
            <td>${(loan.amount / 100).toFixed(2)}</td>
          </tr>
          <tr>
            <td>FriendLend Fee (15%)</td>
            <td>${((loan.total - loan.amount) / 100).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>${(loan.total / 100).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Payout Method</td>
            <td>
              {user.card.external_accounts.data[0].brand}
              &nbsp;ending in&nbsp;
              {user.card.external_accounts.data[0].last4}
            </td>
          </tr>
          <tr>
            <td>Payback Date</td>
            <td>{moment(loan.dueDate, 'X').format('dddd, MMMM Do, YYYY')}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => navigate(`/request/${loanId}`)}>
        Looks good!
      </button>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default ReviewLoan;
