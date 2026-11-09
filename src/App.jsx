import { Nav } from './components/layout/Nav';
import { Hero } from './components/hero/Hero';
import { AdBanner } from './components/ad/AdBanner';
import { Why } from './components/sections/Why';
import { Flow } from './components/flow/Flow';
import { Features } from './components/sections/Features';
import { Screens } from './components/screens/Screens';
import { LocalStrip } from './components/sections/LocalStrip';
import { Plans } from './components/sections/Plans';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { useSectionRouting } from './hooks/useSectionRouting';

export default function App() {
  useSectionRouting();
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <AdBanner />
        <Why />
        <Flow />
        <Features />
        <Screens />
        <LocalStrip />
        <Plans />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

