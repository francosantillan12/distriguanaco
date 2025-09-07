// src/components/NavBar.jsx
import { useEffect, useState } from "react";
import NavBar from "./NavBar";


const NavBarContainer = ({ cantidad }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/products/category-list')
    .then(res => res.json())
    .then(data => setCategories(data));
  }, [])
  

  return <NavBar categories={categories}></NavBar>

  
};

export default NavBarContainer;
