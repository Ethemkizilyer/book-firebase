// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZTOyX8-oFwPBWwH72raVfD2y3K6XfQLE",
  authDomain: "vue3-293e6.firebaseapp.com",
  projectId: "vue3-293e6",
  storageBucket: "vue3-293e6.appspot.com",
  messagingSenderId: "261076791900",
  appId: "1:261076791900:web:62988612e23d3005912c99"
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);

export {fb}