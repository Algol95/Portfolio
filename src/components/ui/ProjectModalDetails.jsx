import PropTypes from "prop-types";
import { ExternalLink, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Define una función para obtener los colaboradores de un proyecto, filtrando aquellos que no tienen un nombre válido.
 * @param {Array} collaborators - Lista de colaboradores del proyecto.
 * @returns {Array} - Lista de colaboradores válidos.
 */
function getProjectCollaborators(collaborators) {
  return Array.isArray(collaborators)
    ? collaborators.filter(
        (collaborator) =>
          collaborator &&
          typeof collaborator.name === "string" &&
          collaborator.name.trim() !== "",
      )
    : [];
}

/**
 * Componente que renderiza la sección de colaboradores de un proyecto.
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.collaborators - Lista de colaboradores válidos del proyecto.
 * @param {string} props.projectTitle - Título del proyecto.
 * @returns {JSX.Element|null} - Elemento JSX que representa la sección de colaboradores o null si no hay colaboradores.
 */
function ProjectCollaboratorsSection({ collaborators, projectTitle }) {
  if (collaborators.length === 0) {
    return null;
  }

  return (
    <div className="min-w-0 space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
        Colaboración
      </h3>
      <ul className="space-y-3">
        {collaborators.map((collaborator) => (
          <li
            key={`${projectTitle}-${collaborator.name}`}
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
  );
}

/**
 * Componente que renderiza los detalles de un proyecto en un modal.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.project - Objeto que contiene la información del proyecto.
 * @returns {JSX.Element} - Elemento JSX que representa los detalles del proyecto.
 */
export default function ProjectModalDetails({ project }) {
  const collaborators = getProjectCollaborators(project?.collaborators);

  return (
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
          <div
            className="min-w-0 wrap-break-word text-base leading-relaxed text-muted-foreground text-justify"
            dangerouslySetInnerHTML={{
              __html: project.detailedDescription ?? project.description,
            }}
          />
        </div>

        {Array.isArray(project.highlights) && project.highlights.length > 0 ? (
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

        <ProjectCollaboratorsSection
          collaborators={collaborators}
          projectTitle={project.title}
        />

        <div className="mt-auto flex min-w-0 flex-wrap gap-3 pt-2">
          {project.live ? (
            <Button asChild>
              <a href={project.live} target="_blank" rel="noopener noreferrer">
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
  );
}

/**
 * Definición de las propTypes para el componente ProjectModalDetails y ProjectCollaboratorsSection, asegurando que las propiedades recibidas sean del tipo esperado y proporcionando una mejor documentación y validación de tipos en tiempo de desarrollo.
 * @typedef {Object} ProjectModalDetailsProps
 * @property {Object} project - Objeto que contiene la información del proyecto.
 * @property {string} project.title - El título del proyecto.
 * @property {string} project.description - Una breve descripción del proyecto.
 * @property {string} project.detailedDescription - Una descripción más detallada del proyecto.
 * @property {Array<string>} project.technologies - Lista de tecnologías utilizadas en el proyecto.
 * @property {Array<string>} project.highlights - Lista de puntos destacados del proyecto.
 * @property {Array<Object>} project.collaborators - Lista de colaboradores del proyecto.
 * @property {string} project.collaborators[].name - Nombre del colaborador.
 * @property {string} project.collaborators[].linkedin - URL del perfil de LinkedIn del colaborador.
 * @property {string} project.github - URL del repositorio de GitHub del proyecto.
 * @property {string} project.live - URL del proyecto en vivo.
 *
 * @typedef {Object} ProjectCollaboratorsSectionProps
 * @property {Array<Object>} collaborators - Lista de colaboradores válidos del proyecto.
 * @property {string} projectTitle - Título del proyecto, utilizado para generar claves únicas en la lista de colaboradores.
 */
ProjectModalDetails.propTypes = {
  project: PropTypes.shape({
    collaborators: PropTypes.arrayOf(
      PropTypes.shape({
        linkedin: PropTypes.string,
        name: PropTypes.string.isRequired,
      }),
    ),
    description: PropTypes.string,
    detailedDescription: PropTypes.string,
    featured: PropTypes.bool,
    github: PropTypes.string,
    highlights: PropTypes.arrayOf(PropTypes.string),
    live: PropTypes.string,
    status: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
  }).isRequired,
};

/**
 * Definición de las propTypes para el componente ProjectCollaboratorsSection, asegurando que las propiedades recibidas sean del tipo esperado y proporcionando una mejor documentación y validación de tipos en tiempo de desarrollo.
 * @typedef {Object} ProjectCollaboratorsSectionProps
 * @property {Array<Object>} collaborators - Lista de colaboradores válidos del proyecto.
 * @property {string} projectTitle - Título del proyecto, utilizado para generar claves únicas en la lista de colaboradores.
 */
ProjectCollaboratorsSection.propTypes = {
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      linkedin: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  projectTitle: PropTypes.string,
};
