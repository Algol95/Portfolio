import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { AppProviders } from "./components/AppProviders.jsx";
import { ParticlesBackground } from "./components/ParticlesBackground.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <ParticlesBackground />
      <App />
    </AppProviders>
  </StrictMode>,
);
