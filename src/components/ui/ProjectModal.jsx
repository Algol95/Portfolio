import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Folder,
  Github,
  Linkedin,
  Play,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { resolveProjectImagePath, resolveProjectVideoPath } from "@/lib/utils";

/**
 * Componente de modal para mostrar detalles de un proyecto.
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.open - Indica si el modal está abierto.
 * @param {Object} props.project - El proyecto a mostrar.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @returns {JSX.Element|null} - El modal del proyecto o null si no está abierto.
 */
export default function ProjectModal({ open, project, onClose }) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isActiveVideoPlaying, setIsActiveVideoPlaying] = useState(false);
  const activeVideoRef = useRef(null);
  const images = Array.isArray(project?.images)
    ? project.images
        .map((image) => resolveProjectImagePath(image))
        .filter((image) => image !== null)
    : [];
  const videos = Array.isArray(project?.videos)
    ? project.videos
        .map((video, index) => {
          if (typeof video === "string") {
            const resolvedVideo = resolveProjectVideoPath(video);

            if (resolvedVideo === null) {
              return null;
            }

            return {
              src: resolvedVideo,
              key: `video-${index}-${resolvedVideo}`,
              poster: images[0] ?? null,
            };
          }

          if (video && typeof video === "object") {
            const resolvedVideo = resolveProjectVideoPath(video.src);

            if (resolvedVideo === null) {
              return null;
            }

            return {
              src: resolvedVideo,
              key: `video-${index}-${resolvedVideo}`,
              poster:
                resolveProjectImagePath(video.poster) ??
                resolveProjectImagePath(video.previewImage) ??
                images[0] ??
                null,
            };
          }

          return null;
        })
        .filter((video) => video !== null)
    : [];
  const mediaItems = [
    ...images.map((src, index) => ({
      type: "image",
      src,
      key: `image-${index}-${src}`,
    })),
    ...videos.map((video) => ({
      type: "video",
      src: video.src,
      key: video.key,
      poster: video.poster,
    })),
  ];
  const collaborators = Array.isArray(project?.collaborators)
    ? project.collaborators.filter(
        (collaborator) =>
          collaborator &&
          typeof collaborator.name === "string" &&
          collaborator.name.trim() !== "",
      )
    : [];
  const hasMedia = mediaItems.length > 0;
  const hasMultipleMedia = mediaItems.length > 1;
  const safeActiveMediaIndex = hasMedia
    ? Math.min(activeMediaIndex, mediaItems.length - 1)
    : 0;
  const activeMedia = hasMedia ? mediaItems[safeActiveMediaIndex] : null;

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

      if (event.key === "ArrowLeft" && hasMultipleMedia) {
        setIsActiveVideoPlaying(false);
        setActiveMediaIndex((previousIndex) => {
          if (previousIndex === 0) {
            return mediaItems.length - 1;
          }

          return previousIndex - 1;
        });
      }

      if (event.key === "ArrowRight" && hasMultipleMedia) {
        setIsActiveVideoPlaying(false);
        setActiveMediaIndex(
          (previousIndex) => (previousIndex + 1) % mediaItems.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, hasMultipleMedia, mediaItems.length]);

  if (!project) {
    return null;
  }

  const goToMedia = (nextIndex) => {
    setIsActiveVideoPlaying(false);
    setActiveMediaIndex(nextIndex);
  };

  const toggleActiveVideoPlayback = async () => {
    if (!activeVideoRef.current) {
      return;
    }

    if (activeVideoRef.current.paused) {
      try {
        await activeVideoRef.current.play();
      } catch {
        setIsActiveVideoPlaying(false);
      }

      return;
    }

    activeVideoRef.current.pause();
  };

  const showPreviousMedia = () => {
    setIsActiveVideoPlaying(false);
    setActiveMediaIndex((previousIndex) => {
      if (previousIndex === 0) {
        return mediaItems.length - 1;
      }

      return previousIndex - 1;
    });
  };

  const showNextMedia = () => {
    setIsActiveVideoPlaying(false);
    setActiveMediaIndex(
      (previousIndex) => (previousIndex + 1) % mediaItems.length,
    );
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
        className={`relative max-h-[90vh] w-full max-w-340 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl duration-500 ${
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
              {activeMedia ? (
                activeMedia.type === "video" ? (
                  <>
                    <video
                      key={activeMedia.key}
                      ref={activeVideoRef}
                      src={activeMedia.src}
                      poster={activeMedia.poster ?? undefined}
                      controls
                      preload="metadata"
                      playsInline
                      className="h-full w-full object-cover"
                      aria-label={`${project.title} video de demostracion`}
                      onPlay={() => setIsActiveVideoPlaying(true)}
                      onPause={() => setIsActiveVideoPlaying(false)}
                      onEnded={() => setIsActiveVideoPlaying(false)}
                    />
                    {!isActiveVideoPlaying ? (
                      <button
                        type="button"
                        onClick={toggleActiveVideoPlayback}
                        className="absolute left-1/2 top-1/2 z-10 inline-flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-background/80 text-foreground shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:bg-background cursor-pointer"
                        aria-label="Reproducir video"
                      >
                        <Play className="ml-1 h-7 w-7" fill="currentColor" />
                      </button>
                    ) : null}
                  </>
                ) : (
                  <img
                    src={activeMedia.src}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                )
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

              {hasMultipleMedia ? (
                <>
                  <button
                    type="button"
                    onClick={showPreviousMedia}
                    className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg transition-colors hover:bg-background cursor-pointer"
                    aria-label="Medio anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextMedia}
                    className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg transition-colors hover:bg-background cursor-pointer"
                    aria-label="Siguiente medio"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-background/70 px-3 py-2 backdrop-blur-sm">
                    {mediaItems.map((mediaItem, index) => (
                      <button
                        key={mediaItem.key}
                        type="button"
                        onClick={() => goToMedia(index)}
                        className={`h-2.5 w-2.5 rounded-full transition-all ${
                          index === safeActiveMediaIndex
                            ? "bg-primary ring-4 ring-primary/20"
                            : "bg-foreground/30 hover:bg-foreground/50"
                        }`}
                        aria-label={`Ir al ${mediaItem.type === "video" ? "video" : "medio"} ${index + 1}`}
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

              {collaborators.length > 0 ? (
                <div className="min-w-0 space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                    Colaboración
                  </h3>
                  <ul className="space-y-3">
                    {collaborators.map((collaborator) => (
                      <li
                        key={`${project.title}-${collaborator.name}`}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-background/50 px-4 py-3"
                      >
                        <span className="font-medium text-foreground">
                          {collaborator.name}
                        </span>
                        {collaborator.linkedin ? (
                          <a
                            href={collaborator.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                          >
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </a>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

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
 * @property {Array<string|Object>} project.videos - Lista de videos o configuraciones de video relacionadas con el proyecto.
 * @property {string} project.videos[].src - Ruta del video.
 * @property {string} project.videos[].poster - Ruta de la imagen previa del video.
 * @property {Array<Object>} project.collaborators - Lista de colaboradores del proyecto.
 * @property {string} project.collaborators[].name - Nombre del colaborador.
 * @property {string} project.collaborators[].linkedin - URL del perfil de LinkedIn del colaborador.
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
    videos: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          poster: PropTypes.string,
          previewImage: PropTypes.string,
        }),
      ]),
    ),
    collaborators: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        linkedin: PropTypes.string,
      }),
    ),
    github: PropTypes.string,
    live: PropTypes.string,
    featured: PropTypes.bool,
    status: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};
