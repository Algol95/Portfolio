import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";

/**
 * Componente que muestra un texto con efecto de máquina de escribir, escribiendo y borrando una serie de textos de forma cíclica.
 * @param {Object} props - Las propiedades del componente.
 * @param {string[]} props.texts - Un array de strings que se mostrarán uno tras otro con el efecto de máquina de escribir.
 * @param {string} [props.className] - Clases CSS adicionales para el contenedor del texto.
 * @param {number} [props.typingSpeed] - Velocidad de escritura en milisegundos.
 * @param {number} [props.deletingSpeed] - Velocidad de borrado en milisegundos.
 * @param {number} [props.pauseDuration] - Duración de la pausa entre textos en milisegundos.
 * @param {number} [props.cursorBlinkSpeed] - Velocidad de parpadeo del cursor en milisegundos.
 * @param {string} [props.cursor] - Caracter del cursor.
 * @returns {JSX.Element|null} Componente de texto con efecto de máquina de escribir.
 */
export default function TypewriterText({
  texts,
  className = "",
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 1800,
  cursorBlinkSpeed = 530,
  cursor = "|",
}) {
  const normalizedTexts = useMemo(() => {
    if (!Array.isArray(texts)) {
      return [];
    }

    return texts.filter((text) => typeof text === "string");
  }, [texts]);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTextIndex(0);
    setDisplayText("");
    setIsDeleting(false);
  }, [normalizedTexts]);

  useEffect(() => {
    const cursorTimer = window.setInterval(() => {
      setShowCursor((previousValue) => !previousValue);
    }, cursorBlinkSpeed);

    return () => window.clearInterval(cursorTimer);
  }, [cursorBlinkSpeed]);

  useEffect(() => {
    if (normalizedTexts.length === 0) {
      return undefined;
    }

    const currentText = normalizedTexts[textIndex] ?? "";

    if (!isDeleting && displayText === currentText) {
      const pauseTimer = window.setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);

      return () => window.clearTimeout(pauseTimer);
    }

    if (isDeleting && displayText.length === 0) {
      const nextTextTimer = window.setTimeout(() => {
        setIsDeleting(false);
        setTextIndex(
          (previousIndex) => (previousIndex + 1) % normalizedTexts.length,
        );
      }, deletingSpeed);

      return () => window.clearTimeout(nextTextTimer);
    }

    const frameTimer = window.setTimeout(
      () => {
        setDisplayText((previousText) => {
          if (isDeleting) {
            return previousText.slice(0, -1);
          }

          return currentText.slice(0, previousText.length + 1);
        });
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => window.clearTimeout(frameTimer);
  }, [
    normalizedTexts,
    textIndex,
    displayText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  if (normalizedTexts.length === 0) {
    return null;
  }

  return (
    <span className={className}>
      {displayText}
      <span
        className={
          showCursor
            ? "opacity-100 transition-opacity"
            : "opacity-0 transition-opacity"
        }
      >
        {cursor}
      </span>
    </span>
  );
}

/**
 * PropTypes para el componente TypewriterText, definiendo los tipos y requisitos de las props que el componente espera recibir.
 * @typedef {Object} TypewriterTextProps
 * @property {string[]} texts - Un array de strings que se mostrarán uno tras otro con el efecto de máquina de escribir. Requerido.
 * @property {string} [className] - Clases CSS adicionales para el contenedor del texto. Opcional.
 * @property {number} [typingSpeed] - Velocidad de escritura en milisegundos. Opcional, por defecto 100ms.
 * @property {number} [deletingSpeed] - Velocidad de borrado en milisegundos. Opcional, por defecto 60ms.
 * @property {number} [pauseDuration] - Duración de la pausa entre textos en milisegundos. Opcional, por defecto 1800ms.
 * @property {number} [cursorBlinkSpeed] - Velocidad de parpadeo del cursor en milisegundos. Opcional, por defecto 530ms.
 * @property {string} [cursor] - Caracter del cursor. Opcional, por defecto "|".
 */
TypewriterText.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  typingSpeed: PropTypes.number,
  deletingSpeed: PropTypes.number,
  pauseDuration: PropTypes.number,
  cursorBlinkSpeed: PropTypes.number,
  cursor: PropTypes.string,
};
