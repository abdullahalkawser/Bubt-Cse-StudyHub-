// ./service/authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const authService = {
  registerUser: async (formData) => {
    const { email, password, fullName, username, department, semester } = formData;

    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, 'users', res.user.uid), {
      fullName,

      department,
      semester,
      email
    });

    return res.user;
  },

  loginUser: async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  }
};

export default authService;
