// /src/firebase/config.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAdVPJRG0BpD3Fao16Xpzfk6vs4kR4riEc",
  authDomain: "distriguanaco-bd.firebaseapp.com",
  projectId: "distriguanaco-bd",
  storageBucket: "distriguanaco-bd.appspot.com",
  messagingSenderId: "334162582530",
  appId: "1:334162582530:web:6b769035bb278e9d365b1b",
};

// 🔑 ESTA LÍNEA ES CLAVE
export const app = initializeApp(firebaseConfig);
