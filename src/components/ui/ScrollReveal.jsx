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
 @typedef {Object} ScrollRevealProps
 @property {React.ReactNode} children - Contenido a revelar.
 @property {string} [direction="up"] - Dirección de la animación ("up", "down", "left", "right", "none").
  @property {number} [delay=0] - Retardo de la animación en milisegundos.
  @property {number} [duration=700] - Duración de la animación en milisegundos.
  @property {string} [className=""] - Clases CSS adicionales para el contenedor.
  @property {boolean} [once=true] - Si la animación debe ocurrir solo la primera vez que el elemento entra en vista.
  @property {number} [threshold=0.15] - Porcentaje del elemento que debe ser visible para activar la animación (0 a 1).
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
