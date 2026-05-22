import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import ProjectModalDetails from "@/components/ui/ProjectModalDetails";
import ProjectModalMedia from "@/components/ui/ProjectModalMedia";
import { useProjectModalMedia } from "@/hooks/use-project-modal-media";

/**
 * Componente de modal para mostrar detalles de un proyecto.
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.open - Indica si el modal está abierto.
 * @param {Object} props.project - El proyecto a mostrar.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @returns {JSX.Element|null} - El modal del proyecto o null si no está abierto.
 */
export default function ProjectModal({ open, project, onClose }) {
  const {
    activeMedia,
    activeMediaIndex,
    activeVideoRef,
    hasMultipleMedia,
    isActiveVideoPlaying,
    mediaItems,
    goToMedia,
    setIsActiveVideoPlaying,
    showNextMedia,
    showPreviousMedia,
    toggleActiveVideoPlayback,
  } = useProjectModalMedia({ open, onClose, project });

  if (!project) {
    return null;
  }

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
          <ProjectModalMedia
            activeMedia={activeMedia}
            activeMediaIndex={activeMediaIndex}
            hasMultipleMedia={hasMultipleMedia}
            isActiveVideoPlaying={isActiveVideoPlaying}
            mediaItems={mediaItems}
            onNext={showNextMedia}
            onPrevious={showPreviousMedia}
            onSelect={goToMedia}
            onToggleActiveVideoPlayback={toggleActiveVideoPlayback}
            onVideoEnded={() => setIsActiveVideoPlaying(false)}
            onVideoPause={() => setIsActiveVideoPlaying(false)}
            onVideoPlay={() => setIsActiveVideoPlaying(true)}
            projectTitle={project.title}
            videoRef={activeVideoRef}
          />

          <ProjectModalDetails project={project} />
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
  }),
  onClose: PropTypes.func.isRequired,
};
