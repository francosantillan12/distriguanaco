
import { createContext, useEffect, useState } from "react";

// 1️⃣ Creamos el contexto
export const CarritoContext = createContext();

// 2️⃣ Proveedor del contexto
export function CarritoProvider({ children }) {
  // ✅ Inicializar carrito desde localStorage (una sola vez)
  const [carrito, setCarrito] = useState(function () {
    try {
      const guardado = localStorage.getItem("carrito");
      return guardado ? JSON.parse(guardado) : [];
    } catch (e) {
      console.error("Error leyendo carrito del storage:", e);
      return [];
    }
  });

  // ✅ Sincronizar cambios del carrito a localStorage
  useEffect(function () {
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch (e) {
      console.error("Error guardando carrito en storage:", e);
    }
  }, [carrito]);

  // 🔹 Agregar (si existe suma, si no agrega con cantidad 1 por defecto)
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

  // 🔹 Eliminar
  function eliminarProducto(id) {
    setCarrito(function (anterior) {
      return anterior.filter(function (item) { return item.id !== id; });
    });
  }

  // 🔹 Vaciar
  function vaciarCarrito() {
    setCarrito([]);
  }

  // 🔹 Cambiar cantidad (+/– en el carrito)
  function cambiarCantidad(id, nuevaCantidad) {
    const cantidad = Number(nuevaCantidad);
    if (isNaN(cantidad) || cantidad < 1) return;

    setCarrito(function (anterior) {
      return anterior.map(function (item) {
        return item.id === id ? { ...item, cantidad } : item;
      });
    });
  }

  // 🔹 Totales
  const cantidadTotal = carrito.reduce(function (acc, item) {
    return acc + Number(item.cantidad || 0);
  }, 0);

  const totalPrecio = carrito.reduce(function (acc, item) {
    return acc + Number(item.cantidad || 0) * Number(item.price || 0);
  }, 0);

  return (
    <CarritoContext.Provider
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
    </CarritoContext.Provider>
  );
}
