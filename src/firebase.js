// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCFhG-g8ZIMvgIzu03ksait1AwoLNfe3fs",
  authDomain: "react-auth-1d91a.firebaseapp.com",
  projectId: "react-auth-1d91a",
  storageBucket: "react-auth-1d91a.appspot.com",
  messagingSenderId: "423817126799",
  appId: "1:423817126799:web:6895c32bb6158763e561fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;