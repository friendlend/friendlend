import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { db } from '../firebase';
import { useUser } from '../context/auth-context';

const Loan = ({ loanId }) => {
  const [loan, setLoan] = useState(null);

  const user = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const loanRef = await db.doc(`/loans/${loanId}`).get();
      const loanInfo = loanRef.data();
      const borrower = await loanRef.data().borrower.get();
      const lender = await loanRef.data().lender.get();
      loanInfo.borrower = borrower.data();
      loanInfo.lender = lender.data();
      setLoan(() => loanInfo);
    };
    fetchData();
  }, [loanId]);
  return loan ? (
    <LoanInfoPage>
      <h2>Loan Details</h2>
      <table>
        <tbody>
          <tr>
            <td>Requested by</td>
            <td>{loan.borrower.displayName}</td>
          </tr>
          <tr>
            <td>Requested on</td>
            <td>
              {moment(loan.createdDate, 'X').format('dddd, MMMM Do, YYYY')}
            </td>
          </tr>
          <tr>
            <td>Lender</td>
            <td>{loan.lender.displayName}</td>
          </tr>
          <tr>
            <td>Loan fulfilled on</td>
            <td>
              {moment(loan.lendingDate, 'X').format('dddd, MMMM Do, YYYY')}
            </td>
          </tr>
          <tr>
            <td>Amount Borrowed</td>
            <td>${(loan.total / 100).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Due Date</td>
            <td>{moment(loan.dueDate, 'X').format('dddd, MMMM Do, YYYY')}</td>
          </tr>
        </tbody>
      </table>
    </LoanInfoPage>
  ) : (
    <p>Loading...</p>
  );
};

export default Loan;

const LoanInfoPage = styled.main`
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
`;
