import { useEffect, useState } from "react";
import { Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Home() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Full Stack Developer";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="space-y-4">
              <p className="text-primary font-mono text-sm tracking-wider uppercase">
                Bienvenido a mi portafolio
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                Hola, soy{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                  Ángel Aragón
                </span>
              </h1>
              <div className="h-8">
                <span className="font-mono text-xl text-muted-foreground">
                  {text}
                  <span
                    className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}
                  >
                    |
                  </span>
                </span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg text-pretty">
              Soy un desarrollador full stack con ganas de aprender y seguir
              creciendo. Puedo pasarme horas programando pues es algo que me
              apasiona y me encanta. No me dan miedo los retos, al contrario, me
              motivan a seguir mejorando y aprendiendo.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button asChild className="group">
                <a href="#projects">
                  Ver Proyectos
                  <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#contact">Contactar</a>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4 justify-center lg:justify-start">
              <a
                href="https://github.com/Algol95"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/angel-dev-aragon/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:angelaragon.developer@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="mt-10 lg:mt-0 flex justify-center">
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full bg-linear-to-br from-primary/20 to-accent/20 blur-3xl absolute -inset-10" />
              <div className="relative w-64 h-64 lg:w-90 lg:h-100 rounded-2xl bg-card border border-border overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-50 lg:h-50 mx-auto rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary-foreground">
                        <img
                          src="/images/1687779167525.jpg"
                          alt="Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </span>
                    </div>
                    <div className="font-mono text-sm lg:text-lg text-muted-foreground">
                      <span className="text-primary">const</span> developer ={" "}
                      {"{"}
                      <br />
                      <span className="pl-4">
                        passionate: <span className="text-accent">true</span>,
                      </span>
                      <br />
                      <span className="pl-4">
                        creative: <span className="text-accent">true</span>
                      </span>
                      <br />
                      {"}"};
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
          <Button
            variant="outline"
            size="icon"
            className="mt-2 animate-bounce rounded-full"
          >
            <a href="#about">
              <ArrowDown className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
