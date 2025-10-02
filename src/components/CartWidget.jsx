
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";  // 👈 importamos Link
import styles from "../styles/CartWidget.module.css";

export default function CartWidget() {
  const { cantidadTotal } = useContext(CartContext);

  return (
    <Link to="/carrito" className={styles.cartWidget} aria-label="Carrito">
      🛒
      {cantidadTotal > 0 && (
        <span className={styles.contadorCarrito}>{cantidadTotal}</span>
      )}
    </Link>
  );
}
