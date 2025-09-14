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
            display: "flex",           
            justifyContent: "center",   
            alignItems: "center",       
            height: "50vh",            
          }}
        >
          <PulseLoader color="#fffb02ff" size={15} /> 
        </div>
      );
    }
    return <Component {...props} />;
  }

  return ComponentWithLoading; 
};

export default withLoading; 
