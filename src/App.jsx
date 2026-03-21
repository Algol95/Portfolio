import { ParticlesBackground } from "./components/ParticlesBackground";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { About } from "./components/About";

export default function App() {
  return (
    <>
      <ParticlesBackground />
      <Header />
      <main>
        <Home />
        <About />
      </main>
    </>
  );
}
