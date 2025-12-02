import React, { useState } from 'react';
import { PLUGINS } from '../constants';
import { ChevronRight, Settings, Maximize, Play, Pause, Save, RotateCcw, Code } from 'lucide-react';
import { Button } from './Button';
import { FadeIn } from './FadeIn';

export const PluginShowcase: React.FC = () => {
  const [activePlugin, setActivePlugin] = useState(PLUGINS[0]);

  return (
    <section id="plugins" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 mb-16">
          
          {/* Left Side: Plugin Selector - Slides from LEFT */}
          <FadeIn direction="left" className="lg:w-1/3">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-3xl font-bold mb-2">Modular Power Plugins</h2>
              <p className="text-slate-400 mb-8">
                The engine is yours. Enable specialized tools for your workflow.
              </p>

              <div className="space-y-3">
                {PLUGINS.map((plugin) => (
                  <button
                    key={plugin.title}
                    onClick={() => setActivePlugin(plugin)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 border flex items-center justify-between group ${
                      activePlugin.title === plugin.title
                        ? 'bg-slate-800 border-sky-500 shadow-lg shadow-sky-500/10'
                        : 'bg-transparent border-transparent hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${plugin.bg} ${plugin.color}`}>
                        <plugin.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`font-semibold ${activePlugin.title === plugin.title ? 'text-white' : 'text-slate-300'}`}>
                          {plugin.title}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activePlugin.title === plugin.title ? 'text-sky-400 translate-x-1' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right Side: Interactive Preview Window - Slides from RIGHT */}
          <FadeIn direction="right" delay={200} className="lg:w-2/3">
            <div className="h-[450px] lg:h-[600px] bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col relative">
              {/* Window Controls */}
              <div className="h-10 bg-slate-800/50 border-b border-slate-700 flex items-center px-4 justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">{activePlugin.title}</div>
                <Settings className="w-4 h-4 text-slate-500" />
              </div>

              {/* Dynamic Content Area */}
              <div className="flex-1 p-4 md:p-8 relative">
                <div className="absolute inset-0 bg-slate-950/50" />
                
                {/* Simulated Content based on Plugin */}
                <div className="relative z-10 h-full flex flex-col">
                  {activePlugin.title.includes('PDF') && (
                    <div className="flex gap-4 h-full">
                       <div className="hidden md:block w-1/4 bg-slate-800 rounded-lg p-3 space-y-2">
                          {[1,2,3,4,5].map(i => <div key={i} className="h-20 bg-slate-700 rounded opacity-50"></div>)}
                       </div>
                       <div className="flex-1 bg-white rounded-lg p-6 md:p-8 text-slate-800 shadow-xl overflow-hidden">
                          <h3 className="text-xl md:text-2xl font-serif font-bold mb-4">Abstract</h3>
                          <div className="space-y-2">
                             <div className="h-2 bg-slate-200 w-full" />
                             <div className="h-2 bg-slate-200 w-full" />
                             <div className="h-2 bg-slate-200 w-3/4" />
                             <div className="h-2 bg-slate-200 w-full" />
                          </div>
                          <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-xs md:text-sm">
                             <span className="font-bold">Annotation:</span> This connects to the previous finding in Section 2.
                          </div>
                       </div>
                    </div>
                  )}
                  
                  {activePlugin.title.includes('YouTube') && (
                    <div className="flex flex-col h-full bg-black rounded-xl overflow-hidden border border-slate-700">
                       <div className="flex-1 flex items-center justify-center bg-slate-900 relative">
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                             <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                          {/* Loop Overlay */}
                          <div className="absolute bottom-12 left-12 right-12 h-1 bg-slate-700">
                             <div className="absolute left-1/4 right-1/4 h-full bg-red-500" />
                             <div className="absolute left-1/4 -top-1 w-3 h-3 bg-white rounded-full" />
                             <div className="absolute right-1/4 -top-1 w-3 h-3 bg-white rounded-full" />
                          </div>
                          <div className="absolute bottom-4 left-0 right-0 text-center text-xs font-mono text-red-400">A-B LOOP ACTIVE: 04:20 - 05:45</div>
                       </div>
                    </div>
                  )}

                  {activePlugin.title.includes('CSV') && (
                    <div className="bg-slate-800 rounded-lg border border-slate-700 h-full overflow-hidden">
                       <div className="grid grid-cols-4 gap-px bg-slate-700 p-px">
                          {['ID', 'Name', 'Value', 'Status'].map(h => (
                             <div key={h} className="bg-slate-800 p-2 text-xs font-bold text-slate-400">{h}</div>
                          ))}
                          {Array.from({length: 20}).map((_, i) => (
                             <div key={i} className="bg-slate-900 p-2 text-xs font-mono text-slate-300 border-t border-slate-800">
                                {i % 4 === 3 ? <span className="text-teal-400">Active</span> : 'Data'}
                             </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {activePlugin.title.includes('AI') && (
                    <div className="flex flex-col h-full">
                       <div className="flex-1 space-y-4 overflow-hidden">
                          <div className="flex gap-4">
                             <div className="w-8 h-8 rounded bg-slate-700 flex-shrink-0" />
                             <div className="bg-slate-800 p-3 rounded-r-xl rounded-bl-xl text-xs md:text-sm text-slate-300 max-w-md">
                                Summarize the key points from the uploaded PDF.
                             </div>
                          </div>
                          <div className="flex gap-4 flex-row-reverse">
                             <div className="w-8 h-8 rounded bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                                <div className="w-4 h-4 bg-sky-500 rounded-full" />
                             </div>
                             <div className="bg-sky-600/10 border border-sky-500/20 p-3 rounded-l-xl rounded-br-xl text-xs md:text-sm text-sky-200 max-w-md">
                                Based on the document, here are the 3 main findings...
                             </div>
                          </div>
                       </div>
                       <div className="mt-4 p-2 bg-slate-800 rounded-lg border border-slate-700 flex gap-2">
                          <div className="flex-1 bg-transparent text-sm p-1 text-slate-400">Ask a question...</div>
                          <div className="p-1 bg-sky-600 rounded text-white"><ChevronRight className="w-4 h-4" /></div>
                       </div>
                    </div>
                  )}

                  {activePlugin.title.includes('Creative') && (
                     <div className="h-full bg-slate-800/50 rounded-lg border border-slate-700 relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-600 text-6xl font-serif italic opacity-20">Draft</div>
                        {/* Drawing paths */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                           <path d="M 50 100 Q 150 50 250 150 T 450 100" stroke="#fbbf24" strokeWidth="4" fill="none" strokeDasharray="10 10" />
                           <circle cx="250" cy="150" r="40" stroke="#f87171" strokeWidth="4" fill="none" />
                        </svg>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 flex gap-4">
                           <div className="w-4 h-4 rounded-full bg-white border border-slate-400" />
                           <div className="w-4 h-4 rounded-full bg-yellow-400 border border-transparent scale-125" />
                           <div className="w-4 h-4 rounded-full bg-red-400 border border-transparent" />
                           <div className="w-px h-4 bg-slate-700" />
                           <RotateCcw className="w-4 h-4 text-slate-400" />
                        </div>
                     </div>
                  )}

                </div>
              </div>

              {/* Description Footer */}
              <div className="bg-slate-900 p-6 border-t border-slate-800">
                <p className="text-slate-400 text-sm leading-relaxed">
                   {activePlugin.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Developer CTA */}
        <FadeIn delay={400} className="w-full bg-gradient-to-r from-teal-500/10 to-sky-500/10 rounded-2xl border border-teal-500/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-6">
              <div className="p-4 bg-teal-500/20 rounded-xl text-teal-400">
                 <Code className="w-8 h-8" />
              </div>
              <div>
                 <h3 className="text-xl font-bold text-white mb-1">Developer API Available</h3>
                 <p className="text-slate-400">Don't see what you need? Build your own custom plugins with standard React & TypeScript.</p>
              </div>
           </div>
           <Button variant="outline" className="border-teal-500 text-teal-400 hover:bg-teal-500/10 whitespace-nowrap">
              Read API Docs
           </Button>
        </FadeIn>

      </div>
    </section>
  );
};