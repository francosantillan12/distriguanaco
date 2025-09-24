
import { useContext } from "react";
import { CarritoContext } from "./CarritoContext";
import { Link } from "react-router-dom";  // 👈 importamos Link
import styles from "../styles/CartWidget.module.css";

export default function CartWidget() {
  const { cantidadTotal } = useContext(CarritoContext);

  return (
    <Link to="/carrito" className={styles.cartWidget} aria-label="Carrito">
      🛒
      {cantidadTotal > 0 && (
        <span className={styles.contadorCarrito}>{cantidadTotal}</span>
      )}
    </Link>
  );
}
