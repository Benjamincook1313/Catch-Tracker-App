import firebase from 'firebase/app';
import 'firebase/storage';

const { KEY, ID, MSID} = process.env

var config = {
  apiKey: KEY,
  authDomain: "catch-tracker-8d2c5.firebaseapp.com",
  databaseURL: "https://catch-tracker-8d2c5.firebaseio.com",
  projectId: "catch-tracker-8d2c5",
  storageBucket: "gs://catch-tracker-8d2c5.appspot.com",
  messagingSenderId: MSID,
  appId: ID
};

// Initialize Firebase
firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default } ;