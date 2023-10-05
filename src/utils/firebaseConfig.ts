import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey : import.meta.env.VITE_REACT_APP_API_KEY
}



export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

