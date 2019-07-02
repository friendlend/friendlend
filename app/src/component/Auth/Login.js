import React, { useState } from 'react';
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
    <>
      <h2>Login Page</h2>
      <form onSubmit={handleSignIn}>
        <input id='email' onChange={handleChanges} type='email' />
        <input id='password' onChange={handleChanges} type='password' />
        <button type='submit'>Log In</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </>
  );
};

export default Login;
