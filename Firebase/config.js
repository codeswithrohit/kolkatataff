import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
    //Paste Your firebase config here
   
    apiKey: "AIzaSyB_lpYkL9EryBNF6jUqW984IFWJlB3YFxw",
    authDomain: "kokataffes.firebaseapp.com",
    projectId: "kokataffes",
    storageBucket: "kokataffes.appspot.com",
    messagingSenderId: "778361386398",
    appId: "1:778361386398:web:34513f059631c8dda7128f"
    
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }



