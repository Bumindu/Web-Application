import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBKdVRqGZucvxr8GAEEoHhkSmcdp87A1WY",
  authDomain: "alexa-b40d1.firebaseapp.com",
  projectId: "alexa-b40d1",
  storageBucket: "alexa-b40d1.firebasestorage.app",
  messagingSenderId: "193225163622",
  appId: "1:193225163622:web:702ab2a9a98b1b37ad3ea7",
  measurementId: "G-N1Q4PC34R4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 