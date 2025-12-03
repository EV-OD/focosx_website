import React, { useEffect, useState } from 'react';
import { ArrowRight, Globe, HardDrive, PlayCircle, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { InteractiveCanvas } from './InteractiveCanvas';
import { FadeIn } from './FadeIn';

export const Hero: React.FC = () => {
  const [latestTag, setLatestTag] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const repo = 'EV-OD/focosx';
    const fetchLatest = async () => {
      try {
        const localRes = await fetch('/releases/releases.json');
        if (localRes.ok) {
          try {
            const text = await localRes.text();
            const data = JSON.parse(text);
            if (!mounted) return;
            if (Array.isArray(data) && data.length > 0) setLatestTag(data[0].tag_name || data[0].name || null);
            return;
          } catch (e) {
            // not valid JSON, fall through to GitHub
          }
        }

        const res = await fetch(`https://api.github.com/repos/${repo}/releases`);
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) setLatestTag(data[0].tag_name || data[0].name || null);
      } catch (e) {
        // silently fail, keep badge generic
      }
    };

    fetchLatest();
    return () => { mounted = false };
  }, []);
  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden min-h-[90vh] flex flex-col">
      
      {/* Background Layer - Optimized for Performance */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep Space Base - Slight Gradient instead of solid */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#111c30] to-[#0f172a]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 dot-pattern" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
        
        {/* Color Blobs - Replaced Filters with Radial Gradients for 60fps */}
        {/* Top Left - Sky Blue */}
        <div 
          className="absolute -top-[5%] -left-[15%] w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] rounded-full mix-blend-screen animate-pulse-slow will-change-[opacity]"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.4) 0%, rgba(14,165,233,0) 70%)' }} 
        />
        
        {/* Bottom Right - Teal */}
        <div 
          className="absolute bottom-[0%] -right-[15%] w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] rounded-full mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.3) 0%, rgba(20,184,166,0) 70%)' }}
        />
        
        {/* Middle Accent - Indigo */}
        <div 
          className="absolute top-[30%] left-[10%] w-[60vw] h-[60vw] md:w-[400px] md:h-[400px] rounded-full mix-blend-screen opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0) 70%)' }}
        />

        {/* Vignette to focus center */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8">
          
          {/* Left Column: Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-xl lg:mt-8">
            <FadeIn direction="up">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 backdrop-blur-md mb-8 hover:border-sky-500/50 transition-colors cursor-default shadow-lg shadow-sky-900/10 group">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500 group-hover:bg-sky-400 transition-colors"></span>
                </span>
                <span className="text-xs font-semibold text-sky-400 tracking-wide uppercase group-hover:text-sky-300">{latestTag ? `${latestTag} Now Available` : 'Latest Release Available'}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
                Think Better on an <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-400 to-sky-400 animate-gradient-x bg-[length:200%_auto] will-change-[background-position]">
                  Infinite Canvas.
                </span>
              </h1>
              
              <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Stop switching tabs. Start thinking. FocosX is the spatial operating system that unifies your documents, notes, and research on an infinite canvas.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
                <Button 
                  size="lg" 
                  href="https://ev-od.github.io/focosx/"
                  target="_blank"
                  className="w-full sm:w-auto shadow-xl shadow-sky-500/20 hover:shadow-sky-500/30 transition-all"
                >
                  Launch Web App
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500 px-4">
                  <div className="h-10 w-px bg-slate-800 hidden sm:block"></div>
                  <span className="hidden sm:inline">or</span>
                  <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                    <PlayCircle className="w-5 h-5 text-teal-500 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 text-xs font-medium text-slate-500 pt-4 border-t border-slate-800/50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-slate-800/50 ring-1 ring-slate-700/50">
                    <Globe className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <span>Runs in Browser</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="p-1.5 rounded-full bg-slate-800/50 ring-1 ring-slate-700/50">
                     <HardDrive className="w-3.5 h-3.5 text-teal-400" />
                   </div>
                  <span>Local Storage Vault</span>
                </div>
              </div>

            </FadeIn>
          </div>

          {/* Right Column: Interactive Canvas Preview */}
          <div className="flex-1 w-full lg:max-w-[650px] perspective-1000 relative z-20 mt-8 lg:mt-0">
            <FadeIn direction="right" delay={200}>
               <div className="relative group">
                  {/* Glow Effect behind canvas - Optimized Gradient */}
                  <div 
                    className="absolute -inset-1 rounded-2xl opacity-30 group-hover:opacity-40 transition duration-1000 will-change-[opacity]"
                    style={{ background: 'linear-gradient(to right, #0ea5e9, #14b8a6)', filter: 'blur(20px)' }}
                  ></div>
                  
                  {/* The Actual Component */}
                  <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-700/50 bg-[#0f172a]">
                    <InteractiveCanvas />
                  </div>
                  
                  {/* Floating Elements (Decorative) */}
                  <div className="absolute -right-6 top-12 p-3 bg-slate-800/90 backdrop-blur rounded-xl border border-slate-700 shadow-2xl animate-float-delayed hidden 2xl:block will-change-transform">
                     <Sparkles className="w-5 h-5 text-yellow-400" />
                  </div>
               </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};