import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CarritoContext } from "./CarritoContext";
import { getItem } from "../firebase/db.js";
import ItemDetail from "./ItemDetail";

function ItemDetailContainer() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { carrito, agregarProducto } = useContext(CarritoContext);

  useEffect(() => {
    setCargando(true);
    setError(null);

    getItem(id)
      .then((data) => {
        if (!data) throw new Error("Producto no encontrado");
        setProducto(data);
      })
      .catch(() => {
        setError("No pudimos cargar el detalle del producto.");
        setProducto(null);
      })
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <p className="p-3">Cargando detalle…</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!producto) return <p>No existe el producto solicitado.</p>;

  return (
    <ItemDetail
      producto={producto}
      carrito={carrito}
      agregarProducto={agregarProducto}
    />
  );
}

export default ItemDetailContainer;
