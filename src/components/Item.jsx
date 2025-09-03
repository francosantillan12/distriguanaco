import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export default function Item({ item }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card className="h-100">
        <Card.Img
          variant="top"
          alt={item.nombre}
          src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
        />
        <Card.Body>
          <Card.Title>{item.nombre}</Card.Title>
          <Card.Text className="mb-1">Categoría: {item.categoria}</Card.Text>
          <Card.Text className="mb-1">Stock: {item.stock}</Card.Text>
          <Card.Text className="fw-bold">Precio: ${item.precio}</Card.Text>
          <Button variant="primary">Ver más</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
