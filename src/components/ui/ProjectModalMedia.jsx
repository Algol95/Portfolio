import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight, Folder, Play } from "lucide-react";

/**
 * Componente que muestra el visor de medios del proyecto, incluyendo imágenes y videos.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.activeMedia - Medio activo que se está mostrando.
 * @param {boolean} props.isActiveVideoPlaying - Indica si el video activo se está reproduciendo.
 * @param {Function} props.onToggleActiveVideoPlayback - Función para alternar la reproducción del video activo.
 * @param {Function} props.onVideoEnded - Función que se llama cuando el video termina.
 * @param {Function} props.onVideoPause - Función que se llama cuando el video se pausa.
 * @param {Function} props.onVideoPlay - Función que se llama cuando el video se reproduce.
 * @param {string} props.projectTitle - Título del proyecto.
 * @param {Object} props.videoRef - Referencia al elemento de video.
 * @returns {JSX.Element} Elemento JSX que representa el visor de medios del proyecto.
 */
function ProjectMediaViewer({
  activeMedia,
  isActiveVideoPlaying,
  onToggleActiveVideoPlayback,
  onVideoEnded,
  onVideoPause,
  onVideoPlay,
  projectTitle,
  videoRef,
}) {
  if (!activeMedia) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/15 via-accent/10 to-secondary/40 p-8 text-center">
        <div className="space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-background/80 shadow-lg">
            <Folder className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Vista previa
            </p>
            <h3 className="text-2xl font-semibold">{projectTitle}</h3>
          </div>
        </div>
      </div>
    );
  }

  if (activeMedia.type === "video") {
    return (
      <>
        <video
          key={activeMedia.key}
          ref={videoRef}
          src={activeMedia.src}
          poster={activeMedia.poster ?? undefined}
          controls
          preload="metadata"
          playsInline
          className="h-full w-full object-cover"
          aria-label={`${projectTitle} video de demostracion`}
          onPlay={onVideoPlay}
          onPause={onVideoPause}
          onEnded={onVideoEnded}
        />
        {!isActiveVideoPlaying ? (
          <button
            type="button"
            onClick={onToggleActiveVideoPlayback}
            className="absolute left-1/2 top-1/2 z-10 hidden h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-background/80 text-foreground shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:bg-background cursor-pointer sm:inline-flex"
            aria-label="Reproducir video"
          >
            <Play className="ml-1 h-7 w-7" fill="currentColor" />
          </button>
        ) : null}
      </>
    );
  }

  return (
    <img
      src={activeMedia.src}
      alt={projectTitle}
      className="h-full w-full object-cover"
    />
  );
}

/**
 * Componente que muestra la navegación de medios del proyecto, incluyendo botones para avanzar, retroceder y seleccionar medios específicos.
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.activeMediaIndex - Índice del medio activo.
 * @param {boolean} props.hasMultipleMedia - Indica si hay múltiples medios disponibles.
 * @param {Array<Object>} props.mediaItems - Lista de medios disponibles.
 * @param {Function} props.onNext - Función para ir al siguiente medio.
 * @param {Function} props.onPrevious - Función para ir al medio anterior.
 * @param {Function} props.onSelect - Función para seleccionar un medio específico.
 * @returns {JSX.Element|null} Elemento JSX que representa la navegación de medios del proyecto o null si no hay múltiples medios.
 */
