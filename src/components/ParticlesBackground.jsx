import { useEffect, useRef } from "react";

/**
 * Componente que renderiza un fondo de partículas animadas utilizando el elemento canvas.
 * Las partículas se mueven de manera aleatoria y se conectan entre sí cuando están lo suficientemente cerca.
 * El color de las partículas y las líneas de conexión cambia según el modo oscuro o claro del sistema.
 * @returns {JSX.Element} Componente de fondo de partículas.
 */
export function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const getIsDark = () => {
      if (typeof document !== "undefined") {
        if (document.documentElement.classList.contains("dark")) return true;
      }
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      return false;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawParticles = (time) => {
      const isDark = getIsDark();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const pulse =
          Math.sin(time * particle.pulseSpeed + particle.pulseOffset) * 0.3 +
          0.7;
        const currentOpacity = particle.opacity * pulse;

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 3,
        );

        if (isDark) {
          gradient.addColorStop(0, `rgba(94, 234, 212, ${currentOpacity})`);
          gradient.addColorStop(
            0.5,
            `rgba(59, 130, 246, ${currentOpacity * 0.5})`,
          );
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
        } else {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${currentOpacity})`);
          gradient.addColorStop(
            0.5,
            `rgba(147, 51, 234, ${currentOpacity * 0.5})`,
          );
          gradient.addColorStop(1, "rgba(147, 51, 234, 0)");
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        particles.forEach((particle2, j) => {
          if (i === j) return;
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const lineOpacity = (1 - distance / 150) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.strokeStyle = isDark
              ? `rgba(94, 234, 212, ${lineOpacity})`
              : `rgba(59, 130, 246, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    resizeCanvas();
    createParticles();
    drawParticles(0);

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-60"
      style={{ pointerEvents: "none" }}
    />
  );
}
