import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/database'
import {getDatabase} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVNPZBwgpooZ-kuQ0klx7H7WUO-s2nIFs",
  authDomain: "stm-app-42e66.firebaseapp.com",
  databaseURL: 'https://stm-app-42e66-default-rtdb.firebaseio.com',
  projectId: "stm-app-42e66",
  storageBucket: "stm-app-42e66.appspot.com",
  messagingSenderId: "500455605579",
  appId: "1:500455605579:web:06d77055dcbfb19d7754ce"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const dataabse = getDatabase(app);