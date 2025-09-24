
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import CartWidget from "./CartWidget";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const NavBar = ({ categories = [] }) => {
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="md"
      className={styles.navbarCustom}
      fixed="top"
    >
      <Container fluid>
        <Navbar.Brand className={styles.logoCustom}>
          <NavLink to="/" className={styles.brandLink}>
            DistriGuanaco
          </NavLink>
        </Navbar.Brand>

        <div className="d-flex align-items-center ms-auto order-md-2">
          <CartWidget />
          <Navbar.Toggle aria-controls="menu-principal" className="ms-2" />
        </div>

        <Navbar.Collapse id="menu-principal" className="order-md-1">
          <Nav className={styles.linksCustom}>
            <NavDropdown title="Categorías" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/">
                Todos
              </NavDropdown.Item>

              {categories.map((category) => (
                <NavDropdown.Item
                  as={NavLink}
                  to={`/categoria/${category.categoryName}`}
                  key={category.categoryName}
                >
                  {category.categoryName}
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



