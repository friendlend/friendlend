import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import './setUpLoan.css';
import ReactNumeric from 'react-numeric';
import moment from 'moment';
import { useUser } from './context/auth-context';
import { db } from './firebase';

const SetUpLoan = ({ navigate }) => {
  const { user } = useUser();
  const [loanInfo, setLoanInfo] = useState({
    loanAmount: 5000,
    selectedDay: moment()
      .add(2, 'w')
      .toDate(),
    autoPay: true,
  });

  const handleDayClick = day => {
    setLoanInfo({
      ...loanInfo,
      selectedDay: day,
    });
  };

  const handleChanges = e => {
    const value =
      e.target.id === 'loanAmount'
        ? parseFloat(e.target.value.replace(/\$|,/g, '')) * 100
        : e.target.value;
    setLoanInfo({
      ...loanInfo,
      [e.target.id]: value,
    });
  };

  const handleCheckbox = e => {
    if (e.target.checked) {
      setLoanInfo({ ...loanInfo, autoPay: true });
    } else {
      setLoanInfo({ ...loanInfo, autoPay: false });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await db
      .collection('loans')
      .doc()
      .set({
        amount: loanInfo.loanAmount,
        total: loanInfo.loanAmount * 1.15,
        createdDate: moment().toDate(),
        dueDate: loanInfo.selectedDay,
        borrower: db.doc(`users/${user.uid}`),
        loanStatus: 'active',
        autoPay: loanInfo.autoPay,
      });
    navigate('/cardform');
  };

  return (
    <form className='center' onSubmit={handleSubmit}>
      <p>Loan Amount:</p>
      <ReactNumeric
        value={loanInfo.loanAmount / 100}
        preDefined={{
          allowDecimalPadding: true,
          currencySymbol: '$',
          decimalPlaces: 2,
          maximumValue: '5000',
          minimumValue: '0',
          outputFormat: 'number',
          unformatOnSubmit: true,
        }}
        id='loanAmount'
        onChange={handleChanges}
      />
      <p>Loan Pay Back Date:</p>
      <DatePicker
        id='selectedDay'
        value={loanInfo.selectedDay}
        onChange={handleDayClick}
      />
      <div className='checkBox'>
        <p>Have loan automatically paid back on selected date?</p>
        <input
          type='checkbox'
          id='autoPay'
          onChange={handleCheckbox}
          checked={loanInfo.autoPay}
        />
      </div>
      <button type='submit'>Continue</button>
    </form>
  );
};

export default SetUpLoan;
