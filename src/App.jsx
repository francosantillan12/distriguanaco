import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  const [cantidadEnCarrito, setCantidadEnCarrito] = useState(3); // por ahora lo dejamos fijo en 3 para probar

  return (
    <>
      <NavBar cantidad={cantidadEnCarrito} />
      <ItemListContainer mensaje="Bienvenidos a DistriGuanaco" />
    </>
  );
}

export default App;
