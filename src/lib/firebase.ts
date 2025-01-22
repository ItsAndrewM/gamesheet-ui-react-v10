import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY || "AIzaSyAev_UVG0mYihi9fGgJ0spoAaWlClgl1T8",
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN || "gamesheet-v4-development-stack.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID || "gamesheet-v4-development-stack",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET || "gamesheet-v4-development-stack.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGESENDERID || "773167879850",
    appId: import.meta.env.VITE_FIREBASE_APPID || "1:773167879850:web:f0ed1618d0843866bb22d3",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID || "G-JMBSXEEXCW",
};

const app = (() => {
    if (getApps().length <= 0) {
        return initializeApp(firebaseConfig);
    } else {
        return getApp();
    }
})();

const db = getFirestore(app);

export { app, db };
