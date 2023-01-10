import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDSi8a2HYGPEBoHXcwqwk0eh0N_wEeUaig",
  authDomain: "rtk-blog-7a4bb.firebaseapp.com",
  projectId: "rtk-blog-7a4bb",
  storageBucket: "rtk-blog-7a4bb.appspot.com",
  messagingSenderId: "501601035483",
  appId: "1:501601035483:web:69aa5744863474dcecd8fe"
};

const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const storage =  getStorage(app)