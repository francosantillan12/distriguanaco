// src/components/ItemListContainer.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";      // 👈 1) Leemos :categoriaId de la URL
import ItemList from "./ItemList";
import withLoading from "./hoc/withLoading";       // 👈 sigue igual, sin llaves

const ItemListWithLoading = withLoading(ItemList);

function ItemListContainer({ mensaje = "" }) {
  const { categoriaId } = useParams();             // 👈 2) Obtenemos el parámetro dinámico
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);        // 👈 3) Guardamos errores (opcional, recomendado)

  useEffect(() => {
    setError(null);                                 // 👈 4) Limpiamos error al cambiar de categoría
    // 👇 5) Armamos la URL según haya o no categoría
    const url = categoriaId
      ? `https://dummyjson.com/products/category/${categoriaId}`
      : `https://dummyjson.com/products`;


    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Fallo la carga de productos");
        return res.json();
      })
      .then((data) => {
        // 👇 6) DummyJSON devuelve { products, total, ... } en ambas rutas
        const productos = Array.isArray(data.products) ? data.products : [];
        // Pequeño delay de demo para que se vea el loader (podés bajarlo/quitarlos si querés)
        setTimeout(() => {
          setItems(productos);
        }, 800);
      })
      .catch((err) => {
        console.error("Error al traer productos:", err);
        setItems([]);                                // 👈 Evitamos quedar con datos viejos
        setError("No se pudieron cargar los productos.");
      });
  }, [categoriaId]);                                 // 👈 7) DEPENDE de la categoría

  // 👇 8) Pasamos items y mensaje; el HOC muestra loader si items.length === 0
  //    (Si tu HOC acepta 'cargando', avisame y lo pasamos como prop explícito)
  return (
    <>
      {error ? <p className="text-danger">{error}</p> : null}
      <ItemListWithLoading items={items} mensaje={mensaje} />
    </>
  );
}

export default ItemListContainer;

