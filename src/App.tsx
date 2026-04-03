import React from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import Marquee from './components/Sections/Marquee';
import Work from './components/Sections/Work/Work';
import About from './components/Sections/About/About';
import Process from './components/Sections/Process/Process';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';
import CustomCursor from './components/UI/CustomCursor';
import { useScrollReveal } from './hooks/useScrollReveal';
import './styles/variables.css';
import './styles/glass.css';
import './styles/global.css';

const App: React.FC = () => {
  useScrollReveal();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
