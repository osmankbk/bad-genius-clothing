import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider 
} from 'firebase/auth';


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
console.log(firebaseApp);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// Authenticate a User
export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
