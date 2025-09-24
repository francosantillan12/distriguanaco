
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemCount from "./ItemCount";
import { CarritoContext } from "./CarritoContext";

function ItemDetailContainer() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { agregarProducto } = useContext(CarritoContext);

  useEffect(() => {
    setCargando(true);
    setError(null);

    fetch(`https://dummyjson.com/products/${id}`)
      .then(function (res) {
        if (!res.ok) throw new Error("No se pudo cargar el producto");
        return res.json();
      })
      .then(function (data) {
        setProducto(data);
      })
      .catch(function (err) {
        console.error(err);
        setError("No pudimos cargar el detalle del producto.");
        setProducto(null);
      })
      .finally(function () {
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return <p className="p-3">Cargando detalle…</p>;
  }

  if (error) {
    return (
      <div className="p-3">
        <p className="text-danger">{error}</p>
        <Button as={Link} to="/" variant="secondary">Volver al catálogo</Button>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="p-3">
        <p>No existe el producto solicitado.</p>
        <Button as={Link} to="/" variant="secondary">Volver al catálogo</Button>
      </div>
    );
  }

  const imagenPrincipal =
    producto.images && producto.images.length > 0 ? producto.images[0] : producto.thumbnail;

  return (
    <div className="p-3">
      <Row className="g-4">
        <Col xs={12} md={5}>
          <Card className="h-100">
            <Card.Img src={imagenPrincipal} alt={producto.title} />
          </Card>
        </Col>

        <Col xs={12} md={7}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="mb-2">{producto.title}</Card.Title>
              <Card.Text className="mb-1">Categoría: {producto.category}</Card.Text>
              <Card.Text className="mb-1">Stock: {producto.stock}</Card.Text>
              <Card.Text className="fs-5 fw-bold mb-3">Precio: ${producto.price}</Card.Text>
              <Card.Text className="text-muted">{producto.description}</Card.Text>

              <div className="mt-auto d-flex gap-2 align-items-center">
                <ItemCount
                  stock={producto.stock}
                  inicial={1}
                  onAdd={function (cantidadElegida) {
                    // ✅ Agregar al carrito usando el contexto
                    agregarProducto({
                      id: producto.id,
                      title: producto.title,
                      price: producto.price,
                      thumbnail: imagenPrincipal,
                      cantidad: cantidadElegida
                    });
                  }}
                />
                <Button as={Link} to="/" variant="outline-secondary">
                  Seguir comprando
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ItemDetailContainer;
