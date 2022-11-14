import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcZOj20P59ZpNIORR1cS1V2N4TZ768lpo",
  authDomain: "reactchatv2-c3136.firebaseapp.com",
  projectId: "reactchatv2-c3136",
  storageBucket: "reactchatv2-c3136.appspot.com",
  messagingSenderId: "6685400058",
  appId: "1:6685400058:web:c1985db8e631cd79b76243",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
