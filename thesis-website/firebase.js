import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyC2vt_wOW9FaY-XpftR6Mac4rrna7M2_sk",
    authDomain: "capstone-e6f46.firebaseapp.com",
    projectId: "capstone-e6f46",
    storageBucket: "capstone-e6f46.appspot.com",
    messagingSenderId: "683458610099",
    appId: "1:683458610099:web:b29156b120cbe74cefc1c6",
    measurementId: "G-F4TMM0M53Y"
  };

  firebase.initializeApp(firebaseConfig);
  
const db = firebase.firestore();
  
  export { db, firebase };