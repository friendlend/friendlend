import React from 'react';
import { db, auth, firebase } from '../firebase';
const UserContext = React.createContext();

export const signout = auth().signOut;
export function UserProvider(props) {
	const { user, setUser } = useAuth();
	const handleGoogleSignIn = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		try {
			await firebase.auth().signInWithPopup(provider);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<UserContext.Provider
			value={{ user, handleGoogleSignIn, setUser }}
			{...props}
		/>
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
	const [user, setUser] = React.useState(storedUser || null);
	React.useEffect(() => {
		return auth().onAuthStateChanged(async auth => {
			// Different auth providers return different data about a user
			// so I'm determining what kind of user we have by the displayName field (google)
			// and setting user info based on that.
			// for other info like name,preferences, etc. we'll have to update the user created here
			console.log(auth);
			if (auth) {
				const { displayName, email, photoURL, uid } = auth;
				if (displayName) {
					const googleUser = {
						displayName,
						photoURL,
						uid,
					};
					localStorage.setItem('user', JSON.stringify(googleUser));
					setUser(googleUser);
					db.collection('users')
						.doc(googleUser.uid)
						.set(googleUser, { merge: true });
				} else {
					const emailUser = { email, uid };
					localStorage.setItem('user', JSON.stringify(emailUser));
					setUser(emailUser);
					db.collection('users')
						.doc(emailUser.uid)
						.set(emailUser, { merge: true });
				}
			} else {
				setUser(null);
			}
		});
	}, []);
	return { user, setUser };
}
