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

/**
 * Resuelve la ruta de un video de proyecto, manejando diferentes formatos de entrada.
 * @param {string} video - La ruta o URL del video.
 * @returns {string|null} - La ruta del video resuelta o null si es inválida.
 */
export function resolveProjectVideoPath(video) {
  if (typeof video !== "string") {
    return null;
  }

  const normalizedVideo = video.trim();

  if (normalizedVideo === "") {
    return null;
  }

  if (
    normalizedVideo.startsWith("http://") ||
    normalizedVideo.startsWith("https://") ||
    normalizedVideo.startsWith("data:") ||
    normalizedVideo.startsWith("/")
  ) {
    return normalizedVideo;
  }

  return `/videos/${normalizedVideo}`;
}
