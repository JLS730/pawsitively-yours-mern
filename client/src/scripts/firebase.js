import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import {} from 'dotenv'

// dotenv.config({path: '../.env'})


export const firebaseConfig = {

  apiKey: 'AIzaSyAhBZYgbQ_pJt-ZIlF2fv7UZCyV_7aLtz4',

  authDomain: "pawsitively-yours-d9dc5.firebaseapp.com",

  projectId: "pawsitively-yours-d9dc5",

  storageBucket: "pawsitively-yours-d9dc5.appspot.com",

  messagingSenderId: "324151307643",

  appId: "1:324151307643:web:73f7c1b8cb57471fb221de",

  measurementId: "G-TRXWHYQJ0E"

};


const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);