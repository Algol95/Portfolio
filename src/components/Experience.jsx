import { ExternalLink } from "lucide-react";
import experiences from "../data/experience.json";
import ScrollReveal from "./ui/ScrollReveal";
import { Button } from "./ui/Button";

export function Experience() {
  return (
    <section id="experience" className="py-32 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" delay={100} duration={800}>
          <div className="space-y-4 mb-16">
            <p className="text-primary font-mono text-sm tracking-wider uppercase">
              Experiencia
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Dónde he trabajado
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200} duration={800}>
          <div className="space-y-1">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group grid md:grid-cols-[200px_1fr] gap-4 p-6 rounded-xl hover:bg-card/50 transition-colors border border-transparent hover:border-border"
              >
                <div className="text-sm text-muted-foreground font-mono">
                  {exp.period}
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {exp.title} ·{" "}
                    <a
                      href={exp.url}
                      className="inline-flex items-center gap-1 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {exp.company}
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </h3>
                  <div
                    className="text-muted-foreground leading-relaxed text-pretty [&_ul]:list-disc [&_ul]:ml-5 [&_li]:marker:text-primary"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200} duration={800}>
          <div className="mt-12 text-center">
            <Button variant="link" size="lg" asChild>
              <a
                href="docs/CV_Developer_ÁngelAragón.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Currículum ATS
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
