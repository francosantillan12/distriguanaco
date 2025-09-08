// src/components/ItemList.jsx
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Item from "./Item";

function ItemList({ items = [], mensaje = "" }) {
  return (
    <Container fluid className="item-list-container py-3">
      <h2 className="mb-3">{mensaje}</h2>

      <Row className="g-4">
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </Row>
    </Container>
  );
}

export default ItemList;
