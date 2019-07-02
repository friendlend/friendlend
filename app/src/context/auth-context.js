import React from 'react';
import { db, auth, firebase } from '../firebase';

const UserContext = React.createContext();

export function fetchDoc(path) {
  return db
    .doc(path)
    .get()
    .then(doc => doc.data());
}

export function fetchUser(uid) {
  return fetchDoc(`users/${uid}`);
}
export function signout() {
  auth().signOut();
  window.localStorage.removeItem('user');
  window.location.href = '/';
}

export function UserProvider(props) {
  const user = useAuth();
  return <UserContext.Provider value={{ user }} {...props} />;
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be rendered within a UserProvider`);
  }
  return context;
}

function useAuth() {
  const [user, setUser] = React.useState(
    JSON.parse(window.localStorage.getItem('user') || null),
  );
  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const currentUser = await fetchUser(firebaseUser.uid);
        if (currentUser) {
          setUser(currentUser);
          window.localStorage.setItem('user', JSON.stringify(currentUser));
        } else if (firebaseUser) {
          const newUser = {
            displayName: firebaseUser.displayName,
            photoUrl: firebaseUser.photoURL,
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            createdDate: new Date(),
          };
          setUser(newUser);
          window.localStorage.setItem('user', JSON.stringify(newUser));
          await db.doc(`users/${firebaseUser.uid}`).set(newUser);
          const createStripeCustomer = firebase
            .functions()
            .httpsCallable('createStripeCustomer');

          await createStripeCustomer({
            email: firebaseUser.email,
            id: firebaseUser.uid,
            name: firebaseUser.displayName,
          });
        }
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
}
