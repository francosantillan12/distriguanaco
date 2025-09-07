// src/components/ItemListContainer.jsx
import { useState, useEffect } from "react";
import ItemList from "./ItemList";

function ItemListContainer({ mensaje = "" }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setItems(data.products))
      .catch((error) => console.error("Error al traer productos:", error));
  }, []);

  return <ItemList items={items} mensaje={mensaje} />;
}

export default ItemListContainer;
