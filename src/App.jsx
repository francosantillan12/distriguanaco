import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'    // 👈 import Routes y Route
import NavBarContainer from './components/NavBarContainer'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'   // 👈 import nuevo

function App() {
  const [cantidadEnCarrito, setCantidadEnCarrito] = useState(3)

  return (
    <>
      <NavBarContainer cantidad={cantidadEnCarrito} />

      <Routes>
        <Route
          path="/"
          element={<ItemListContainer mensaje="Bienvenidos a DistriGuanaco" />}
        />
        <Route
          path="/categoria/:categoriaId"
          element={<ItemListContainer mensaje="Filtrado por categoría" />}
        />
        
        {/* 👇 Aquí va la ruta al detalle */}
        <Route
          path="/detalle/:id"
          element={<ItemDetailContainer />}
        />

        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </>
  )
}

export default App

