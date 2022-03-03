import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "THIS_HAS_BEEN_REPLACED_FOR_PUBLIC_SAFETY_VIEW_DEPLOYED_APP_FOR_USAGE",
  authDomain: "clone-8b8f0.firebaseapp.com",
  projectId: "clone-8b8f0",
  storageBucket: "clone-8b8f0.appspot.com",
  messagingSenderId: "885325421454",
  appId: "1:885325421454:web:0aa62bacbd2f069d1722df",
  measurementId: "G-D4JTKS898D",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();
const auth = firebase.auth();

export { database, auth };
