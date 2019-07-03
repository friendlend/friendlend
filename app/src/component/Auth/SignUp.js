import React, { useState } from 'react';
import { Link } from '@reach/router';
import { auth, firebase } from '../../firebase';
import styled from 'styled-components';

const SignUp = ({ navigate, location }) => {
  const [signupForm, setSignupForm] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  const loanId = location && location.state ? location.state.loanId : null;

  const handleChanges = e => {
    setSignupForm({
      ...signupForm,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignUp = async e => {
    e.preventDefault();
    try {
      const { user } = await auth().createUserWithEmailAndPassword(
        signupForm.email,
        signupForm.password,
      );
      await user.updateProfile({
        displayName: signupForm.displayName,
        photoUrl: 'https://placekitten.com/400/400',
      });
      loanId
        ? navigate(`/payloan/${loanId}`, { state: { loanId } })
        : navigate('/newloan');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignInWithGoogle = async e => {
    e.preventDefault();
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth().signInWithPopup(provider);
      loanId
        ? navigate(`/payloan/${loanId}`, { state: { loanId } })
        : navigate('/newloan');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SignUpPage>
      <h2>Create Your FriendLend Account</h2>
      <form onSubmit={handleSignUp}>
        <input
          type='text'
          id='displayName'
          placeholder='Your full name'
          value={signupForm.displayName}
          onChange={handleChanges}
        />
        <input
          type='email'
          id='email'
          placeholder='Your email address'
          value={signupForm.email}
          onChange={handleChanges}
        />
        <input
          id='password'
          type='password'
          placeholder='Your password'
          value={signupForm.password}
          onChange={handleChanges}
        />
        <button type='submit'>Create Account</button>
      </form>
      <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
      <br />
      <br />
      <p>
        Already have an account? <Link to='/login'>Sign in here</Link>
      </p>
    </SignUpPage>
  );
};

export default SignUp;

const SignUpPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      width: 25%;
      height: 30px;
      font-size: 1.8rem;
      padding: 5px;
      margin-bottom: 10px;
      border: 1px solid black;
      border-radius: 5px;
    }
  }

  h2 {
    font-size: 2.5rem;
    margin: 25px;
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
  }

  p {
    font-size: 1.8rem;

    a {
      text-decoration: none;
      transition: all 200ms linear;
      color: green;
      font-weight: 600;

      &:hover {
        border-bottom: 2px dotted green;
      }
    }
  }
`;
