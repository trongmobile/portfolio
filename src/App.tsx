import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { t, useLocale } from '@/i18n';
import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Highlights } from '@/components/sections/Highlights';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { Skills } from '@/components/sections/Skills';
import { Approach } from '@/components/sections/Approach';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';

export default function App() {
  // Re-renders the whole tree when the language changes.
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.site.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.site.description);
  }, [locale]);

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Highlights />
        <About />
        <Experience />
        <ProjectsSection />
        <Skills />
        <Approach />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
