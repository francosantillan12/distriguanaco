
import { useContext } from "react";
import { CarritoContext } from "./CarritoContext";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import styles from "../styles/Carrito.module.css";

const aDosDecimales = (n) => `$${Number(n || 0).toFixed(2)}`;

function Carrito() {

  const {
    carrito,
    cambiarCantidad,
    eliminarProducto,
    vaciarCarrito,
    totalPrecio,
  } = useContext(CarritoContext);

  function aumentar(id) {
    const item = carrito.find(function (i) { return i.id === id; });
    if (!item) return;
    cambiarCantidad(id, item.cantidad + 1);
  }

  function disminuir(id) {
    const item = carrito.find(function (i) { return i.id === id; });
    if (!item) return;
    if (item.cantidad > 1) cambiarCantidad(id, item.cantidad - 1);
  }

  if (carrito.length === 0) {
    return (
      <div className={styles.carritoContainer}>
        <h2 className={styles.titulo}>Tu carrito está vacío</h2>
        <p>¡Explorá nuestros productos!</p>
        <Link to="/" className="btn btn-warning text-dark">Ir al catálogo</Link>
      </div>
    );
  }

  return (
    <div className={styles.carritoContainer}>
      <h2 className={styles.titulo}>Tu carrito</h2>

      {/* 👇 Wrapper para scroll horizontal en mobile */}
      <div className={styles.tablaWrapper}>
        <Table striped bordered hover responsive className={styles.tabla}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {carrito.map(function (item) {
              return (
                <tr key={item.id}>
                  <td className="d-flex align-items-center gap-2">
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        width={48}
                        height={48}
                        className={styles.imagenProducto}
                      />
                    )}
                    <span>{item.title}</span>
                  </td>
                  <td>{aDosDecimales(item.price * item.cantidad)}</td>
                  <td>
                    <div className={styles.cantidadGroup}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={function () { disminuir(item.id); }}
                        disabled={item.cantidad <= 1}
                        aria-label="Disminuir cantidad"
                      >
                        –
                      </Button>
                      <span className={styles.cantidadNum}>{item.cantidad}</span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={function () { aumentar(item.id); }}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>${item.price * item.cantidad}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={function () { eliminarProducto(item.id); }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className={styles.totalContainer}>
        <Button variant="outline-danger" onClick={vaciarCarrito}>Vaciar carrito</Button>
        <h4 className={styles.total}>Total: {aDosDecimales(totalPrecio)}</h4>

      </div>

      <div className="mt-3 d-flex gap-2">
        <Link to="/" className="btn btn-outline-secondary">Seguir comprando</Link>
        <Button variant="success">Finalizar compra</Button>
      </div>
    </div>
  );
}

export default Carrito;
