import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Folder,
  Github,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { resolveProjectImagePath } from "@/lib/utils";

/**
 * Componente de modal para mostrar detalles de un proyecto.
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.open - Indica si el modal está abierto.
 * @param {Object} props.project - El proyecto a mostrar.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @returns {JSX.Element|null} - El modal del proyecto o null si no está abierto.
 */
export default function ProjectModal({ open, project, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = Array.isArray(project?.images)
    ? project.images
        .map((image) => resolveProjectImagePath(image))
        .filter((image) => image !== null)
    : [];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;
  const safeActiveImageIndex = hasImages
    ? Math.min(activeImageIndex, images.length - 1)
    : 0;
  const activeImage = hasImages ? images[safeActiveImageIndex] : null;

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft" && hasMultipleImages) {
        setActiveImageIndex((previousIndex) => {
          if (previousIndex === 0) {
            return images.length - 1;
          }

          return previousIndex - 1;
        });
      }

      if (event.key === "ArrowRight" && hasMultipleImages) {
        setActiveImageIndex(
          (previousIndex) => (previousIndex + 1) % images.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, hasMultipleImages, images.length]);

  if (!project) {
    return null;
  }

  const showPreviousImage = () => {
    setActiveImageIndex((previousIndex) => {
      if (previousIndex === 0) {
        return images.length - 1;
      }

      return previousIndex - 1;
    });
  };

  const showNextImage = () => {
    setActiveImageIndex((previousIndex) => (previousIndex + 1) % images.length);
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden bg-background/70 p-3 sm:p-4 backdrop-blur-sm duration-500 ${
        open ? "animate-in fade-in-0" : "animate-out fade-out-0"
      }`}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl duration-500 ${
          open
            ? "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4"
            : "animate-out fade-out-0 zoom-out-95 slide-out-to-bottom-4"
        }`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-background/80 text-foreground transition-colors hover:bg-background cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="modal-scrollbar grid max-h-[90vh] overflow-y-auto overflow-x-hidden lg:overflow-hidden lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="relative min-w-0 min-h-65 bg-linear-to-br from-primary/20 via-accent/10 to-background">
            <div className="relative aspect-4/3 h-full min-h-65 w-full overflow-hidden lg:min-h-full">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/15 via-accent/10 to-secondary/40 p-8 text-center">
                  <div className="space-y-4">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-background/80 shadow-lg">
                      <Folder className="h-10 w-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                        Vista previa
                      </p>
                      <h3 className="text-2xl font-semibold">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              {hasMultipleImages ? (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg transition-colors hover:bg-background cursor-pointer"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg transition-colors hover:bg-background cursor-pointer"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-background/70 px-3 py-2 backdrop-blur-sm">
                    {images.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className={`h-2.5 w-2.5 rounded-full transition-all ${
                          index === safeActiveImageIndex
                            ? "bg-primary ring-4 ring-primary/20"
                            : "bg-foreground/30 hover:bg-foreground/50"
                        }`}
                        aria-label={`Ir a la imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div className="modal-scrollbar min-w-0 overflow-x-hidden p-5 sm:p-7 lg:max-h-[90vh] lg:overflow-y-auto lg:p-10">
            <div className="flex min-w-0 flex-col gap-6">
              <div className="min-w-0 space-y-3 pr-10 sm:pr-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-primary">
                    {project.featured ? "Proyecto destacado" : "Proyecto"}
                  </span>
                  {project.status ? (
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                      {project.status}
                    </span>
                  ) : null}
                </div>
                <h2 className="min-w-0 wrap-break-word text-2xl font-bold text-balance sm:text-3xl">
                  {project.title}
                </h2>
                <p className="min-w-0 wrap-break-word text-base leading-relaxed text-muted-foreground text-justify">
                  {project.detailedDescription ?? project.description}
                </p>
              </div>

              {Array.isArray(project.highlights) &&
              project.highlights.length > 0 ? (
                <div className="min-w-0 space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                    Qué incluye
                  </h3>
                  <ul className="min-w-0 space-y-2 text-sm text-muted-foreground">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span className="wrap-break-word">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="min-w-0 space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                  Stack
                </h3>
                <div className="flex min-w-0 flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex min-w-0 flex-wrap gap-3 pt-2">
                {project.live ? (
                  <Button asChild>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver proyecto
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null}
                {project.github ? (
                  <Button variant="outline" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Código fuente
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/**
 * PropTypes para el componente ProjectModal, definiendo las formas esperadas de las props y sus tipos.
 * @typedef {Object} ProjectModalProps
 * @property {boolean} open - Indica si el modal está abierto o cerrado.
 * @property {Object} project - Objeto que contiene los detalles del proyecto a mostrar en el modal.
 * @property {string} project.title - El título del proyecto.
 * @property {string} project.description - Una breve descripción del proyecto.
 * @property {string} project.detailedDescription - Una descripción más detallada del proyecto.
 * @property {Array<string>} project.technologies - Lista de tecnologías utilizadas en el proyecto.
 * @property {Array<string>} project.highlights - Lista de puntos destacados del proyecto.
 * @property {Array<string>} project.images - Lista de rutas de imágenes relacionadas con el proyecto.
 * @property {string} project.github - URL del repositorio de GitHub del proyecto.
 * @property {string} project.live - URL del proyecto en vivo.
 * @property {boolean} project.featured - Indica si el proyecto está destacado.
 * @property {string} project.status - Estado del proyecto.
 * @property {Function} onClose - Función que se llama para cerrar el modal.
 * @returns {JSX.Element|null} El componente del modal del proyecto o null si no está abierto.
 */
ProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  project: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    detailedDescription: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
    highlights: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(PropTypes.string),
    github: PropTypes.string,
    live: PropTypes.string,
    featured: PropTypes.bool,
    status: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};
