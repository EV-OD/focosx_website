import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-gradient-to-br from-primary to-secondary rounded-lg">
                {/* New "Deep Focus" Logo (Small) */}
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 12L12 22L22 12L12 2Z" strokeOpacity="0.35" />
                  <path d="M12 6L6 12L12 18L18 12L12 6Z" strokeOpacity="0.75" />
                  <path d="M12 9.5L9.5 12L12 14.5L14.5 12L12 9.5Z" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="text-lg font-bold">FocosX</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm mb-6">
              The spatial workspace for deep work. Built for researchers, students, and thinkers who need more than just tabs.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/EV-OD/focosx" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-200 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Download</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Plugin Store</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-200 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} FocosX. All rights reserved.</p>
          <div className="flex gap-6">
             <span>Local-First Software</span>
             <span>Made with ❤️ for Deep Work</span>
          </div>
        </div>
      </div>
    </footer>
  );
};