import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import ItemCount from "./ItemCount";
import { CarritoContext } from "./CarritoContext";
import { getItem } from "../firebase/db.js";

function ItemDetailContainer() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [mensajeAviso, setMensajeAviso] = useState("");
  const [bgAviso, setBgAviso] = useState("success");

  const { carrito, agregarProducto } = useContext(CarritoContext);

  useEffect(function () {
    setCargando(true);
    setError(null);

    getItem(id)
      .then(function (data) {
        if (!data) throw new Error("Producto no encontrado");
        setProducto(data);
      })
      .catch(function (err) {
        console.error(err);
        setError("No pudimos cargar el detalle del producto.");
        setProducto(null);
      })
      .finally(function () {
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return <p className="p-3">Cargando detalle…</p>;
  }

  if (error) {
    return (
      <div className="p-3">
        <p className="text-danger">{error}</p>
        <Button as={Link} to="/" variant="secondary">Volver al catálogo</Button>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="p-3">
        <p>No existe el producto solicitado.</p>
        <Button as={Link} to="/" variant="secondary">Volver al catálogo</Button>
      </div>
    );
  }

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
  }

  return (
    <div className="p-3">
      <Row className="g-4">
        <Col xs={12} md={5}>
          <Card className="h-100">
            <Card.Img src={imagenPrincipal} alt={titulo} />
          </Card>
        </Col>

        <Col xs={12} md={7}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="mb-2">{titulo}</Card.Title>
              <Card.Text className="mb-1">Categoría: {categoria}</Card.Text>
              <Card.Text className="mb-1">Stock: {stock}</Card.Text>
              <Card.Text className="fs-5 fw-bold mb-3">Precio: ${precio}</Card.Text>
              <Card.Text className="text-muted">{descripcion}</Card.Text>

              <div className="mt-auto d-flex gap-2 align-items-center">
                <ItemCount
                  stock={stock}
                  inicial={1}
                  onAdd={manejarAdd}
                />
                <Button as={Link} to="/" variant="outline-secondary">
                  Seguir comprando
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastContainer position="top-center" className="p-3 position-fixed">
        <Toast
          onClose={function () { setMostrarAviso(false); }}
          show={mostrarAviso}
          delay={1600}
          autohide
          bg={bgAviso}
        >
          <Toast.Body className="text-white">{mensajeAviso}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default ItemDetailContainer;
