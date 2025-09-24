import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBarContainer from "./components/NavBarContainer";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Carrito from "./components/Carrito"; // 👈 import

export default function App() {

  const [cantidadEnCarrito, setCantidadEnCarrito] = useState(3);

    return (
      <BrowserRouter>

        <NavBarContainer cantidad={cantidadEnCarrito} />

        <Routes>
          <Route path="/" element={<ItemListContainer mensaje="Bienvenidos a DistriGuanaco" />}/>
          <Route path="/categoria/:categoriaId" element={<ItemListContainer mensaje="Filtrado por categoria" />}/>  
          <Route path="/detalle/:id" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<Carrito />} />  {/* 👈 ruta necesaria */}
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>

      </BrowserRouter>
    );
}
