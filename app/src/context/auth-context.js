import React from 'react';
import { db, auth, firebase } from './firebase';
const UserContext = React.createContext();

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
	const [user, setUser] = React.useState(storedUser);
	React.useEffect(() => {
		return auth().onAuthStateChanged(auth => {
			if (auth) {
				const { displayName, photoURL, uid } = auth;
				const user = {
					displayName,
					photoURL,
					uid,
				};
				localStorage.setItem('user', JSON.stringify(user));
				setUser(user);
				db.collection('users')
					.doc(user.uid)
					.set(user, { merge: true });
			} else {
				setUser(null);
			}
		});
	}, []);
	return user;
}
