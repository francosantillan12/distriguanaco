import { useState } from 'react';
import NavBarContainer from './components/NavbarContainer';
import ItemListContainer from './components/ItemListContainer';

function App() {
  const [cantidadEnCarrito, setCantidadEnCarrito] = useState(3); // por ahora lo dejamos fijo en 3 para probar

  return (
    <>
      <NavBarContainer cantidad={cantidadEnCarrito} />
      <ItemListContainer mensaje="Bienvenidos a DistriGuanaco" />
    </>
  );
}

export default App;
