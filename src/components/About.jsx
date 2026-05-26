import { Code2, Palette, Rocket, Zap } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import technologies from "../data/technologies.json";
import { technologyIcons } from "../data/technologyIcons";

const highlights = [
  {
    icon: Code2,
    title: "Código Limpio",
    description:
      "Código limpio, legible, documentado y fácil de mantener en cada proyecto",
  },
  {
    icon: Palette,
    title: "Enfoque UI/UX",
    description: "Creando interfaces de usuario intuitivas y atractivas",
  },
  {
    icon: Rocket,
    title: "Metodología Ágil",
    description:
      "Aplicando SCRUM para entregar valor de forma rápida y eficiente",
  },
  {
    icon: Zap,
    title: "Stack Moderno",
    description: "Usando las últimas tecnologías y mejores prácticas",
  },
];

/**
 * Componente que representa la sección "Sobre Mí" del portafolio.
 * @returns {JSX.Element} Sección "Sobre Mí" del portafolio.
 */
export function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" delay={100} duration={800}>
          <div className="space-y-4 mb-16">
            <p className="text-primary font-mono text-sm tracking-wider uppercase">
              Sobre Mí
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Creando Experiencias Digitales
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid lg:grid-cols-2 gap-16">
          <ScrollReveal direction="up" delay={100} duration={800}>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-pretty">
                Soy un desarrollador con experiencia en el desarrollo de API
                REST y aplicaciones web modernas. Con capacidad para trabajar en
                equipo y ayudar para lograr objetivos. Con ganas de aprender y
                crecer profesionalmente. No me dan miedo los retos, me gusta
                aprender cosas nuevas y mejorar día a día para crecer
                profesionalmente. Mi objetivo es seguir perfeccionando mis
                habilidades y contribuir en proyectos importantes, que tengan un
                impacto positivo, que me haga sentirme realizado y orgulloso de
                lo que hago.
              </p>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                Trabajo también como freelance, lo que me ha permitido adaptarme
                a distintos contextos, clientes y necesidades reales. Eso me ha
                enseñado a comunicarme mejor, a priorizar y a entregar valor de
                forma práctica, sin rodeos. Siempre estoy explorando nuevas
                tecnologías y formas de mejorar lo que hago, porque en este
                sector quedarse quieto no es una opción. Mi objetivo es seguir
                construyendo proyectos sólidos, útiles y con personalidad
                propia.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-6">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
                  >
                    <item.icon className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200} duration={800}>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6">
                Tecnologías A Destacar
              </h3>
              <div className="space-y-5">
                {technologies.slice(0, 8).map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <h3 className="text-xl font-semibold mb-4">
                  Tecnologías Trabajadas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => {
                    const Icon = tech.icon ? technologyIcons[tech.icon] : null;
                    return (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full border border-border hover:border-primary/50 transition-colors"
                      >
                        {Icon && <Icon className="w-6 h-6" />}
                        {tech.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
