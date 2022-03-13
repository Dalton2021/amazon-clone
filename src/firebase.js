import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "THIS_HAS_BEEN_REPLACED_FOR_PUBLIC_SAFETY_VIEW_DEPLOYED_APP_FOR_USAGE",
  authDomain: "THIS_HAS_BEEN_REPLACED_FOR_PUBLIC_SAFETY_VIEW_DEPLOYED_APP_FOR_USAGE",
  projectId: "THIS_HAS_BEEN_REPLACED_FOR_PUBLIC_SAFETY_VIEW_DEPLOYED_APP_FOR_USAGE",
  storageBucket:"THIS_HAS_BEEN_REPLACED_FOR_PUBLIC_SAFETY_VIEW_DEPLOYED_APP_FOR_USAGE",
  messagingSenderId:"THIS_HAS_BEEN_REPLACED_FOR_PUBLIC_SAFETY_VIEW_DEPLOYED_APP_FOR_USAGE",
  appId: "THIS_HAS_BEEN_REPLACED_FOR_PUBLIC_SAFETY_VIEW_DEPLOYED_APP_FOR_USAGE",
  measurementId: "THIS_HAS_BEEN_REPLACED_FOR_PUBLIC_SAFETY_VIEW_DEPLOYED_APP_FOR_USAGE",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();
const auth = firebase.auth();

export { database, auth };
