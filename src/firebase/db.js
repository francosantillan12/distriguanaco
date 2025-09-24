import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./config.js"; // solo este import

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
