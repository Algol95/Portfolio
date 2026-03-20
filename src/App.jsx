import { ParticlesBackground } from "./components/ParticlesBackground";
import { Header } from "./components/Header";
import { Home } from "./components/Home";

export default function App() {
  return (
    <>
      <ParticlesBackground />
      <Header />
      <main>
        <Home />
      </main>
    </>
  );
}
