import CartWidget from "./CartWidget";

const NavBar = ({ cantidad }) => {
  return (
    <nav className="navbar">
      <span className="logo">DistriGuanaco- fran.s</span>
      <div className="links">
        <a href="#">Frutos Secos</a>
        <a href="#">Semillas</a>
        <a href="#">Harinas</a>
      </div>
      <CartWidget cantidad={cantidad} />
    </nav>
  );
};

export default NavBar;
