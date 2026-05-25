"use client";

import { Github, Linkedin, Heart } from "lucide-react";
import technologies from "@/data/technologies.json";
import { technologyIcons } from "@/data/technologyIcons";

const footerTechnologyNames = [
  "React",
  "Tailwind CSS",
  "Axios",
  "Java",
  "Spring Boot",
  "Google reCAPTCHA v3",
];

const footerTechnologies = footerTechnologyNames
  .map((name) => technologies.find((technology) => technology.name === name))
  .filter(Boolean);

/**
 * Componente de pie de página que muestra tecnologías usadas y enlaces de contacto.
 * @returns {JSX.Element} Componente de pie de página.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-card/65 px-6 pb-8 pt-14 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-36 w-36 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl py-2 sm:px-2 lg:px-4">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl space-y-5 text-center lg:text-left">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Tecnologias usadas
              </p>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                  React en frontend, Java en backend y reCAPTCHA para proteger
                  el contacto.
                </h2>
                <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                  Este portfolio está construido con React, Tailwind, Axios,
                  Java, Spring Boot y Google reCAPTCHA v3.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-1 lg:justify-start">
                {footerTechnologies.map((technology) => {
                  const TechIcon = technology.icon
                    ? technologyIcons[technology.icon]
                    : null;

                  return (
                    <span
                      key={technology.name}
                      className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/65 px-3 py-1.5 font-mono text-xs text-muted-foreground shadow-sm"
                    >
                      {TechIcon ? (
                        <TechIcon className="h-4 w-4 shrink-0 text-primary" />
                      ) : null}
                      {technology.name}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 text-center lg:items-end lg:text-right">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Conecta conmigo
              </p>
              <p className="max-w-xs text-sm leading-7 text-muted-foreground">
                GitHub para ver código y proyectos. LinkedIn para trayectoria,
                colaboraciones y novedades.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Algol95"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub de Ángel Aragón"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/angel-dev-aragon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn de Ángel Aragón"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-border/70 pt-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-sm text-muted-foreground">
              Programación web y desarrollo de aplicaciones Full Stack.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              © {new Date().getFullYear()} Ángel Aragón
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
