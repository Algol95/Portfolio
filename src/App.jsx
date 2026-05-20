import { ParticlesBackground } from "./components/ParticlesBackground";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";

export default function App() {
  return (
    <>
      <ParticlesBackground />
      <Header />
      <main>
        <Home />
        <About />
        <Experience />
        <Projects />
      </main>
    </>
  );
}
