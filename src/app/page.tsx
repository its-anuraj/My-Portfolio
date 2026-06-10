import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Resume />
      <Contact />
    </main>
  );
}
