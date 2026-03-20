import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Obtiene el tema inicial desde localStorage o devuelve "dark" por defecto.
 * @returns {string} El tema inicial ("light" o "dark").
 */
function getInitialTheme() {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  return "dark";
}

/**
 * Aplica el tema especificado al documento y lo guarda en localStorage.
 * @param {string} theme - El tema a aplicar ("light" o "dark").
 */
function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  window.localStorage.setItem("theme", theme);
}

/**
 * Componente que permite alternar entre el tema claro y oscuro.
 * Utiliza el estado local para gestionar el tema actual y lo almacena en localStorage para persistencia entre sesiones. Además, aplica la clase "dark" al elemento raíz del documento para activar los estilos correspondientes.
 * @returns {JSX.Element} El componente de alternancia de tema.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative overflow-hidden rounded-full"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
