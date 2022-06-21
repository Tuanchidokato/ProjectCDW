import firebase from "firebase/compat/app"
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBZj20sulrapVDHGf6uYTTgaOPMJqoXHvo",
    authDomain: "projectcdw-a2e62.firebaseapp.com",
    projectId: "projectcdw-a2e62",
    storageBucket: "projectcdw-a2e62.appspot.com",
    messagingSenderId: "469612718748",
    appId: "1:469612718748:web:42a35cce75936e9eed5b59",
    measurementId: "G-LXNH6VQD50"
  };


  firebase.initializeApp(firebaseConfig)
  const storage = firebase.storage();
  export {storage, firebase as default};