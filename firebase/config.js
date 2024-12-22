// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8h9O8cxZV09EX6eSTnxdKvPd15l6bchc",
    authDomain: "pranami-vishwa-portal.firebaseapp.com",
    databaseURL:
        "https://pranami-vishwa-portal-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pranami-vishwa-portal",
    storageBucket: "pranami-vishwa-portal.appspot.com",
    messagingSenderId: "588498938274",
    appId: "1:588498938274:web:ac3494e80133777f4f6afb",
    measurementId: "G-FVZMYF3EM6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

