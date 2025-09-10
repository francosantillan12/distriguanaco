// src/components/Item.jsx
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import styles from "../styles/Item.module.css";

export default function Item({ item }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} className={styles.producto}>
      <Card className="h-100">
        <Card.Img
          variant="top"
          alt={item.title}             // ✅ DummyJSON: title
          src={item.thumbnail}         // ✅ DummyJSON: thumbnail (o images[0])
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{item.title}</Card.Title>
          <Card.Text className="mb-1">Categoría: {item.category}</Card.Text>
          <Card.Text className="mb-1">Stock: {item.stock}</Card.Text>
          <Card.Text className="fw-bold">Precio: ${item.price}</Card.Text>

          {/* 👇 Acciones */}
          <div className="mt-auto d-flex gap-2">
            <Button as={Link} to={`/detalle/${item.id}`} className="btn-marca">
              Ver más
            </Button>

            <Button className="btn-marca">   {/* 👈 fondo amarillo */}
              Agregar al carrito
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}



