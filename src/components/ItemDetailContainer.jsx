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
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [mensajeAviso, setMensajeAviso] = useState("");
  const [bgAviso, setBgAviso] = useState("success");
  const [agregado, setAgregado] = useState(false);

  const { carrito, agregarProducto } = useContext(CarritoContext);

  useEffect(function () {
    setCargando(true);
    setError(null);

    getItem(id)
      .then(function (data) {
        if (!data) throw new Error("Producto no encontrado");
        setProducto(data);
        setAgregado(false);
        setMostrarAviso(false);
      })
      .catch(function () {
        setError("No pudimos cargar el detalle del producto.");
        setProducto(null);
      })
      .finally(function () {
        setCargando(false);
      });
  }, [id]);

  if (cargando) return <p className="p-3">Cargando detalle…</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!producto) return <p>No existe el producto solicitado.</p>;

  const imagenPrincipal =
    producto.imagen ||
    (producto.images && producto.images[0]) ||
    producto.thumbnail ||
    "";

  const titulo = producto.nombre || producto.title || "Producto";
  const categoria = producto.categoria || producto.category || "";
  const stock = Number(producto.stock || 0);
  const precio = Number(producto.precio || producto.price || 0);
  const descripcion = producto.descripcion || producto.description || "";

  function manejarAdd(cantidadElegida) {
    const yaEnCarrito = carrito.some(function (p) {
      return p.id === producto.id;
    });

    if (yaEnCarrito) {
      setMensajeAviso("⚠️ El producto ya está en el carrito");
      setBgAviso("danger");
      setMostrarAviso(true);
      return;
    }

    agregarProducto({
      id: producto.id,
      title: titulo,
      price: precio,
      thumbnail: imagenPrincipal,
      cantidad: cantidadElegida,
    });

    setMensajeAviso("✅ Producto agregado al carrito");
    setBgAviso("success");
    setMostrarAviso(true);
    setAgregado(true);
  }

  return (
    <ItemDetail
      titulo={titulo}
      categoria={categoria}
      stock={stock}
      precio={precio}
      descripcion={descripcion}
      imagenPrincipal={imagenPrincipal}
      agregado={agregado}
      onAdd={manejarAdd}
      mostrarAviso={mostrarAviso}
      mensajeAviso={mensajeAviso}
      bgAviso={bgAviso}
      onCloseAviso={function () { setMostrarAviso(false); }}
    />
  );
}

export default ItemDetailContainer;

