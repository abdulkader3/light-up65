// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC49pmw84WCNwDjo3HUITrANmPOgCNvyTc",
  authDomain: "chating-app-with-nusrin-apu.firebaseapp.com",
  databaseURL: "https://chating-app-with-nusrin-apu-default-rtdb.firebaseio.com",
  projectId: "chating-app-with-nusrin-apu",
  storageBucket: "chating-app-with-nusrin-apu.appspot.com",
  messagingSenderId: "171040790788",
  appId: "1:171040790788:web:7e874f57d0d88ca7ef5851",
  measurementId: "G-CTG7E73FL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default (app);