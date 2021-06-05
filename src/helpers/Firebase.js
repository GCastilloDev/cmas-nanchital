import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXjpkhB5HcjP2L2GaeLdATgXnQGHkWmZw",
  authDomain: "cmas-nanchital.firebaseapp.com",
  projectId: "cmas-nanchital",
  storageBucket: "cmas-nanchital.appspot.com",
  messagingSenderId: "507166726593",
  appId: "1:507166726593:web:2ad31398c16047ef18f740",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
