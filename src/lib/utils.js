import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Resuelve la ruta de una imagen de proyecto, manejando diferentes formatos de entrada.
 * @param {string} image - La ruta o URL de la imagen.
 * @returns {string|null} - La ruta de la imagen resuelta o null si es inválida.
 */
export function resolveProjectImagePath(image) {
  if (typeof image !== "string") {
    return null;
  }

  const normalizedImage = image.trim();

  if (normalizedImage === "") {
    return null;
  }

  if (
    normalizedImage.startsWith("http://") ||
    normalizedImage.startsWith("https://") ||
    normalizedImage.startsWith("data:") ||
    normalizedImage.startsWith("/")
  ) {
    return normalizedImage;
  }

  return `/images/${normalizedImage}`;
}
