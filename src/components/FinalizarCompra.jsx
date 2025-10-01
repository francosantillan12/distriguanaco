
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useContext, useState } from 'react';
import { CarritoContext } from './CarritoContext';
import { serverTimestamp } from 'firebase/firestore';
import { createOrder } from '../firebase/db';

function FinalizarCompra() {
  const { totalPrecio, carrito, vaciarCarrito } = useContext(CarritoContext);
  const [enviando, setEnviando] = useState(false);
  const [idOrden, setIdOrden] = useState(null);
  const [error, setError] = useState(null);

  const aDosDecimales = function (n) {
    return '$' + Number(n || 0).toFixed(2);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    if (enviando) return;

    if (!carrito || carrito.length === 0) {
      setError('Tu carrito está vacío. Agregá productos antes de finalizar la compra.');
      return;
    }

    setEnviando(true);
    setError(null);

    const form = e.target;
    const email = form.email.value;
    const nombre = form.nombre.value;
    const telefono = form.telefono.value;

    const order = {
      buyer: { email, nombre, telefono },
      total: (typeof totalPrecio === 'function' ? totalPrecio() : totalPrecio),
      items: carrito,
      date: serverTimestamp(),
    };

    createOrder(order)
      .then(function (orderId) {
        setIdOrden(orderId);
        vaciarCarrito();
        form.reset();
      })
      .catch(function (err) {
        console.error('Error creando la orden:', err);
        setError('No pudimos completar la compra. Intentá nuevamente.');
      })
      .finally(function () {
        setEnviando(false);
      });
  };

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
                    <td className="text-end align-middle">{aDosDecimales(item.price)}</td>
                    <td className="text-end align-middle">{aDosDecimales(item.price * item.cantidad)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-end fw-bold">Total</td>
                <td className="text-end fw-bold">
                  {aDosDecimales(typeof totalPrecio === 'function' ? totalPrecio() : totalPrecio)}
                </td>
              </tr>
            </tfoot>
          </Table>
        ) : (
          <div className="alert alert-secondary">No hay productos en el carrito.</div>
        )}

        {idOrden && (
          <div className="alert alert-success" role="alert">
            Compra realizada con éxito. <br />
            <strong>ID de orden:</strong> {idOrden}
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Form className="w-100" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Escribí tu email" required />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="nombre" placeholder="Escribí tu nombre" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="telefono">
            <Form.Label>Numero de Telefono</Form.Label>
            <Form.Control type="tel" name="telefono" placeholder="Escribí tu numero de telefono" required />
          </Form.Group>

          <Button
            variant="dark"
            type="submit"
            disabled={enviando || !carrito || carrito.length === 0}
          >
            {enviando ? 'Procesando…' : 'Finalizar compra'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default FinalizarCompra;


