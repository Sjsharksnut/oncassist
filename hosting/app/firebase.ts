import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQqgxm0_ltJXkCo04rwP6vwy9dDF9Lerk",
    authDomain: "baileymendel-firebase.firebaseapp.com",
    projectId: "baileymendel-firebase",
    storageBucket: "baileymendel-firebase.appspot.com",
    messagingSenderId: "911642228814",
    appId: "1:911642228814:web:c3f95f6a904d2b8e26eb1f",
    measurementId: "G-EH58G100PY"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
