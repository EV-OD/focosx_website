import React from 'react';
import { Shield, Database, HardDrive, Globe, CheckCircle, FolderOpen, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { FadeIn } from './FadeIn';

export const VaultSection: React.FC = () => {
  return (
    <section id="vault" className="py-24 relative overflow-hidden bg-slate-900/50">
      <div className="container mx-auto px-6">
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Two Ways to <span className="text-sky-400">Vault</span>.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            FocosX is a "Local-First" application. We never see your data. 
            Choose the version that fits your privacy and workflow needs.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Web Mode Card - Slides in from LEFT */}
          <FadeIn direction="left" delay={100} className="bg-slate-900 rounded-2xl border border-slate-700 p-8 hover:border-slate-600 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-sky-500/10 rounded-xl">
                <Globe className="w-8 h-8 text-sky-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Web Edition</h3>
                <span className="text-xs text-sky-400 font-mono">browser.local</span>
              </div>
            </div>

            <p className="text-slate-400 mb-6 min-h-[48px]">
              Perfect for trying it out. Runs in any modern browser. Data is encrypted and stored in your browser's IndexedDB.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-sky-500" />
                No installation required
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-sky-500" />
                IndexedDB / LocalStorage
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-sky-500" />
                Sync via Export/Import
              </li>
            </ul>

            <Button 
              variant="outline" 
              className="w-full border-slate-700 hover:border-sky-500 hover:text-sky-400"
              href="https://ev-od.github.io/focosx/"
              target="_blank"
            >
              Launch Web App
            </Button>
          </FadeIn>

          {/* Desktop Mode Card - Slides in from RIGHT */}
          <FadeIn direction="right" delay={200} className="bg-slate-900 rounded-2xl border border-teal-500/10 p-8 shadow-2xl relative overflow-hidden opacity-90">
            {/* Overlay for inactive state */}
            <div className="absolute inset-0 bg-slate-950/40 z-10 pointer-events-none" />
            <div className="absolute top-4 right-4 z-20">
               <span className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase rounded">In Development</span>
            </div>

            <div className="flex items-center gap-4 mb-6 opacity-70">
              <div className="p-3 bg-teal-500/10 rounded-xl">
                <HardDrive className="w-8 h-8 text-teal-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Desktop Edition</h3>
                <span className="text-xs text-teal-400 font-mono">filesystem://local</span>
              </div>
            </div>

            <p className="text-slate-500 mb-6 min-h-[48px]">
              For serious work. Grants the app permission to read/write directly to your hard drive. Native performance.
            </p>

            <ul className="space-y-3 mb-8 opacity-60">
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <CheckCircle className="w-4 h-4 text-slate-600" />
                Direct File System Access
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <CheckCircle className="w-4 h-4 text-slate-600" />
                Works 100% Offline
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <CheckCircle className="w-4 h-4 text-slate-600" />
                Git-friendly file structure
              </li>
            </ul>

            <Button disabled variant="secondary" className="w-full cursor-not-allowed opacity-50">
              Coming Soon
            </Button>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};