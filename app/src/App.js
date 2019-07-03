import React from 'react';
import AuthenticatedApp from './authenticated-app';
import UnAuthenticatedApp from './unauthenticated-app';
import { useUser } from './context/auth-context';
function App() {
  const { user } = useUser();
  console.log(user, 'user');
  let testin = true;
  return testin ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
}

export default App;
