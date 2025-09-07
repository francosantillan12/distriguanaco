// src/components/NavBar.jsx
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import CartWidget from "./CartWidget";
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = ({ cantidad, categories }) => {
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
            <NavDropdown title="Categorias" id="basic-nav-dropdown">
              {categories.map(category => (
                <NavDropdown.Item href="#action/3.1">{category}</NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

