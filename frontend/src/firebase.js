// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnI5m9QK-IlSOXwf5s08_LiHVWUYfiG-Y",
  authDomain: "forkids-4f02d.firebaseapp.com",
  projectId: "forkids-4f02d",
  storageBucket: "forkids-4f02d.firebasestorage.app",
  messagingSenderId: "275182835069",
  appId: "1:275182835069:web:191d3715b4768ffc8e6814",
  measurementId: "G-NVNLW0WV3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);