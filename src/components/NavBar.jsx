// src/components/NavBar.jsx
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav className="navbar">
      <span className="logo">DistriGuanaco</span>
      <div className="links">
        <a href="#">Frutos Secos</a>
        <a href="#">Semillas</a>
        <a href="#">Harinas</a>
      </div>
      <div className="cart-widget">🛒</div>
    </nav>
  );
};

export default NavBar;

