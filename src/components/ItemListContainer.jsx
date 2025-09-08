// src/components/ItemListContainer.jsx
import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import withLoading from "./hoc/withLoading";  // 👈 sin llaves


const ItemListWithLoading = withLoading(ItemList)

function ItemListContainer({ mensaje = "" }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setItems(data.products)
        }, 2000);
      })
      .catch((error) => console.error("Error al traer productos:", error));
  }, []);

  return <ItemListWithLoading items={items} mensaje={mensaje} />;
}

export default ItemListContainer;
