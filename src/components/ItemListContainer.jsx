
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";      
import ItemList from "./ItemList";
import withLoading from "./hoc/withLoading";      

const ItemListWithLoading = withLoading(ItemList);

function ItemListContainer({ mensaje = "" }) {
  const { categoriaId } = useParams();            
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);       

  useEffect(() => {
    setError(null);                                 
    const url = categoriaId
      ? `https://dummyjson.com/products/category/${categoriaId}`
      : `https://dummyjson.com/products`;


    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Fallo la carga de productos");
        return res.json();
      })
      .then((data) => {
        const productos = Array.isArray(data.products) ? data.products : [];
        setTimeout(() => {
          setItems(productos);
        }, 800);
      })
      .catch((err) => {
        console.error("Error al traer productos:", err);
        setItems([]);                                
        setError("No se pudieron cargar los productos.");
      });
  }, [categoriaId]);                                 

  return (
    <>
      {error ? <p className="text-danger">{error}</p> : null}
      <ItemListWithLoading items={items} mensaje={mensaje} />
    </>
  );
}

export default ItemListContainer;

