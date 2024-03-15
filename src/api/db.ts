import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClX8TPT3VV9Cowzn8xaYb--6VnTxlX2m8",
  authDomain: "test-qpp-254bf.firebaseapp.com",
  projectId: "test-qpp-254bf",
  storageBucket: "test-qpp-254bf.appspot.com",
  messagingSenderId: "692423326823",
  appId: "1:692423326823:web:bbf22615b071bdbbc2a8c2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;