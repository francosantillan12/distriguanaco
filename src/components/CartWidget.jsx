import styles from "../styles/CartWidget.module.css";

export default function CartWidget({ cantidad }) {
  return (
    <div className={styles.cartWidget} aria-label="Carrito">
      🛒
      {cantidad > 0 && (
        <span className={styles.contadorCarrito}>{cantidad}</span>
      )}
    </div>
  );
}
