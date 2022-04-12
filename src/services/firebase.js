import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyADZ1Yx_RJecyHfqymZAz4_3uwajZuZ-jk",
  authDomain: "bitmanager-bc603.firebaseapp.com",
  projectId: "bitmanager-bc603",
  storageBucket: "bitmanager-bc603.appspot.com",
  messagingSenderId: "6515697074",
  appId: "1:6515697074:web:be4a826b7ee9063b92f0ab"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const getProducts = async () => {
  try {
    let docsObject = [];
    const docs = await getDocs(collection(db, 'Productos'));
    docs.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let item = { id: doc.id, ...doc.data() };
      docsObject.push(item);
    });
    return docsObject;
  } catch (error) {
    console.log(error);
  }
};

export { auth, db, signInWithGoogle, signInWithEmailAndPassword, sendPasswordReset, logout, getProducts };
