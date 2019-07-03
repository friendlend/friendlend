import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { db } from '../firebase';
import { useUser } from '../context/auth-context';

const LoanRequest = ({ loanId, navigate }) => {
  const [loan, setLoan] = useState(null);
  const { user } = useUser();

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

  const handleAccept = e => {
    e.preventDefault();
    user
      ? navigate(`/payloan/${loanId}`, { state: { loanId } })
      : navigate('/signup', { state: { loanId } });
  };

  return loan ? (
    <ReviewLoanPage>
      <h2>
        <span role='img' aria-label='money with wings emoji'>
          &#x1F4B8;
        </span>{' '}
        <span role='img' aria-label='money with wings emoji'>
          &#x1F4B8;
        </span>{' '}
        <span role='img' aria-label='money with wings emoji'>
          &#x1F4B8;
        </span>{' '}
        {loan.borrower.displayName} is requesting a loan!
        <span role='img' aria-label='money with wings emoji'>
          &#x1F4B8;
        </span>{' '}
        <span role='img' aria-label='money with wings emoji'>
          &#x1F4B8;
        </span>{' '}
        <span role='img' aria-label='money with wings emoji'>
          &#x1F4B8;
        </span>
      </h2>
      <h3>Here are the details...</h3>
      <table>
        <tbody>
          <tr>
            <td>Amount Requested</td>
            <td>${(loan.total / 100).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Payback Date</td>
            <td>{moment(loan.dueDate, 'X').format('dddd, MMMM Do, YYYY')}</td>
          </tr>
          <tr>
            <td>AutoPay?</td>
            <td>{loan.autoPay ? 'Turned on' : 'Turned off'}</td>
          </tr>
        </tbody>
      </table>
      <h3>
        <span role='img' aria-label='praying hands emoji'>
          &#x1F4B8;
        </span>{' '}
        Can you help out?{' '}
        <span role='img' aria-label='praying hands emoji'>
          &#x1F4B8;
        </span>
      </h3>
      <button onClick={handleAccept}>Send money</button>
    </ReviewLoanPage>
  ) : (
    <p>Loading...</p>
  );
};

export default LoanRequest;

const ReviewLoanPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  h3 {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  table {
    font-size: 1.8rem
    width: 45%;
    height: 100px;
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
