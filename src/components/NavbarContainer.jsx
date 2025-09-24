
import { useEffect, useState } from "react";
import { getCategorias } from "../firebase/db.js";
import NavBar from "./NavBar";

const NavBarContainer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
  getCategorias(0)
  .then(data => setCategories(data))
  }, []);

  return <NavBar categories={categories} />;
};

export default NavBarContainer;
