import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBarContainer from "./components/NavBarContainer";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";

import Checkout from "./components/Checkout";

export default function App() {
  return (
    <BrowserRouter>
      <NavBarContainer />

      <Routes>
        <Route path="/" element={<ItemListContainer mensaje="Bienvenidos a DistriGuanaco" />} />
        <Route path="/categoria/:categoriaId" element={<ItemListContainer mensaje="Filtrado por categoria" />} />
        <Route path="/detalle/:id" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>

      <Toaster position="top-center" />
    </BrowserRouter>
  );
}
