import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import styles from "../styles/Item.module.css";

import { useContext, useState } from "react";
import { CarritoContext } from "./CarritoContext";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default function Item({ item }) {
  const { agregarProducto } = useContext(CarritoContext);
  const [mostrarAviso, setMostrarAviso] = useState(false);

  // helpers de visualización
  const nombre = item?.nombre ?? "Producto sin nombre";
  const precio = item?.precio ?? 0;
  const imagen = item?.imagen ?? "";
  const descripcion = item?.description ?? "";
  const categorias = Array.isArray(item?.categorias)
    ? item.categorias.join(", ")
    : item?.categorias ?? "Sin categoría";

  function agregarUnoAlCarrito() {
    agregarProducto({
      id: item.id,
      title: nombre,           // usamos 'nombre' como title interno del carrito
      thumbnail: imagen,       // imagen de Firestore
      cantidad: 1,
      price: precio,           // precio de Firestore
    });
    setMostrarAviso(true);
  }

  return (
    <>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Card className={`h-100 ${styles.cardProducto}`}>
          <Card.Img
            variant="top"
            alt={nombre}
            src={imagen}
            className={styles.cardImg}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title className={styles.cardTitle}>{nombre}</Card.Title>

            <Card.Text className={styles.cardText}>
              Categoría: {categorias}
            </Card.Text>

            {/* si tenés 'stock' en Firestore, lo mostrás. Si no, lo saco */}
            {item?.stock !== undefined && (
              <Card.Text className={styles.cardText}>Stock: {item.stock}</Card.Text>
            )}

            <Card.Text className={styles.cardText}>
              {descripcion}
            </Card.Text>

            <Card.Text className="fw-bold">
              Precio: $
              {Number(precio).toLocaleString("es-AR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </Card.Text>

            <div className="mt-auto d-flex gap-2">
              <Button as={Link} to={`/detalle/${item.id}`} className="btn-marca">
                Ver más
              </Button>
              <Button className="btn-marca" onClick={agregarUnoAlCarrito}>
                Agregar al carrito
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setMostrarAviso(false)}
          show={mostrarAviso}
          delay={1400}
          autohide
          bg="success"
        >
          <Toast.Body className="text-white">
            ✅ Producto agregado al carrito
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
