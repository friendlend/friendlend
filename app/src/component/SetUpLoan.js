import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import ReactNumeric from 'react-numeric';
import moment from 'moment';
import styled from 'styled-components';
import { useUser } from '../context/auth-context';
import { db } from '../firebase';

const SetUpLoan = ({ navigate }) => {
  const { user } = useUser();
  const [loanInfo, setLoanInfo] = useState({
    loanAmount: 10000,
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
    const loan = await db.collection('loans').doc();
    await db.doc(`loans/${loan.id}`).set({
      amount: loanInfo.loanAmount,
      total: loanInfo.loanAmount * 1.05,
      createdDate: moment().toDate(),
      dueDate: loanInfo.selectedDay,
      borrower: db.doc(`users/${user.uid}`),
      loanStatus: 'pending',
      autoPay: loanInfo.autoPay,
    });
    const loanId = loan.id;
    navigate('/cardform', { state: { loanId } });
  };

  return (
    <LoanForm onSubmit={handleSubmit}>
      <h2>Let us know the details of your loan...</h2>
      <p>How much do you need to borrow?</p>
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
      <p>When can you pay it back?</p>
      <DatePicker
        id='selectedDay'
        value={loanInfo.selectedDay}
        onChange={handleDayClick}
      />
      <div className='auto-pay'>
        <p>
          We auto draft your account to pay back your lender on the day you
          selected. Is that fine?
        </p>
        <label className='switch'>
          <input
            type='checkbox'
            id='autoPay'
            onChange={handleCheckbox}
            checked={loanInfo.autoPay}
          />

          <span className='slider'></span>
        </label>
      </div>
      <button type='submit'>Continue</button>
    </LoanForm>
  );
};

export default SetUpLoan;

const LoanForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  padding: 20px;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  input[id='loanAmount'] {
    width: 25%;
    height: 30px;
    font-size: 1.8rem;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid black;
    border-radius: 5px;
  }

  .react-date-picker {
    width: 25%;
  }

  .react-date-picker__wrapper {
    width: 100%;
    height: 30px;
    font-size: 1.8rem;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid black;
    border-radius: 5px;
  }

  .react-date-picker__inputGroup {
    justify-content: center;
  }

  .react-date-picker__button {
    padding: 0 6px;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border: 1px solid black;
      border-radius: 5px;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 3px;
      font-size: 1.5rem;
      color: black;
      content: 'No';
      display: flex;
      justify-content: center;
      align-items: center;
    }

    input:checked + .slider {
      background-color: white;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
      background-color: green;
      color: white;
      font-size: 1.3rem;
      content: 'Yes';
    }
  }

  button[type='submit'] {
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
  }

  .auto-pay {
    width: 25%;
    display: flex;
    align-items: center;
    margin: 10px;
    p {
      width: 80%;
    }
  }
`;
