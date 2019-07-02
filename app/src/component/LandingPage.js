import React from 'react';

const LandingPage = ({ navigate }) => {
  return (
    <>
      <h1>Welcome to Friend Lend!</h1>
      <div>
        <button onClick={() => navigate('/signup')}>Request Money</button>
        <p>or</p>
        <button onClick={() => navigate('/login')}>Log In</button>
      </div>
    </>
  );
};

export default LandingPage;
