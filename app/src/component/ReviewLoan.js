import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
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
    <ReviewLoanPage>
      <h2>Review Loan Details</h2>
      <table>
        <tbody>
          <tr>
            <td>Amount Requested:</td>
            <td>${(loan.amount / 100).toFixed(2)}</td>
          </tr>
          <tr>
            <td>FriendLend Fee (5%)</td>
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
    </ReviewLoanPage>
  ) : (
    <p>Loading...</p>
  );
};

export default ReviewLoan;

const ReviewLoanPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  table {
    font-size: 1.8rem
    width: 45%;
    height: 200px;
    margin: 10px;
    td:first-child {
      text-align: right;
      padding-right: 5px;
    }
    td:last-child {
      padding-left: 5px;
    }
  }

  button {
    cursor: pointer;
    width: 25%;
    height: 30px;
    font-size: 1.8rem;
    margin-bottom: 10px;
    border: 1px solid black;
    border-radius: 5px;
    background: black;
    color: white;
    transition: all 200ms linear;
    &:hover {
      background: white;
      color: black;
    }
`;
