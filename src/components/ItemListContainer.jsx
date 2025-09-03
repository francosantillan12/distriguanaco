// ACA VAN LOS PRODUCTOS DE NUESTRO "ECOMMERCE"
import { useState, useEffect } from "react";
import ItemList from "./ItemList"; // 👈 Asegurá el mismo case que el nombre del archivo

const productos = [
  { id: 0, nombre: "Harina de trigo integral", precio: 850, categoria: "harinas", stock: 30 },
  { id: 1, nombre: "Harina de chía", precio: 1200, categoria: "harinas", stock: 20 },
  { id: 2, nombre: "Semillas de girasol", precio: 950, categoria: "semillas", stock: 40 },
  { id: 3, nombre: "Semillas de calabaza", precio: 1100, categoria: "semillas", stock: 25 },
  { id: 4, nombre: "Arroz yamani", precio: 1400, categoria: "arroces", stock: 50 },
  { id: 5, nombre: "Arroz integral", precio: 1350, categoria: "arroces", stock: 45 },
  { id: 6, nombre: "Galletitas Limbo avena", precio: 900, categoria: "galletitas", stock: 60 },
  { id: 7, nombre: "Barrita Integra maní", precio: 700, categoria: "barritas", stock: 80 },
  { id: 8, nombre: "Té verde", precio: 600, categoria: "infusiones", stock: 35 },
  { id: 9, nombre: "Hibiscus en flor", precio: 750, categoria: "infusiones", stock: 20 }
];

const ItemListContainer = ({ mensaje }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getProducts = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (productos.length === 0) reject("No se encontraron productos");
          else resolve(productos);
        }, 2000);
      });

    getProducts()
      .then((res) => setItems(res))
      .catch((err) => console.error(err));
  }, []);

  return <ItemList items={items} mensaje={mensaje} />; // 👈 pasamos mensaje
};

export default ItemListContainer;
