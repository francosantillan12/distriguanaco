// ItemListContainer.jsx
import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { getItems } from "../firebase/db.js"; // importante la extensión .js
import withLoading from "./hoc/withLoading";

const ItemListWithLoading = withLoading(ItemList);

function ItemListContainer({ mensaje = "" }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    getItems()
      .then((productos) => {
        // mantenemos tu delay para el loading del HOC
        setTimeout(() => setItems(productos), 800);
      })
      .catch((err) => {
        console.error("Error al traer productos desde Firestore:", err);
        setItems([]);
        setError("No se pudieron cargar los productos.");
      });
  }, []);

  return (
    <>
      {error ? <p className="text-danger">{error}</p> : null}
      <ItemListWithLoading items={items} mensaje={mensaje} />
    </>
  );
}

export default ItemListContainer;


