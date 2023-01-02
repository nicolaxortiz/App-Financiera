import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function UseFireBase() {
  const firebaseCongif = {
    apiKey: "AIzaSyB664SjVlK0gDf8xxDblGGw4jYbZEa5bs0",
    authDomain: "app-financiera-62895.firebaseapp.com",
    projectId: "app-financiera-62895",
    storageBucket: "app-financiera-62895.appspot.com",
    messagingSenderId: "1050934168675",
    appId: "1:1050934168675:web:e79fb070c70ca00c1b7c56",
  };

  const app = initializeApp(firebaseCongif);

  const db = getFirestore(); //Base de datos
  const auth = getAuth(app); //Authentication

  return { db, auth };
}
