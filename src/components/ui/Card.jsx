import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Componente de card reutilizable para mostrar información de proyectos, experiencias u otros contenidos en el portafolio.
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.className] - Clases CSS adicionales para el contenedor de la card.
 * @returns {JSX.Element} Componente de card.
 */
function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Componente de encabezado de card reutilizable.
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.className] - Clases CSS adicionales para el contenedor del encabezado.
 * @returns {JSX.Element} Componente de encabezado de card.
 */
function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Componente de título de card reutilizable.
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.className] - Clases CSS adicionales para el contenedor del título.
 * @returns {JSX.Element} Componente de título de card.
 */
function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}
/**
 * Componente de descripción de card reutilizable.
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.className] - Clases CSS adicionales para el contenedor de la descripción.
 * @returns {JSX.Element} Componente de descripción de card.
 */
function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

/**
 * Componente de acción de card reutilizable.
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.className] - Clases CSS adicionales para el contenedor de la acción.
 * @returns {JSX.Element} Componente de acción de card.
 */
function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Componente de contenido de card reutilizable.
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.className] - Clases CSS adicionales para el contenedor del contenido.
 * @returns {JSX.Element} Componente de contenido de card.
 */
function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

/**
 * Componente de pie de card reutilizable.
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.className] - Clases CSS adicionales para el contenedor del pie.
 * @returns {JSX.Element} Componente de pie de card.
 */
function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
