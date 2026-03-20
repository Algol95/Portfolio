import PropTypes from "prop-types";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const directionStyles = {
  up: {
    hidden: "translate-y-10 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  down: {
    hidden: "-translate-y-10 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  left: {
    hidden: "translate-x-10 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  right: {
    hidden: "-translate-x-10 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  none: {
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
};

/**
 * Componente que envuelve su contenido y aplica una animación de revelado al hacer scroll.
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido a revelar.
 * @param {string} [props.direction="up"] - Dirección de la animación ("up", "down", "left", "right", "none").
 * @param {number} [props.delay=0] - Retardo de la animación en milisegundos.
 * @param {number} [props.duration=700] - Duración de la animación en milisegundos.
 * @param {string} [props.className=""] - Clases CSS adicionales para el contenedor.
 * @param {boolean} [props.once=true] - Si la animación debe ocurrir solo la primera vez que el elemento entra en vista.
 * @param {number} [props.threshold=0.15] - Porcentaje del elemento que debe ser visible para activar la animación (0 a 1).
 * @returns {JSX.Element} Componente con animación de revelado al hacer scroll.
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  className = "",
  once = true,
  threshold = 0.15,
}) {
  const { ref, isVisible } = useScrollReveal({ threshold, once });
  const styles = directionStyles[direction];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${isVisible ? styles.visible : styles.hidden} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Definición de las propTypes para el componente ScrollReveal, asegurando que se reciban las propiedades correctas y proporcionando documentación clara sobre los tipos esperados.
 * - `children`: Requerido, debe ser un nodo React (texto o elementos hijos) que se mostrará dentro del componente.
 * - `direction`: Opcional, debe ser una cadena que indique la dirección de la animación ("up", "down", "left", "right", "none"). Por defecto es "up".
 * - `delay`: Opcional, debe ser un número que indique el retardo de la animación en milisegundos. Por defecto es 0.
 * - `duration`: Opcional, debe ser un número que indique la duración de la animación en milisegundos. Por defecto es 700.
 * - `className`: Opcional, debe ser una cadena de texto que contenga clases CSS adicionales para personalizar el estilo del contenedor. Si no se proporciona, se aplicarán estilos por defecto.
 * - `once`: Opcional, debe ser un booleano que indique si la animación debe ocurrir solo la primera vez que el elemento entra en vista. Por defecto es true.
 * - `threshold`: Opcional, debe ser un número entre 0 y 1 que indique el porcentaje del elemento que debe ser visible para activar la animación. Por defecto es 0.15.
 */
ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(["up", "down", "left", "right", "none"]),
  delay: PropTypes.number,
  duration: PropTypes.number,
  className: PropTypes.string,
  once: PropTypes.bool,
  threshold: PropTypes.number,
};
