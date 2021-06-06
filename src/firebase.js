import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBJtB0jo7zHI3lz9IwnWF6ABGwAGZ5eb98",
    authDomain: "restaurant-1d0d7.firebaseapp.com",
    projectId: "restaurant-1d0d7",
    storageBucket: "restaurant-1d0d7.appspot.com",
    messagingSenderId: "484213199598",
    appId: "1:484213199598:web:33ff6370a33d1bfb1f99ff"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const addOrder = (user, burgers) => {
    firestore.collection("orders").add({
        owner: user.uid,
        dataCreated: firebase.firestore.FieldValue.serverTimestamp(),
        orderList: burgers
    })
}