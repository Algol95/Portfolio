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
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase">
            Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">Things I've Built</h2>
        </div>

        <div className="space-y-24 mb-24">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="aspect-video rounded-xl bg-linear-to-br from-primary/20 to-accent/20 border border-border overflow-hidden group">
                  <div className="w-full h-full flex items-center justify-center bg-card/50 group-hover:bg-card/30 transition-colors">
                    <div className="text-center p-8">
                      <Folder className="h-16 w-16 mx-auto text-primary/50 mb-4" />
                      <span className="text-muted-foreground font-mono text-sm">
                        Project Preview
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`space-y-4 ${index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}
              >
                <p className="text-primary font-mono text-sm">
                  Featured Project
                </p>
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed p-6 bg-card rounded-xl border border-border text-pretty">
                  {project.description}
                </p>
                <div
                  className={`flex flex-wrap gap-2 ${index % 2 === 1 ? "lg:justify-end" : ""}`}
                >
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div
                  className={`flex gap-4 pt-2 ${index % 2 === 1 ? "lg:justify-end" : ""}`}
                >
                  <a
                    href={project.github}
                    className="text-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={project.live}
                    className="text-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center">
            Otros proyectos destacables
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project) => (
              <Card
                key={project.title}
                className="group hover:border-primary/50 transition-all hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Folder className="h-10 w-10 text-primary" />
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a
                        href={project.live}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
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
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center pt-8">
            <Button variant="outline" asChild>
              <a
                href={projectsData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View More on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
