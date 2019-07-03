import React, { useState, useEffect } from 'react';
import moment from 'moment';
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
    <>
      <h2>{loan.borrower.displayName} is requesting a loan!</h2>
      <h3>Here are the details...</h3>
      <table>
        <tbody>
          <tr>
            <td>Amount Requested:</td>
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
      <h3>Can you help out?</h3>
      <button onClick={handleAccept}>Send money</button>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default LoanRequest;
