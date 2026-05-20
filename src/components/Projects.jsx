import { ExternalLink, Github, Folder } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featuredProjects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management, secure payment processing, and an intuitive admin dashboard.",
    image: null,
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    github: "#",
    live: "#",
  },
  {
    title: "AI Task Manager",
    description:
      "Smart task management app that uses AI to prioritize tasks, suggest deadlines, and improve productivity through intelligent automation.",
    image: null,
    technologies: ["React", "OpenAI API", "Firebase", "Tailwind"],
    github: "#",
    live: "#",
  },
  {
    title: "Real-Time Dashboard",
    description:
      "Interactive analytics dashboard featuring live data visualization, customizable widgets, and automated reporting capabilities.",
    image: null,
    technologies: ["React", "D3.js", "WebSocket", "Express"],
    github: "#",
    live: "#",
  },
];

const otherProjects = [
  {
    title: "Weather App",
    description:
      "A beautiful weather application with location-based forecasts and interactive maps.",
    technologies: ["React", "Weather API"],
    github: "#",
    live: "#",
  },
  {
    title: "Markdown Editor",
    description:
      "Real-time markdown editor with live preview and syntax highlighting.",
    technologies: ["Vue.js", "Marked.js"],
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio Template",
    description:
      "A customizable portfolio template for developers and designers.",
    technologies: ["Next.js", "Tailwind"],
    github: "#",
    live: "#",
  },
  {
    title: "Chat Application",
    description:
      "Real-time chat app with rooms, direct messaging, and file sharing.",
    technologies: ["Socket.io", "React"],
    github: "#",
    live: "#",
  },
  {
    title: "Recipe Finder",
    description: "Search and discover recipes based on ingredients you have.",
    technologies: ["React", "Spoonacular API"],
    github: "#",
    live: "#",
  },
  {
    title: "Crypto Tracker",
    description:
      "Track cryptocurrency prices and portfolio performance in real-time.",
    technologies: ["React", "CoinGecko API"],
    github: "#",
    live: "#",
  },
];

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
                      className="font-mono text-sm text-muted-foreground"
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
            Other Noteworthy Projects
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
                        className="font-mono text-xs text-muted-foreground"
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
                href="https://github.com"
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
