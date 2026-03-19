import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { ParticlesBackground } from "./components/ParticlesBackground.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ParticlesBackground />
    <App />
  </StrictMode>,
);
