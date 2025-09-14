
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import styles from "../styles/Item.module.css";

export default function Item({ item }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card className={`h-100 ${styles.cardProducto}`}>
        <Card.Img
          variant="top"
          alt={item.title}
          src={item.thumbnail}
          className={styles.cardImg}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className={styles.cardTitle}>{item.title}</Card.Title>
          <Card.Text className={styles.cardText}>
            Categoría: {item.category}
          </Card.Text>
          <Card.Text className={styles.cardText}>
            Stock: {item.stock}
          </Card.Text>
          <Card.Text className="fw-bold">
            Precio: ${item.price}
          </Card.Text>

          <div className="mt-auto d-flex gap-2">
            <Button as={Link} to={`/detalle/${item.id}`} className="btn-marca">
              Ver más
            </Button>

            <Button className="btn-marca">
              Agregar al carrito
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
