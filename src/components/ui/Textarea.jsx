import * as React from "react";

import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

/**
 * Componente de área de texto personalizada que permite a los usuarios ingresar texto en varias líneas. El componente maneja su propio estado para controlar el valor del área de texto y utiliza referencias para mejorar la accesibilidad. Además, aplica estilos personalizados para mejorar la apariencia y la experiencia del usuario, incluyendo estados de enfoque y deshabilitado.
 * @param {Object} props - Las propiedades del componente.
 * @param {string} [props.className] - Clases adicionales para personalizar el estilo del componente.
 * @param {boolean} [props.disabled] - Indica si el componente está deshabilitado.
 * @param {string} [props.id] - Identificador único para el componente.
 * @param {boolean} [props.invalid] - Indica si el valor ingresado es inválido.
 * @returns {JSX.Element} Componente de área de texto.
 */
const Textarea = React.forwardRef(function Textarea(
  { className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
});

export { Textarea };

/**
 * Definición de las propiedades esperadas para el componente Textarea, utilizando PropTypes para validar los tipos de datos y proporcionar documentación sobre las propiedades que el componente acepta. Esto ayuda a los desarrolladores a entender cómo usar el componente correctamente y a detectar posibles errores de tipo durante el desarrollo.
 * @type {Object} PropTypes - Objeto que define los tipos de las propiedades del componente.
 * @property {string} [className] - Clases adicionales para personalizar el estilo del componente.
 * @property {boolean} [disabled] - Indica si el componente está deshabilitado.
 * @property {string} [id] - Identificador único para el componente.
 * @property {boolean} [invalid] - Indica si el valor ingresado es inválido.
 * @returns {JSX.Element} Componente de área de texto.
 */
Textarea.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  invalid: PropTypes.bool,
};
