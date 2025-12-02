import React, { useState, useEffect } from 'react';
import { FadeIn } from './FadeIn';
import { Book, Command, MousePointer2, Layers, Menu, X, ChevronRight } from 'lucide-react';

export const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  const sections = [
    { id: 'intro', label: 'Introduction' },
    { id: 'install', label: 'Installation' },
    { id: 'vault', label: 'The Vault Concept' },
    { id: 'nav', label: 'Canvas Navigation' },
  ];

  return (
    <div className="pt-24 pb-20 container mx-auto px-4 md:px-6 flex gap-12 relative min-h-screen">
      
      {/* Mobile Menu Toggle */}
      <button 
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-teal-500 text-white rounded-full shadow-2xl shadow-teal-500/50"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar Nav */}
      <aside className={`
        fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-0 lg:static lg:w-72 lg:block lg:flex-shrink-0
        transition-all duration-300
        ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full lg:opacity-100 lg:translate-x-0 pointer-events-none lg:pointer-events-auto'}
      `}>
        <div className="h-full overflow-y-auto p-8 lg:p-0 lg:sticky lg:top-24">
            <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      User Guide
                  </h3>
                  <ul className="space-y-1 border-l border-slate-800 ml-1">
                      {sections.map(item => (
                          <li key={item.id}>
                              <button
                                  onClick={() => {
                                      setActiveSection(item.id);
                                      setMobileMenuOpen(false);
                                  }}
                                  className={`
                                      w-full text-left px-4 py-2 text-sm transition-colors border-l -ml-px
                                      ${activeSection === item.id 
                                          ? 'border-teal-500 text-teal-400 font-medium bg-teal-500/5' 
                                          : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
                                      }
                                  `}
                              >
                                  {item.label}
                              </button>
                          </li>
                      ))}
                  </ul>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl min-w-0">
          <FadeIn key={activeSection}>
            <div className="mb-12 border-b border-slate-800 pb-8">
              <div className="flex items-center gap-3 text-teal-400 mb-4">
                <Book className="w-5 h-5" />
                <span className="text-sm font-mono font-bold uppercase">Documentation</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Introduction to FocosX</h1>
              <p className="text-xl text-slate-400 leading-relaxed">
                FocosX is a spatial operating system for your ideas. Unlike traditional document editors that force you into a linear page format, FocosX provides an infinite canvas where you can arrange, connect, and visualize your work.
              </p>
            </div>

            <div className="space-y-12">
              <section id="nav">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <MousePointer2 className="w-6 h-6 text-teal-400" />
                  Navigation Basics
                </h2>
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                  <p className="text-slate-300 mb-6">
                    Moving around the infinite canvas feels natural. We support trackpad gestures and standard mouse inputs.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400 text-sm">Pan Canvas</span>
                      <code className="text-xs bg-slate-950 px-2 py-1 rounded text-slate-300 border border-slate-800">Space + Drag</code>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400 text-sm">Zoom In/Out</span>
                      <code className="text-xs bg-slate-950 px-2 py-1 rounded text-slate-300 border border-slate-800">Ctrl + Scroll</code>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400 text-sm">Select Multiple</span>
                      <code className="text-xs bg-slate-950 px-2 py-1 rounded text-slate-300 border border-slate-800">Shift + Drag</code>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400 text-sm">Reset View</span>
                      <code className="text-xs bg-slate-950 px-2 py-1 rounded text-slate-300 border border-slate-800">Esc</code>
                    </div>
                  </div>
                </div>
              </section>

              <section id="vault">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Layers className="w-6 h-6 text-purple-400" />
                  The Vault
                </h2>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Your "Vault" is a local folder on your computer. FocosX does not store your files in the cloud. When you add a PDF or Image to the canvas, we simply reference the file in your Vault. This ensures your data remains yours, forever.
                </p>
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-200 text-sm flex gap-3">
                  <div className="w-1 bg-amber-500/50 rounded-full" />
                  <p><strong>Note:</strong> In the Web Version, the Vault is simulated using your browser's IndexedDB. If you clear your browser data, your vault will be reset.</p>
                </div>
              </section>

              <section>
                 <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Command className="w-6 h-6 text-sky-400" />
                  Command Palette
                </h2>
                <p className="text-slate-400 mb-4">
                  Power users can access everything via the Command Palette. Press <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">Cmd + K</code> or <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">Ctrl + K</code> to open it.
                </p>
              </section>
            </div>
          </FadeIn>
      </main>
    </div>
  );
};