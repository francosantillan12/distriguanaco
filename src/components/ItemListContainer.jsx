import { useState, useEffect } from "react";
import ItemList from "./ItemList"; 

function ItemListContainer () {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products') // pedimos los productos a la API
      .then(res => res.json())              // parseamos la respuesta
      .then(data => {                       // "data" es el objeto completo
        console.log(data);                  // mirá en consola cómo viene
        setItems(data.products);            // guardamos el array en el state
      })
      .catch(error => console.error("Error al traer productos:", error));
  }, []);

  return (
    <ItemList items={items} />
  )
};

export default ItemListContainer;
