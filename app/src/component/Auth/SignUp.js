import React, { useState, useContext } from 'react';
import { db, auth, firebase } from '../../firebase';

const SignUp = ({ navigate }) => {
  const [signupForm, setSignupForm] = useState({
    displayName: '',
    email: '',
    password: '',
  });

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
      navigate('/SetUpLoan');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignInWithGoogle = async e => {
    e.preventDefault();
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth().signInWithPopup(provider);
      navigate('/SetUpLoan');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2>SignUp Page</h2>
      <form onSubmit={handleSignUp}>
        <input
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
    </>
  );
};

export default SignUp;
