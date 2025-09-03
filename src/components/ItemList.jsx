import Container from "react-bootstrap/Container";
import Row  from "react-bootstrap/Row";
import Item from "./Item";

function ItemList({ items = [], mensaje = "" }) { // 👈 ahora recibimos 'mensaje'
  return (
    <Container fluid className="item-list-container py-3">
      <h2 className="mb-3">{mensaje}</h2>

      {items.length === 0 && <p className="text-body m-0">Cargando productos...</p>}

      <Row className="g-4">
        {items.map(item => <Item item={item} key={item.id}/> )}
      </Row>
    </Container>
  );
}

export default ItemList; // 👈 export default presente
