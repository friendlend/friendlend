import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyAjKYS0oll7dqRGOc4XiogJndvS5PSqP28',
  authDomain: 'friend-lend-app.firebaseapp.com',
  databaseURL: 'https://friend-lend-app.firebaseio.com',
  projectId: 'friend-lend-app',
  storageBucket: 'friend-lend-app.appspot.com',
  messagingSenderId: '515394700208',
  appId: '1:515394700208:web:18c4db39c9bad16b',
};

firebase.initializeApp(firebaseConfig);
const functions = firebase.functions();
const db = firebase.firestore();
const auth = () => firebase.auth();

export { db, firebase, auth, functions };
