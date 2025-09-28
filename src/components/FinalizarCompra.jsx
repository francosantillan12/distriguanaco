
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { CarritoContext } from './CarritoContext';
import { serverTimestamp } from 'firebase/firestore';
import { createOrder } from '../firebase/db'; 

function FinalizarCompra() {

  const { totalPrecio, carrito } = useContext(CarritoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

  
    const email = form.email.value;
    const nombre = form.nombre.value;
    const telefono = form.telefono.value;

    const order = {
      buyer: { email, nombre, telefono }, 
      total: typeof totalPrecio === 'function' ? totalPrecio() : totalPrecio,
      items: carrito, 
      date: serverTimestamp(), 
    };

    createOrder(order)
      .then(function (orderId) {
        console.log('Orden creada con ID:', orderId);
      })
      .catch(function (err) {
        console.error('Error creando la orden:', err);
      });
  };

  return (
    <div className='d-flex justify-content-center mt-5 '>
      <Form className="w-50" onSubmit={handleSubmit}>
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

        <Button variant="dark" type="submit">
          Finalizar compra
        </Button>
      </Form>
    </div>
  );
}

export default FinalizarCompra;
