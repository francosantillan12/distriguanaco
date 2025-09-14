
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

const NavBarContainer = ({ cantidad }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error al traer categorías:", error));
  }, []);

  return <NavBar cantidad={cantidad} categories={categories} />;
};

export default NavBarContainer;

