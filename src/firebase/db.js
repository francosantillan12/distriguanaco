import { getFirestore, collection, getDocs, query, where, doc, getDoc, addDoc } from "firebase/firestore";
import { app } from "./config.js"; 




const db = getFirestore(app);

export const getItems = async () => {
  const snapshot = await getDocs(collection(db, "items"));
  const items = [];

  snapshot.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
  return items;
};

export const getCategorias = async () => {
  const snapshot = await getDocs(collection(db, "categorias"));
  const categorias = [];

  snapshot.forEach((doc) => categorias.push({ ...doc.data(), id: doc.id }));
  return categorias;
};

export const getItemsByCategory = async (categoria) => {
  const q = query(collection(db, "items"), where("categoria", "==", categoria));
  const items = []

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    items.push({...doc.data(), id: doc.id})
});
  return items
}


export const getItem = async (id) =>{
  const docRef = doc(db, "items", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {...docSnap.data(), id: docSnap.id}
  } else {    
    console.log("No such document!");
  }
}

export const createOrder = async (order) => {
  const docRef = await addDoc(collection(db, "orders"), order);
  console.log("Se creo un documento con el ID: ", docRef.id);
  return docRef.id; 
};



