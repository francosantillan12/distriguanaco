// src/components/hoc/withLoading.jsx
import PulseLoader from "react-spinners/PulseLoader"; // 👈 importamos el spinner

// HOC: recibe un componente y devuelve uno nuevo
const withLoading = (Component) => {
  // este es el nuevo componente que envuelve al original
  function ComponentWithLoading(props) {
    // si no hay items todavía, mostramos el cargador
    if (!props.items || props.items.length < 1) {
      return (
        <div
          style={{
            display: "flex",            // 👈 flexbox para centrar
            justifyContent: "center",   // 👈 centrado horizontal
            alignItems: "center",       // 👈 centrado vertical
            height: "50vh",             // 👈 ocupa medio alto de la pantalla
          }}
        >
          <PulseLoader color="#fffb02ff" size={15} /> {/* 👈 spinner de pulsos */}
        </div>
      );
    }

    // si hay items, renderizamos el componente original con todas sus props
    return <Component {...props} />;
  }

  return ComponentWithLoading; // 👈 devolvemos el nuevo componente
};

export default withLoading; // 👈 exportamos como default
