import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

/**
 * Componente de entrada personalizada que permite a los usuarios ingresar texto en una sola línea. El componente maneja su propio estado para controlar el valor de la entrada y utiliza referencias para mejorar la accesibilidad. Además, aplica estilos personalizados para mejorar la apariencia y la experiencia del usuario, incluyendo estados de enfoque y deshabilitado.
 * @param {Object} props - Las propiedades del componente.
 * @param {string} [props.className] - Clases adicionales para personalizar el estilo del componente.
 * @param {string} [props.type] - Tipo de entrada (por ejemplo, "text", "password", "email").
 * @returns {JSX.Element} Componente de entrada.
 */
const Input = React.forwardRef(function Input(
  { className, type, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
});

/**
 * Definición de las propiedades esperadas para el componente Input, utilizando PropTypes para validar los tipos de datos y proporcionar documentación sobre las propiedades que el componente acepta. Esto ayuda a los desarrolladores a entender cómo usar el componente correctamente y a detectar posibles errores de tipo durante el desarrollo.
 * @type {Object} PropTypes - Objeto que define los tipos de las propiedades del componente.
 * @property {string} [className] - Clases adicionales para personalizar el estilo del componente.
 * @property {string} [type] - Tipo de entrada (por ejemplo, "text", "password", "email").
 * @returns {JSX.Element} Componente de entrada.
 */
Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

export { Input };
