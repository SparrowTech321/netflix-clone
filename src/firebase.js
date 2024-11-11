
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
          getAuth,
          signInWithEmailAndPassword, 
          signOut} from "firebase/auth";
import { addDoc,
         collection,
         getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBTrNeV2GP-biAEMb7X2ZGPm-ai4PtYCKE",
  authDomain: "netflix-clone-5775e.firebaseapp.com",
  projectId: "netflix-clone-5775e",
  storageBucket: "netflix-clone-5775e.firebasestorage.app",
  messagingSenderId: "680751967721",
  appId: "1:680751967721:web:471984cece896299c2af78"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=>{
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
    })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}


const login = async (email, password) =>{
  try {
      await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const logout = ()=>{
  signOut(auth);
}

export {auth, db, login, signup, logout};