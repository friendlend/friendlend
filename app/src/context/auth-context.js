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
export const signout = auth().signOut;

export function UserProvider(props) {
	const user = useAuth();
	const handleGoogleSignIn = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		try {
			await firebase.auth().signInWithPopup(provider);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<UserContext.Provider value={{ user, handleGoogleSignIn }} {...props} />
	);
}

export function useUser() {
	const context = React.useContext(UserContext);
	if (context === undefined) {
		throw new Error(`useUser must be rendered within a UserProvider`);
	}
	return context;
}
const storedUser = JSON.parse(localStorage.getItem('user'));
function useAuth() {
	const [user, setUser] = React.useState(
		JSON.parse(window.localStorage.getItem('user') || null)
	);
	React.useEffect(() => {
		return firebase.auth().onAuthStateChanged(async firebaseUser => {
			if (firebaseUser) {
				const updatedUser = await fetchUser(firebaseUser.uid);
				if (updatedUser) {
					const currentUser = {
						...updatedUser,
					};
					setUser(currentUser);
					window.localStorage.setItem('user', JSON.stringify(currentUser));
					db.collection('users')
						.doc(currentUser.uid)
						.set(currentUser, { merge: true });
				} else if (firebaseUser) {
					const newUser = {
						displayName: firebaseUser.displayName,
						photoUrl: firebaseUser.photoURL,
						uid: firebaseUser.uid,
						email: firebaseUser.email,
					};
					setUser(newUser);
					window.localStorage.setItem('user', JSON.stringify(newUser));
					db.collection('users')
						.doc(newUser.uid)
						.set(newUser, { merge: true });
				}
			} else {
				setUser(null);
			}
		});
	}, []);
	return user;
}
