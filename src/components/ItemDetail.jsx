import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import ItemCount from "./ItemCount";

export default function ItemDetail({
  titulo, categoria, stock, precio, descripcion,
  imagenPrincipal, agregado, onAdd, mostrarAviso, 
  mensajeAviso,bgAviso,onCloseAviso           
}) {
  return (
    <div className="p-3">
      <Row className="g-4">
        <Col xs={12} md={5}>
          <Card className="h-100">
            <Card.Img src={imagenPrincipal} alt={titulo} />
          </Card>
        </Col>

        <Col xs={12} md={7}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="mb-2">{titulo}</Card.Title>
              <Card.Text className="mb-1">Categoría: {categoria}</Card.Text>
              <Card.Text className="mb-1">Stock: {stock}</Card.Text>
              <Card.Text className="fs-5 fw-bold mb-3">Precio: ${precio}</Card.Text>
              <Card.Text className="text-muted">{descripcion}</Card.Text>

              <div className="mt-auto d-flex gap-2 align-items-center">
                {agregado ? (
                  <>
                    <Button as={Link} to="/carrito" variant="warning">
                      Ir al carrito
                    </Button>
                    <Button as={Link} to="/" variant="outline-secondary">
                      Seguir comprando
                    </Button>
                  </>
                ) : (
                  <>
                    <ItemCount stock={stock} inicial={1} onAdd={onAdd} />
                    <Button as={Link} to="/" variant="outline-secondary">
                      Seguir comprando
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastContainer position="top-center" className="p-3 position-fixed">
        <Toast
          onClose={onCloseAviso}
          show={mostrarAviso}
          delay={1600}
          autohide
          bg={bgAviso}
        >
          <Toast.Body className="text-white">{mensajeAviso}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
