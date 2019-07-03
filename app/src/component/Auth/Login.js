import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { firebase } from '../../firebase';

const Login = ({ navigate }) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleChanges = e => {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignIn = async e => {
    e.preventDefault();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(loginForm.email, loginForm.password);
      setLoginForm({ email: '', password: '' });
      setTimeout(() => {
        navigate(`/dashboard`);
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleSignIn = async e => {
    e.preventDefault();
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      setLoginForm({ email: '', password: '' });
      setTimeout(() => {
        navigate(`/dashboard`);
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginPage>
      <h2>Login to Your FriendLend Account</h2>
      <form onSubmit={handleSignIn}>
        <input
          placeholder='Email address'
          id='email'
          onChange={handleChanges}
          type='email'
        />
        <input
          placeholder='Password'
          id='password'
          onChange={handleChanges}
          type='password'
        />
        <button type='submit'>Log In</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <br />
      <br />
      <p>
        Don't have an account? <Link to='/signup'>Create one here</Link>
      </p>
    </LoginPage>
  );
};

export default Login;

const LoginPage = styled.main`
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
