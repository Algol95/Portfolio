import PropTypes from "prop-types";
import { ArrowUpRight, ExternalLink, Folder, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { resolveProjectImagePath } from "@/lib/utils";

/**
 * Obtiene la imagen de vista previa de un proyecto.
 * @param {Object} project - Datos del proyecto.
 * @returns {string} Ruta de la imagen de vista previa del proyecto.
 */
function getProjectPreviewImage(project) {
  if (Array.isArray(project.images)) {
    const firstImage = project.images.find(
      (image) => typeof image === "string" && image.trim() !== "",
    );

    if (firstImage) {
      return resolveProjectImagePath(firstImage);
    }
  }

  return resolveProjectImagePath(project.image);
}

/**
 * Componente de tarjeta de proyecto destacado.
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.index - Índice del proyecto en la lista.
 * @param {Object} props.project - Datos del proyecto.
 * @param {Function} props.onOpen - Función para abrir los detalles del proyecto.
 * @param {Function} props.onProjectKeyDown - Función para manejar eventos de teclado en la tarjeta del proyecto.
 * @param {Function} props.onPreventOpen - Función para prevenir la apertura del modal.
 * @returns {JSX.Element} Componente de tarjeta de proyecto destacado.
 */
export default function FeaturedProjectCard({
  index,
  project,
  onOpen,
  onProjectKeyDown,
  onPreventOpen,
}) {
  const isReversed = index % 2 === 1;
  const previewImage = getProjectPreviewImage(project);

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(event) => onProjectKeyDown(event, project)}
      aria-label={`Ver detalles del proyecto ${project.title}`}
      className="group relative overflow-hidden rounded-4xl border-border/70 bg-card/95 py-0 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_80px_-40px_rgba(34,99,214,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.18),transparent_34%)] opacity-80" />
      <div className="relative grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div
          className={`relative min-h-65 overflow-hidden border-b border-border/70 bg-linear-to-br from-primary/15 via-accent/10 to-background sm:min-h-80 lg:min-h-105 ${
            isReversed
              ? "lg:order-2 lg:border-b-0 lg:border-l"
              : "lg:border-b-0 lg:border-r"
          }`}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/15 via-accent/10 to-secondary/35 p-8 text-center">
              <div className="space-y-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-background/85 shadow-lg">
                  <Folder className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary/80">
                    Vista previa
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {project.title}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 rounded-[1.4rem] border border-white/15 bg-background/72 px-4 py-4 backdrop-blur-md">
            <div className="space-y-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary/80">
                Haz click para ver más detalles
              </p>
              <p className="text-sm text-foreground/90">
                Descubre más detalles del proyecto{" "}
                <span className=" text-primary">{project.title}</span>.
              </p>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-foreground/90 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
        </div>

        <CardContent className="relative flex min-h-full flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                Destacado
              </span>
              {project.status ? (
                <span className="rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {project.status}
                </span>
              ) : null}
            </div>

            <div className="space-y-4">
              <h3 className="max-w-xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                {project.title}
              </h3>
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary/12 bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3">
              {project.github ? (
                <a
                  href={project.github}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  onClick={onPreventOpen}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  Código
                </a>
              ) : null}
              {project.live ? (
                <a
                  href={project.live}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/40 hover:bg-primary/15"
                  onClick={onPreventOpen}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver proyecto
                </a>
              ) : null}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

/**
 * PropTypes para el componente FeaturedProjectCard.
 * @typedef {Object} FeaturedProjectCardProps
 * @property {number} index - Índice del proyecto en la lista.
 * @property {Object} project - Datos del proyecto.
 * @property {Function} onOpen - Función para abrir los detalles del proyecto.
 * @property {Function} onProjectKeyDown - Función para manejar eventos de teclado en la tarjeta del proyecto.
 * @property {Function} onPreventOpen - Función para prevenir la apertura del modal.
 */
FeaturedProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  project: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    github: PropTypes.string,
    live: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
  onProjectKeyDown: PropTypes.func.isRequired,
  onPreventOpen: PropTypes.func.isRequired,
};
