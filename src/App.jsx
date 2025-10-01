// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBarContainer from "./components/NavBarContainer";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Carrito from "./components/Carrito";
import FinalizarCompra from "./components/FinalizarCompra";

export default function App() {
  return (
    <BrowserRouter>
      <NavBarContainer />

      <Routes>
        <Route
          path="/"
          element={<ItemListContainer mensaje="Bienvenidos a DistriGuanaco" />}
        />
        <Route
          path="/categoria/:categoriaId"
          element={<ItemListContainer mensaje="Filtrado por categoria" />}
        />
        <Route path="/detalle/:id" element={<ItemDetailContainer />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/FinalizarCompra" element={<FinalizarCompra />} />
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>

      <Toaster position="top-center" />
    </BrowserRouter>
  );
}
