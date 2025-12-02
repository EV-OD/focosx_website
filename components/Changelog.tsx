import React from 'react';
import { FadeIn } from './FadeIn';
import { Zap, GitCommit, Bug, Star } from 'lucide-react';

export const Changelog: React.FC = () => {
  const releases = [
    {
      version: 'v2.0.0',
      date: 'October 24, 2023',
      tag: 'Major Release',
      color: 'bg-sky-500',
      features: [
        { type: 'new', text: 'Dual Engine Architecture: Seamless switching between Web (IndexedDB) and Desktop (FileSystem) modes.' },
        { type: 'new', text: 'Infinite Canvas V2: rewritten WebGL renderer for 60fps performance with 1000+ nodes.' },
        { type: 'improvement', text: 'Added support for .mp4 and .mov video playback with timestamp looping.' },
        { type: 'fix', text: 'Fixed an issue where PDF text selection was offset on high DPI screens.' }
      ]
    },
    {
      version: 'v1.5.2',
      date: 'September 10, 2023',
      tag: 'Patch',
      color: 'bg-slate-600',
      features: [
        { type: 'improvement', text: 'Reduced memory usage for image caching by 40%.' },
        { type: 'fix', text: 'Resolved conflict with dark mode system settings on macOS.' },
      ]
    },
    {
      version: 'v1.5.0',
      date: 'August 15, 2023',
      tag: 'Feature Drop',
      color: 'bg-teal-500',
      features: [
        { type: 'new', text: 'Plugin System Beta: Load custom scripts from the settings menu.' },
        { type: 'new', text: 'added "Focus Mode" toggle to hide all UI chrome.' },
        { type: 'improvement', text: 'Markdown editor now supports GitHub Flavored Markdown (tables, task lists).' }
      ]
    }
  ];

  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      <FadeIn>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
             <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 shadow-lg shadow-sky-500/20 mb-6">
                <Zap className="w-6 h-6 text-white" />
             </div>
             <h1 className="text-4xl font-bold text-white mb-4">What's New</h1>
             <p className="text-slate-400">Track the evolution of FocosX.</p>
          </div>

          <div className="space-y-12 relative">
             {/* Vertical Line */}
             <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-800" />

             {releases.map((release, i) => (
               <FadeIn key={release.version} delay={i * 100} className="relative pl-20">
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 top-1.5 w-14 h-14 rounded-full border-4 border-[#0f172a] ${release.color} flex items-center justify-center shadow-lg z-10 text-white font-bold text-xs`}>
                     {release.version.split('.')[0]}
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative hover:border-slate-700 transition-colors">
                     {/* Triangle pointer */}
                     <div className="absolute top-5 -left-2 w-4 h-4 bg-slate-900 border-l border-b border-slate-800 transform rotate-45" />
                     
                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
                        <div>
                           <h2 className="text-xl font-bold text-white flex items-center gap-3">
                              {release.version}
                              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${release.color === 'bg-sky-500' ? 'bg-sky-500/20 text-sky-400' : release.color === 'bg-teal-500' ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-400'}`}>
                                 {release.tag}
                              </span>
                           </h2>
                        </div>
                        <div className="text-sm text-slate-500 font-mono">{release.date}</div>
                     </div>

                     <ul className="space-y-4">
                        {release.features.map((item, idx) => (
                           <li key={idx} className="flex items-start gap-3 text-sm">
                              <div className="mt-0.5">
                                 {item.type === 'new' && <Star className="w-4 h-4 text-sky-400 fill-sky-400/20" />}
                                 {item.type === 'improvement' && <GitCommit className="w-4 h-4 text-teal-400" />}
                                 {item.type === 'fix' && <Bug className="w-4 h-4 text-red-400" />}
                              </div>
                              <span className={item.type === 'fix' ? 'text-slate-400' : 'text-slate-300'}>{item.text}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </FadeIn>
             ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
};