function ProjectMediaNavigation({
  activeMediaIndex,
  hasMultipleMedia,
  mediaItems,
  onNext,
  onPrevious,
  onSelect,
}) {
  if (!hasMultipleMedia) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={onPrevious}
        className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg transition-colors hover:bg-background cursor-pointer"
        aria-label="Medio anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={onNext}
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
            onClick={() => onSelect(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              index === activeMediaIndex
                ? "bg-primary ring-4 ring-primary/20"
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Ir al ${mediaItem.type === "video" ? "video" : "medio"} ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}

/** Componente que muestra el medio activo del proyecto en un modal, incluyendo navegación para múltiples medios y controles de reproducción para videos.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.activeMedia - Medio activo que se está mostrando.
 * @param {number} props.activeMediaIndex - Índice del medio activo.
 * @param {boolean} props.hasMultipleMedia - Indica si hay múltiples medios disponibles.
 * @param {boolean} props.isActiveVideoPlaying - Indica si el video activo se está reproduciendo.
 * @param {Array<Object>} props.mediaItems - Lista de medios disponibles.
 * @param {Function} props.onNext - Función para ir al siguiente medio.
 * @param {Function} props.onPrevious - Función para ir al medio anterior.
 * @param {Function} props.onSelect - Función para seleccionar un medio específico.
 * @param {Function} props.onToggleActiveVideoPlayback - Función para alternar la reproducción del video activo.
 * @param {Function} props.onVideoEnded - Función que se llama cuando el video termina.
 * @param {Function} props.onVideoPause - Función que se llama cuando el video se pausa.
 * @param {Function} props.onVideoPlay - Función que se llama cuando el video se reproduce.
 * @param {string} props.projectTitle - Título del proyecto.
 * @param {Object} props.videoRef - Referencia al elemento de video.
 * @returns {JSX.Element} Elemento JSX que representa el medio activo del proyecto en un modal.
 */
export default function ProjectModalMedia({
  activeMedia,
  activeMediaIndex,
  hasMultipleMedia,
  isActiveVideoPlaying,
  mediaItems,
  onNext,
  onPrevious,
  onSelect,
  onToggleActiveVideoPlayback,
  onVideoEnded,
  onVideoPause,
  onVideoPlay,
  projectTitle,
  videoRef,
}) {
  return (
    <div className="relative min-w-0 min-h-65 bg-linear-to-br from-primary/20 via-accent/10 to-background">
      <div className="relative aspect-4/3 h-full min-h-65 w-full overflow-hidden lg:min-h-full">
        <ProjectMediaViewer
          activeMedia={activeMedia}
          isActiveVideoPlaying={isActiveVideoPlaying}
          onToggleActiveVideoPlayback={onToggleActiveVideoPlayback}
          onVideoEnded={onVideoEnded}
          onVideoPause={onVideoPause}
          onVideoPlay={onVideoPlay}
          projectTitle={projectTitle}
          videoRef={videoRef}
        />

        <ProjectMediaNavigation
          activeMediaIndex={activeMediaIndex}
          hasMultipleMedia={hasMultipleMedia}
          mediaItems={mediaItems}
          onNext={onNext}
          onPrevious={onPrevious}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}

/**
 * Definición de las propTypes para el componente ProjectModalMedia, asegurando que las propiedades recibidas sean del tipo esperado y proporcionando una mejor documentación y validación de tipos en tiempo de desarrollo.
 * @typedef {Object} ProjectModalMediaProps
 * @property {Object} activeMedia - Medio activo que se está mostrando, con propiedades clave, tipo, fuente y poster.
 * @property {number} activeMediaIndex - Índice del medio activo en la lista de medios disponibles.
 * @property {boolean} hasMultipleMedia - Indica si hay múltiples medios disponibles para el proyecto.
 * @property {boolean} isActiveVideoPlaying - Indica si el video activo se está reproduciendo actualmente.
 * @property {Array<Object>} mediaItems - Lista de medios disponibles para el proyecto, cada uno con propiedades clave y tipo.
 * @property {Function} onNext - Función que se llama para ir al siguiente medio en la lista.
 * @property {Function} onPrevious - Función que se llama para ir al medio anterior en la lista.
 * @property {Function} onSelect - Función que se llama para seleccionar un medio específico de la lista, recibiendo el índice del medio seleccionado.
 * @property {Function} onToggleActiveVideoPlayback - Función que se llama para alternar la reproducción del video activo, iniciando o pausando el video según su estado actual.
 * @property {Function} onVideoEnded - Función que se llama cuando el video activo termina de reproducirse.
 * @property {Function} onVideoPause - Función que se llama cuando el video activo se pausa.
 * @property {Function} onVideoPlay - Función que se llama cuando el video activo comienza a reproducirse.
 * @property {string} projectTitle - Título del proyecto, utilizado para proporcionar contexto en los elementos de la interfaz relacionados con el medio.
 * @property {Object} videoRef - Referencia al elemento de video activo, utilizada para controlar la reproducción del video desde funciones externas.
 * @returns {JSX.Element} Elemento JSX que representa el medio activo del proyecto en un modal, incluyendo navegación para múltiples medios y controles de reproducción para videos.
 */
ProjectModalMedia.propTypes = {
  activeMedia: PropTypes.shape({
    key: PropTypes.string.isRequired,
    poster: PropTypes.string,
    src: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["image", "video"]).isRequired,
  }),
  activeMediaIndex: PropTypes.number.isRequired,
  hasMultipleMedia: PropTypes.bool.isRequired,
  isActiveVideoPlaying: PropTypes.bool.isRequired,
  mediaItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["image", "video"]).isRequired,
    }),
  ).isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onToggleActiveVideoPlayback: PropTypes.func.isRequired,
  onVideoEnded: PropTypes.func.isRequired,
  onVideoPause: PropTypes.func.isRequired,
  onVideoPlay: PropTypes.func.isRequired,
  projectTitle: PropTypes.string,
  videoRef: PropTypes.shape({ current: PropTypes.any }),
};
