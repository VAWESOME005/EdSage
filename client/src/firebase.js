// Import the functions you need from the SDKs you need
import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcj0JeZGmqUC6iB4JuWJ2z02AP0e0kP8w",
  authDomain: "peddie-a4afe.firebaseapp.com",
  projectId: "peddie-a4afe",
  storageBucket: "peddie-a4afe.appspot.com",
  messagingSenderId: "615493120652",
  appId: "1:615493120652:web:e475ebc3c0fa86962481a9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
