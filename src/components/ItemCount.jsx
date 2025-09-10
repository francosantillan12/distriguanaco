
import { useState } from "react";
import Button from "react-bootstrap/Button";

function ItemCount({ stock = 1, inicial = 1, onAdd }) {
  const [cantidad, setCantidad] = useState(inicial);

  function incrementar() {
    setCantidad(function (prev) {
      return prev < stock ? prev + 1 : prev;
    });
  }

  function decrementar() {
    setCantidad(function (prev) {
      return prev > 1 ? prev - 1 : prev;
    });
  }

  function confirmar() {
    if (typeof onAdd === "function") {
      onAdd(cantidad);
    }
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <Button variant="outline-secondary" onClick={decrementar}>-</Button>
      <span>{cantidad}</span>
      <Button variant="outline-secondary" onClick={incrementar}>+</Button>
      <Button className="btn-marca" onClick={confirmar}>Agregar</Button>
    </div>
  );
}

export default ItemCount;
