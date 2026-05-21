import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import projectsData from "@/data/projects.json";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
import ScrollReveal from "./ui/ScrollReveal";

const featuredProjects = projectsData.projects.filter(
  (project) => project.featured,
);
const otherProjects = projectsData.projects.filter(
  (project) => !project.featured,
);

/**
 * Componente de proyectos que muestra una sección con proyectos destacados y otros proyectos notables.
 * @returns {JSX.Element} Componente de proyectos.
 */
export function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const openProjectDetails = (project) => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const closeProjectDetails = () => {
    setIsProjectModalOpen(false);
    closeTimeoutRef.current = window.setTimeout(() => {
      setSelectedProject(null);
      closeTimeoutRef.current = null;
    }, 220);
  };

  const handleProjectCardKeyDown = (event, project) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectDetails(project);
    }
  };

  const preventModalOpen = (event) => {
    event.stopPropagation();
  };

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal
          className="space-y-4 mb-16"
          direction="up"
          delay={100}
          duration={800}
        >
          <p className="text-primary font-mono text-sm tracking-wider uppercase">
            Proyectos
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Proyectos que he desarrollado
          </h2>
        </ScrollReveal>

        <div className="space-y-24 mb-24">
          {featuredProjects.map((project, index) => (
            <ScrollReveal
              key={project.title}
              direction="up"
              delay={200}
              duration={800}
            >
              <FeaturedProjectCard
                index={index}
                project={project}
                onOpen={openProjectDetails}
                onProjectKeyDown={handleProjectCardKeyDown}
                onPreventOpen={preventModalOpen}
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal
          className="space-y-8"
          direction="up"
          delay={200}
          duration={800}
        >
          <h3 className="text-2xl font-bold text-center">
            Otros proyectos destacables
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project) => (
              <article key={project.title}>
                <Card
                  role="button"
                  tabIndex={0}
                  onClick={() => openProjectDetails(project)}
                  onKeyDown={(event) =>
                    handleProjectCardKeyDown(event, project)
                  }
                  aria-label={`Ver detalles del proyecto ${project.title}`}
                  className="group cursor-pointer hover:border-primary/50 transition-all hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Folder className="h-10 w-10 text-primary" />
                      <div className="flex gap-3">
                        {project.github ? (
                          <a
                            href={project.github}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            onClick={preventModalOpen}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        ) : null}
                        {project.live ? (
                          <a
                            href={project.live}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            onClick={preventModalOpen}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-pretty">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary/80">
                        Abrir detalle del proyecto
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
          <div className="text-center pt-8">
            <Button variant="outline" asChild>
              <a
                href="https://github.com/Algol95"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver más en GitHub
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>

      <ProjectModal
        key={
          selectedProject?.id ??
          selectedProject?.slug ??
          selectedProject?.title ??
          "project-modal"
        }
        open={isProjectModalOpen}
        project={selectedProject}
        onClose={closeProjectDetails}
      />
    </section>
  );
}
