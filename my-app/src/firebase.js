
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  rules_version = '2';
  service firebase.storage {
    match /b/{ bucket } /o {
match / { allPaths=**} {
      allow read, write;
}
  }
}
}