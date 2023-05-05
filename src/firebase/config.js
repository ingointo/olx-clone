import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAnp5kXTTtXYlwRxaeVyIBne4NiBlxEL3U",
    authDomain: "olx-clone-25a8b.firebaseapp.com",
    projectId: "olx-clone-25a8b",
    storageBucket: "olx-clone-25a8b.appspot.com",
    messagingSenderId: "307964475314",
    appId: "1:307964475314:web:442cde4929037f913e96ab",
    measurementId: "G-96W0K4SGVV"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);



export default getFirestore(app);