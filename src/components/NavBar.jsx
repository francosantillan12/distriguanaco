// src/components/NavBar.jsx
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import CartWidget from "./CartWidget";

const NavBar = ({ cantidad }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md" className="navbarCustom">
      <Container fluid>
        <Navbar.Brand className="logoCustom">DistriGuanaco</Navbar.Brand>

        {/* Carrito SIEMPRE visible + botón hamburguesa a la derecha */}
        <div className="d-flex align-items-center ms-auto order-md-2">
          <CartWidget cantidad={cantidad} />
          <Navbar.Toggle aria-controls="menu-principal" className="ms-2" />
        </div>

        {/* Links que se colapsan */}
        <Navbar.Collapse id="menu-principal" className="order-md-1">
          <Nav className="linksCustom">
            <Nav.Link href="#">Frutos Secos</Nav.Link>
            <Nav.Link href="#">Semillas</Nav.Link>
            <Nav.Link href="#">Harinas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;


