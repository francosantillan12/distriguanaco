// src/components/NavBar.jsx
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import CartWidget from "./CartWidget";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";  // 👈 Importamos NavLink del Router

const NavBar = ({ cantidad, categories }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md" className="navbarCustom" fixed="top">
      <Container fluid>
        {/* 👇 Logo ahora es un enlace al Home */}
        <Navbar.Brand className="logoCustom">
          <NavLink to="/" className="brandLink">DistriGuanaco</NavLink>
        </Navbar.Brand>

        {/* Carrito SIEMPRE visible + botón hamburguesa a la derecha */}
        <div className="d-flex align-items-center ms-auto order-md-2">
          <CartWidget cantidad={cantidad} />
          <Navbar.Toggle aria-controls="menu-principal" className="ms-2" />
        </div>

        {/* Links que se colapsan */}
        <Navbar.Collapse id="menu-principal" className="order-md-1">
          <Nav className="linksCustom">
            <NavDropdown title="Categorías" id="basic-nav-dropdown">
              {/* 👇 Ítem extra para volver al listado completo */}
              <NavDropdown.Item as={NavLink} to="/">
                Todos
              </NavDropdown.Item>

              {/* 👇 Cada categoría va a /categoria/:categoriaId */}
              {categories.map((category) => (
                <NavDropdown.Item
                  key={category}
                  as={NavLink}
                  to={`/categoria/${category}`}
                >
                  {category}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;



