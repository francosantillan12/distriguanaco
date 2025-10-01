
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useContext, useState } from "react";
import { CarritoContext } from "./CarritoContext";
import { serverTimestamp } from "firebase/firestore";
import { createOrder } from "../firebase/db";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function FinalizarCompra() {
  const { totalPrecio, carrito, vaciarCarrito } = useContext(CarritoContext);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  function aDosDecimales(n) {
    return "$" + Number(n || 0).toFixed(2);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (enviando) return;

    if (!carrito || carrito.length === 0) {
      toast.error("Tu carrito está vacío. Agregá productos antes de finalizar.");
      return;
    }

    setEnviando(true);

    const form = e.target;
    const email = form.email.value;
    const nombre = form.nombre.value;
    const telefono = form.telefono.value;

    const order = {
      buyer: { email, nombre, telefono },
      total: typeof totalPrecio === "function" ? totalPrecio() : totalPrecio,
      items: carrito,
      date: serverTimestamp(),
    };

    createOrder(order)
      .then(function (orderId) {
        // ✅ Toast PERSISTENTE con ID y acciones
        toast.custom(
          function (t) {
            return (
              <div
                className="bg-white rounded-3 shadow p-3"
                style={{ minWidth: 280, border: "1px solid #eee" }}
              >
                <div className="fw-bold mb-1">¡Compra realizada!</div>
                <div className="small text-muted mb-2">Comprobante</div>
                <div className="mb-2">
                  <span className="fw-semibold">ID:</span>{" "}
                  <code className="text-break">{orderId}</code>
                </div>

                <div className="d-flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline-dark"
                    onClick={function () {
                      navigator.clipboard.writeText(orderId);
                      toast.success("ID copiado al portapapeles");
                    }}
                  >
                    Copiar ID
                  </Button>

                  <Button
                    size="sm"
                    variant="dark"
                    onClick={function () {
                      toast.dismiss(t.id);
                    }}
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            );
          },
          { duration: Infinity, position: "top-center" } // 👈 NO se cierra solo
        );

        // ✅ Vaciar carrito y limpiar form
        vaciarCarrito();
        form.reset();

        // ✅ Volver al inicio (el toast persiste porque Toaster es global)
        setTimeout(function () {
          navigate("/");
        }, 500);
      })
      .catch(function (err) {
        console.error("Error creando la orden:", err);
        toast.error("No pudimos completar la compra. Intentá nuevamente.");
      })
      .finally(function () {
        setEnviando(false);
      });
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="w-50">
        <h5 className="mb-3">Resumen de tu compra</h5>

        {carrito && carrito.length > 0 ? (
          <Table striped bordered hover responsive className="mb-4">
            <thead>
              <tr>
                <th>Producto</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end">Precio</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map(function (item) {
                return (
                  <tr key={item.id}>
                    <td className="align-middle">{item.title}</td>
                    <td className="text-center align-middle">{item.cantidad}</td>
                    <td className="text-end align-middle">
                      {aDosDecimales(item.price)}
                    </td>
                    <td className="text-end align-middle">
                      {aDosDecimales(item.price * item.cantidad)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-end fw-bold">Total</td>
                <td className="text-end fw-bold">
                  {aDosDecimales(
                    typeof totalPrecio === "function" ? totalPrecio() : totalPrecio
                  )}
                </td>
              </tr>
            </tfoot>
          </Table>
        ) : (
          <div className="alert alert-secondary">No hay productos en el carrito.</div>
        )}

        <Form className="w-100" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Escribí tu email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Escribí tu nombre"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="telefono">
            <Form.Label>Numero de Telefono</Form.Label>
            <Form.Control
              type="tel"
              name="telefono"
              placeholder="Escribí tu numero de telefono"
              required
            />
          </Form.Group>

          <Button
            variant="dark"
            type="submit"
            disabled={enviando || !carrito || carrito.length === 0}
          >
            {enviando ? "Procesando…" : "Finalizar compra"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default FinalizarCompra;