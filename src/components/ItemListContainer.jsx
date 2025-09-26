// src/components/ItemListContainer.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { getItems, getItemsByCategory } from "../firebase/db.js";
import withLoading from "./hoc/withLoading";




const ItemListWithLoading = withLoading(ItemList);

function ItemListContainer({ mensaje = "" }) {
  const { categoriaId } = useParams();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(function () {
    setError(null);
    setItems([]);

    const promesa = categoriaId
      ? getItemsByCategory(categoriaId)
      : getItems();

    promesa
      .then(function (productos) {
        setTimeout(() => setItems(productos || []), 800);
      })
      .catch(function (err) {
        console.error("Error al traer productos desde Firestore:", err);
        setItems([]);
        setError("No se pudieron cargar los productos.");
      });
  }, [categoriaId]);

  // manejo de error con if (return temprano)
  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return <ItemListWithLoading items={items} mensaje={mensaje} />;
}

export default ItemListContainer;

