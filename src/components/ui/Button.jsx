import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

/**
 * Variantes de estilos para el componente Button, utilizando class-variance-authority para gestionar las clases CSS de manera eficiente y escalable.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Componente de botón reutilizable con variantes y tamaños configurables.
 * @param {Object} props - Las propiedades del componente.
 * @param {string} [props.variant] - La variante del botón (default, destructive, outline, secondary, ghost, link).
 * @param {string} [props.size] - El tamaño del botón (default, sm, lg, icon, icon-sm, icon-lg).
 * @param {boolean} [props.asChild] - Si es true, renderiza el botón como un Slot para permitir personalización.
 * @param {string} [props.className] - Clases adicionales para personalizar el estilo del botón.
 * @returns {JSX.Element} El componente de botón.
 */
function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

/**
 * Definición de las propTypes para el componente Button, asegurando que se reciban las propiedades correctas y proporcionando documentación clara sobre los tipos esperados.
 * - `variant`: Opcional, debe ser una cadena que indique la variante del botón ("default", "destructive", "outline", "secondary", "ghost", "link"). Por defecto es "default".
 * - `size`: Opcional, debe ser una cadena que indique el tamaño del botón ("default", "sm", "lg", "icon", "icon-sm", "icon-lg"). Por defecto es "default".
 * - `asChild`: Opcional, debe ser un booleano que indique si el botón se renderiza como un Slot para permitir personalización. Por defecto es false.
 * - `className`: Opcional, debe ser una cadena de texto que contenga clases CSS adicionales para personalizar el estilo del botón. Si no se proporciona, se aplicarán estilos por defecto.
 */
Button.propTypes = {
  variant: PropTypes.oneOf([
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
  ]),
  size: PropTypes.oneOf(["default", "sm", "lg", "icon", "icon-sm", "icon-lg"]),
  asChild: PropTypes.bool,
  className: PropTypes.string,
};

export { Button };
