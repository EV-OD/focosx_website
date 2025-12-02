import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { VaultSection } from './components/VaultSection';
import { PluginShowcase } from './components/PluginShowcase';
import { Footer } from './components/Footer';
import { Documentation } from './components/Documentation';
import { ApiReference } from './components/ApiReference';
import { Changelog } from './components/Changelog';

type Page = 'home' | 'docs' | 'api' | 'changelog';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Handle navigation requests from Navbar
  const handleNavigation = (page: Page, sectionId?: string) => {
    setCurrentPage(page);
    
    // Reset scroll immediately
    if (!sectionId) {
      window.scrollTo(0, 0);
    }

    // If there is a section ID (e.g. #features), scroll to it after render
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-100 overflow-x-hidden selection:bg-primary selection:text-white flex flex-col">
      <Navbar onNavigate={handleNavigation} currentPage={currentPage} />
      
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero />
            <Features />
            <VaultSection />
            <PluginShowcase />
          </>
        )}
        
        {currentPage === 'docs' && <Documentation />}
        {currentPage === 'api' && <ApiReference />}
        {currentPage === 'changelog' && <Changelog />}
      </main>

      <Footer />
    </div>
  );
};

export default App;