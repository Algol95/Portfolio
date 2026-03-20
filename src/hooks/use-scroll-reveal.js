import { useEffect, useRef, useState } from "react";

/**
 * Hook personalizado para revelar elementos al hacer scroll.
 * @param {Object} options - Opciones de configuración para el IntersectionObserver.
 * @param {number} options.threshold - Umbral de visibilidad del elemento.
 * @param {string} options.rootMargin - Margen alrededor del root.
 * @param {boolean} options.once - Indica si la animación debe ocurrir solo una vez.
 * @returns {Object} Objeto con la referencia del elemento y su estado de visibilidad.
 */
export function useScrollReveal(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px 0px 0px",
    once = true,
  } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
