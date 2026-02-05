import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { 
  getFirestore ,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
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
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Authenticate a User
export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);

// Initialize Database
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })

  await batch.commit();
  console.log('Done');
}

export const getCategoriesAndDocuments = async (collectionKey) => {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapShot) => docSnapShot.data());
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  // get snapshot
  let userSnapshot = await getDoc(userDocRef);

  // if doc doesn't exist, create it then re-fetch snapshot
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });

      userSnapshot = await getDoc(userDocRef); 
    } catch (error) {
      console.log("error creating the user", error.message);
      return; // bail if create failed
    }
  }

  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
   return await createUserWithEmailAndPassword(auth, email, password);
}

export const signAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
   return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (authUser) => {
        unsubscribe();
        resolve(authUser);
      },
      reject
    );
  });
};
