import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Componente de selección personalizada que permite a los usuarios elegir una opción de una lista desplegable. El componente maneja su propio estado para controlar la apertura y cierre del menú, así como la selección de opciones. Utiliza referencias para detectar clics fuera del componente y cerrar el menú automáticamente, y también maneja eventos de teclado para mejorar la accesibilidad.
 * @param {Object} props - Las propiedades del componente.
 * @param {string} [props.className] - Clases adicionales para personalizar el estilo del componente.
 * @param {boolean} [props.disabled] - Indica si el componente está deshabilitado.
 * @param {string} [props.id] - Identificador único para el componente.
 * @param {boolean} [props.invalid] - Indica si el valor seleccionado es inválido.
 * @param {function} props.onValueChange - Función que se llama cuando cambia el valor seleccionado.
 * @param {Array} props.options - Lista de opciones disponibles para seleccionar.
 * @param {string} [props.placeholder] - Texto que se muestra cuando no hay ninguna opción seleccionada.
 * @param {*} props.value - Valor actualmente seleccionado.
 * @returns {JSX.Element} Componente de selección.
 */
export function Select({
  className,
  disabled = false,
  id,
  invalid = false,
  onValueChange,
  options,
  placeholder = "Selecciona una opción",
  value,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (nextValue) => {
    onValueChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={invalid ? "true" : "false"}
        className={cn(
          "border-input text-foreground dark:bg-input/30 flex h-9 w-full items-center justify-between rounded-md border bg-background/50 px-3 py-1 text-left text-sm shadow-xs transition-[color,box-shadow] outline-none",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        )}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <span
          className={cn(
            "truncate",
            selectedOption ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        />
      </button>

      {isOpen ? (
        <div
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-border/70 bg-card/95 p-1.5 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.45)] backdrop-blur-xl"
          role="listbox"
          aria-labelledby={id}
        >
          <div className="max-h-64 overflow-y-auto">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    isSelected
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/90 hover:bg-secondary/80 hover:text-foreground",
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  <span>{option.label}</span>
                  <Check
                    className={cn(
                      "h-4 w-4 shrink-0 transition-opacity",
                      isSelected ? "opacity-100" : "opacity-0",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * PropTypes para el componente Select, que definen los tipos de las propiedades esperadas y si son requeridas o no. Esto ayuda a garantizar que el componente se utilice correctamente y facilita la detección de errores durante el desarrollo.
 * @type {Object} PropTypes - Objeto que define los tipos de las propiedades del componente.
 * @property {string} [className] - Clases adicionales para personalizar el estilo del componente.
 * @property {boolean} [disabled] - Indica si el componente está deshabilitado.
 * @property {string} [id] - Identificador único para el componente.
 * @property {boolean} [invalid] - Indica si el valor seleccionado es inválido.
 * @property {function} onValueChange - Función que se llama cuando cambia el valor seleccionado. Es requerida.
 * @property {Array} options - Lista de opciones disponibles para seleccionar. Cada opción debe ser un objeto con propiedades 'label' (cadena) y 'value' (cadena). Es requerida.
 * @property {string} [placeholder] - Texto que se muestra cuando no hay ninguna opción seleccionada.
 * @property {*} value - Valor actualmente seleccionado.
 * @returns {JSX.Element} Componente de selección.
 */
Select.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  invalid: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
