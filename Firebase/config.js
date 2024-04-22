import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
    //Paste Your firebase config here
   
    apiKey: "AIzaSyAcR30FwnoBOM1HXF9nPZV_gT5hcnaMo5U",
    authDomain: "sattamatka143mobi-596ed.firebaseapp.com",
    projectId: "sattamatka143mobi-596ed",
    storageBucket: "sattamatka143mobi-596ed.appspot.com",
    messagingSenderId: "931914547888",
    appId: "1:931914547888:web:bfc96b779e09c56ae6f175"
    
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }



