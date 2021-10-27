import firebase from 'firebase'
import 'firebase/firestore'
// require('dotenv').config({path : '../.env'})

const firebaseConfig = {
    apiKey: "AIzaSyCe6z09LFG-AjSN3zT6NxzxBQXvku00KHI",
    authDomain: "student-classroom-b828d.firebaseapp.com",
    projectId: "student-classroom-b828d",
    storageBucket: "student-classroom-b828d.appspot.com",
    messagingSenderId: "863995282597",
    appId: "1:863995282597:web:596afbbe84699b8fc6b94c"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage=firebase.storage();
const database=firebase.database();

export { auth, provider,storage,database };
export default db;
