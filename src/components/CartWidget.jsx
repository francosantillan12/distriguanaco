const CartWidget = ({ cantidad }) => {
  return (
    <div className="cart-widget">
      🛒
      {cantidad > 0 && <span className="contador-carrito">{cantidad}</span>}
    </div>
  );
};

export default CartWidget;
