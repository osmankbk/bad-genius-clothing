import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider 
} from 'firebase/auth';

import { 
  getFirestore ,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrOzdOb541XeL8BgQE16C0LVOyEBlAhbc",
  authDomain: "bad-genius-clothing-db.firebaseapp.com",
  projectId: "bad-genius-clothing-db",
  storageBucket: "bad-genius-clothing-db.firebasestorage.app",
  messagingSenderId: "695792766574",
  appId: "1:695792766574:web:479584a606a5d90e8fa07f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// Authenticate a User
export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

// Initialize Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);
  
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch(error) {
      console.log('error creating the user', error.message);
    }

    return userDocRef;
  }
  console.log (userSnapshot)
};