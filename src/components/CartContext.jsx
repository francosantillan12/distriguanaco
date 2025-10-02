import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(function () {
    try {
      const guardado = localStorage.getItem("carrito");
      return guardado ? JSON.parse(guardado) : [];
    } catch (e) {
      console.error("Error leyendo carrito del storage:", e);
      return [];
    }
  });

  useEffect(function () {
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch (e) {
      console.error("Error guardando carrito en storage:", e);
    }
  }, [carrito]);

  function agregarProducto(producto) {
    setCarrito(function (anterior) {
      const existe = anterior.find(function (item) { return item.id === producto.id; });
      const cantidadNueva = Number(producto.cantidad || 1);

      if (existe) {
        return anterior.map(function (item) {
          return item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidadNueva }
            : item;
        });
      } else {
        return [...anterior, { ...producto, cantidad: cantidadNueva }];
      }
    });
  }

  function eliminarProducto(id) {
    setCarrito(function (anterior) {
      return anterior.filter(function (item) { return item.id !== id; });
    });
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  function cambiarCantidad(id, nuevaCantidad) {
    const cantidad = Number(nuevaCantidad);
    if (isNaN(cantidad) || cantidad < 1) return;

    setCarrito(function (anterior) {
      return anterior.map(function (item) {
        return item.id === id ? { ...item, cantidad } : item;
      });
    });
  }

  const cantidadTotal = carrito.reduce(function (acc, item) {
    return acc + Number(item.cantidad || 0);
  }, 0);

  const totalPrecio = carrito.reduce(function (acc, item) {
    const precioUnit = Number(item.precio || item.price || 0);
    return acc + Number(item.cantidad || 0) * precioUnit;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
        cambiarCantidad,
        cantidadTotal,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

