import React from 'react';
import { Layout, FileText, Lock, Code2, Terminal, Cpu, FileJson, FileCode, FileSpreadsheet, Image, Database, Command, Box } from 'lucide-react';
import { FadeIn } from './FadeIn';

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-slate-900 relative">
      <div className="container mx-auto px-6">
        <FadeIn direction="up" className="mb-16 max-w-2xl">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-white">
            Everything you need <br/>
            <span className="text-slate-500">to go deep.</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed border-l-2 border-sky-500 pl-6">
            Traditional tools fragment your attention. FocosX unifies it. 
            Designed for the complex workflows of researchers and students who need 
            to see the big picture.
          </p>
        </FadeIn>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* Large Card: Infinite Canvas */}
          <FadeIn direction="up" delay={100} className="md:col-span-2 row-span-1 rounded-3xl bg-surface border border-slate-800 p-8 relative overflow-hidden group hover:border-sky-500/50 transition-all duration-300">
            {/* Background Glow & Grid */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.02] pointer-events-none" />
            
            <div className="relative z-10 h-full flex flex-col justify-between max-w-sm">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center mb-6 text-sky-400">
                  <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Infinite Spatial Canvas</h3>
                <p className="text-slate-400">Break free from linear document editors. Spread out your PDFs, videos, and notes on a limitless virtual desk.</p>
              </div>
              <div className="flex gap-2 mt-6">
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300 font-medium">Pan</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300 font-medium">Zoom</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300 font-medium">Connect</span>
              </div>
            </div>

            {/* Visual Illustration: Floating Nodes */}
            <div className="absolute top-8 right-8 bottom-8 w-[45%] hidden lg:block pointer-events-none">
               {/* Node 1: PDF */}
               <div className="absolute top-4 right-12 w-40 h-48 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-3 rotate-6 group-hover:rotate-3 transition-transform duration-500 ease-out hover:scale-105 z-10">
                  <div className="flex items-center gap-2 border-b border-slate-700/50 pb-2 mb-2">
                     <FileText className="w-3 h-3 text-red-400" />
                     <div className="w-16 h-1 bg-slate-600 rounded-full" />
                  </div>
                  <div className="space-y-2 opacity-50">
                     <div className="w-full h-1.5 bg-slate-600 rounded-full" />
                     <div className="w-full h-1.5 bg-slate-600 rounded-full" />
                     <div className="w-2/3 h-1.5 bg-slate-600 rounded-full" />
                  </div>
               </div>
               
               {/* Node 2: Note */}
               <div className="absolute bottom-6 right-32 w-44 h-40 bg-[#1e293b] border border-slate-600 rounded-lg shadow-2xl p-3 -rotate-3 group-hover:-rotate-1 transition-transform duration-500 ease-out z-20">
                  <div className="flex items-center gap-2 border-b border-slate-700/50 pb-2 mb-2">
                     <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                     <div className="w-20 h-1 bg-slate-600 rounded-full" />
                  </div>
                  <div className="space-y-2 opacity-60">
                     <div className="w-full h-1.5 bg-slate-500 rounded-full" />
                     <div className="w-5/6 h-1.5 bg-slate-500 rounded-full" />
                  </div>
               </div>

               {/* Connector Line */}
               <svg className="absolute inset-0 w-full h-full z-0 opacity-40">
                  <path d="M 120 180 Q 180 150 220 80" stroke="#0ea5e9" strokeWidth="2" fill="none" strokeDasharray="4 4" />
               </svg>
            </div>
          </FadeIn>

          {/* Tall Card: Developer API */}
          <FadeIn direction="up" delay={200} className="md:col-span-1 row-span-2 rounded-3xl bg-slate-800/50 border border-slate-700 p-8 flex flex-col relative overflow-hidden group hover:border-teal-500/50 transition-all duration-300">
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
             
             {/* Header */}
             <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-6 text-teal-400 flex-shrink-0">
                <Code2 className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">Build Your Own</h3>
             <p className="text-slate-400 mb-6 text-sm">
               Missing a specific tool? FocosX is extensible. Write your own plugins using standard Web Technologies.
             </p>

             {/* Middle Content: Capabilities List (Fills the gap) */}
             <div className="flex-1 space-y-3 mb-6">
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:border-teal-500/30 transition-colors">
                    <div className="p-1.5 rounded bg-teal-500/10 text-teal-400"><Layout className="w-3.5 h-3.5" /></div>
                    <div>
                        <div className="text-xs font-semibold text-slate-300">UI Components</div>
                        <div className="text-[10px] text-slate-500 font-mono">app.toolbar.register()</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:border-teal-500/30 transition-colors">
                    <div className="p-1.5 rounded bg-teal-500/10 text-teal-400"><Database className="w-3.5 h-3.5" /></div>
                    <div>
                        <div className="text-xs font-semibold text-slate-300">File System Hooks</div>
                        <div className="text-[10px] text-slate-500 font-mono">app.vault.on('modify')</div>
                    </div>
                </div>
                 <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:border-teal-500/30 transition-colors">
                    <div className="p-1.5 rounded bg-teal-500/10 text-teal-400"><Command className="w-3.5 h-3.5" /></div>
                    <div>
                        <div className="text-xs font-semibold text-slate-300">Command Palette</div>
                        <div className="text-[10px] text-slate-500 font-mono">app.commands.add()</div>
                    </div>
                </div>
             </div>
             
             {/* Terminal */}
             <div className="relative h-48 bg-slate-950 rounded-xl border border-slate-800 p-4 shadow-inner overflow-hidden font-mono text-[10px] leading-relaxed flex-shrink-0">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                   <span className="text-teal-400 font-bold">plugin.ts</span>
                   <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-700" />
                      <div className="w-2 h-2 rounded-full bg-slate-700" />
                   </div>
                </div>
                <div className="text-purple-400">export default<span className="text-white"> Plugin(</span>{'{'}</div>
                <div className="pl-3 text-blue-300">name: <span className="text-green-300">'MyTool'</span>,</div>
                <div className="pl-3 text-blue-300">onLoad: <span className="text-yellow-300">(app)</span> {'=>'} {'{'}</div>
                <div className="pl-6 text-slate-500 italic">// Register UI</div>
                <div className="pl-6 text-sky-300">app.toolbar.add({'{'}</div>
                <div className="pl-9 text-blue-300">icon: <span className="text-green-300">'⚡'</span>,</div>
                <div className="pl-9 text-blue-300">action: <span className="text-yellow-300">()</span> {'=>'} ...</div>
                <div className="pl-6 text-sky-300">{'}'})</div>
                <div className="pl-3 text-white">{'}'}</div>
                <div className="text-white">{'}'})</div>
                
                {/* Cursor Blink */}
                <div className="w-1.5 h-3 bg-teal-500 animate-pulse inline-block ml-1 align-middle" />
             </div>
          </FadeIn>

          {/* Regular Card: Universal Formats */}
          <FadeIn direction="up" delay={300} className="md:col-span-1 row-span-1 rounded-3xl bg-surface border border-slate-800 p-8 group hover:border-blue-500/50 transition-all duration-300 flex flex-col relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <div className="grid grid-cols-2 gap-4">
                    <FileText className="w-12 h-12" />
                    <FileCode className="w-12 h-12" />
                    <Box className="w-12 h-12" />
                    <Image className="w-12 h-12" />
                </div>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 z-10">
                <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 z-10">Universal Formats</h3>
            <p className="text-slate-400 text-sm mb-6 flex-1 z-10">Native engines for all your files. No conversion needed.</p>
            
            {/* File Badges */}
            <div className="grid grid-cols-2 gap-2 z-10">
               <span className="px-3 py-2 bg-slate-800 rounded border border-slate-700 text-[10px] text-red-300 font-mono flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> .pdf
               </span>
               <span className="px-3 py-2 bg-slate-800 rounded border border-slate-700 text-[10px] text-blue-300 font-mono flex items-center gap-2">
                  <FileCode className="w-3.5 h-3.5" /> .md
               </span>
               <span className="px-3 py-2 bg-slate-800 rounded border border-slate-700 text-[10px] text-green-300 font-mono flex items-center gap-2">
                  <FileSpreadsheet className="w-3.5 h-3.5" /> .csv
               </span>
               <span className="px-3 py-2 bg-slate-800 rounded border border-slate-700 text-[10px] text-yellow-300 font-mono flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5" /> .tsx
               </span>
            </div>
          </FadeIn>

          {/* Regular Card: Privacy */}
          <FadeIn direction="up" delay={400} className="md:col-span-1 row-span-1 rounded-3xl bg-surface border border-slate-800 p-8 group hover:border-green-500/50 transition-all duration-300 relative overflow-hidden flex flex-col">
            {/* Background Icon */}
            <Lock className="absolute -bottom-4 -right-4 w-40 h-40 text-slate-800/50 group-hover:text-green-500/10 transition-colors pointer-events-none rotate-12" />
            
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-6 text-green-400 relative z-10">
                <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Privacy Core</h3>
            <p className="text-slate-400 text-sm mb-6 flex-1 relative z-10">Local-first architecture. Whether Web or Desktop, you own the keys.</p>
            
            <div className="relative z-10 mt-auto">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  AES-256 Encrypted
               </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
