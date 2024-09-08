// app/firebase.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGoFobtWg4z_7YvzZYByznSMyPvbmpQUU",
  authDomain: "linknbio-a1173.firebaseapp.com",
  projectId: "linknbio-a1173",
  storageBucket: "linknbio-a1173.appspot.com",
  messagingSenderId: "1042638621757",
  appId: "1:1042638621757:web:0c12e5a1e31bc2e59eae54",
  measurementId: "G-435R869FGQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);