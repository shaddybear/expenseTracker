// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeAuth, getReactNativePersistence} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD732yWrUv4m-l8jMi8ARuFODbiNhtRQRM",
  authDomain: "expense-tracker-4f84c.firebaseapp.com",
  projectId: "expense-tracker-4f84c",
  storageBucket: "expense-tracker-4f84c.firebasestorage.app",
  messagingSenderId: "370899744198",
  appId: "1:370899744198:web:46ffd60cc8dc7b58816ec7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

// db
export const firestore = getFirestore(app)