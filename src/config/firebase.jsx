// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnxLz2atSNJv5x-9lUN0D6p1lIC29hWZk",
    authDomain: "todoapp-react-bbe20.firebaseapp.com",
    projectId: "todoapp-react-bbe20",
    storageBucket: "todoapp-react-bbe20.appspot.com",
    messagingSenderId: "204543822557",
    appId: "1:204543822557:web:0367d72223063c6d37a934"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };