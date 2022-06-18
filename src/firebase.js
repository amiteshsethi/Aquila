// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfjWawraR14FwvqwP5WJcaSNZ3cMaVr8I",
  authDomain: "aquilabyamitesh.firebaseapp.com",
  projectId: "aquilabyamitesh",
  storageBucket: "aquilabyamitesh.appspot.com",
  messagingSenderId: "548916184861",
  appId: "1:548916184861:web:a0dec72a111e313bb6c3f4",
  measurementId: "G-18Y5NS9R7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);