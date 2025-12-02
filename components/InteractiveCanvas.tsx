import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  MoreHorizontal, 
  MousePointer2,
  PenTool,
  Type,
  Layout,
  Eraser,
  Share2,
  Sparkles,
  Search
} from 'lucide-react';
import { Tooltip } from './Tooltip';

interface CanvasItem {
  id: number;
  type: 'pdf' | 'note' | 'video' | 'image';
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  content?: React.ReactNode;
  selected?: boolean;
}

export const InteractiveCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive State
  const [activeTool, setActiveTool] = useState('select');
  const [scale, setScale] = useState(1);

  // Initial rich content state
  const [items, setItems] = useState<CanvasItem[]>([
    { 
      id: 1, 
      type: 'pdf', 
      title: 'Neural_Networks.pdf', 
      x: 20, 
      y: 40, 
      w: 220, 
      h: 280,
      selected: true
    },
    { 
      id: 2, 
      type: 'note', 
      title: 'Research Notes', 
      x: 260, 
      y: 80, 
      w: 200, 
      h: 220,
      selected: false 
    },
    { 
      id: 3, 
      type: 'image', 
      title: 'Graph.png', 
      x: 140, 
      y: 300, 
      w: 240, 
      h: 160,
      selected: false 
    },
  ]);

  const [activeDragId, setActiveDragId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Handle responsive scaling
  useEffect(() => {
    const handleResize = () => {
        if (containerRef.current) {
            const width = containerRef.current.offsetWidth;
            // Base width is roughly 600px, scale down if smaller
            if (width < 600) {
                setScale(width / 600);
            } else {
                setScale(1);
            }
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Init
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (activeTool !== 'select') return;

    const item = items.find(i => i.id === id);
    if (!item) return;

    setItems(prev => prev.map(i => ({ ...i, selected: i.id === id })));

    // Adjust calculation for scale
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale
    });
    setActiveDragId(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (activeDragId === null || !containerRef.current) return;

    // Use container rect but adjust for scale
    // Note: This simple drag logic is imperfect with scaling but sufficient for a demo
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // We need to calculate position relative to the SCALED content div
    // But e.clientX is screen space.
    
    // Simplified: Just update delta relative to container
    // A proper implementation would need matrix math for nested scaling contexts
    
    const relativeX = (e.clientX - containerRect.left) / scale;
    const relativeY = (e.clientY - containerRect.top) / scale;

    const newX = relativeX - dragOffset.x;
    const newY = relativeY - dragOffset.y;

    setItems(prev => prev.map(item => {
      if (item.id === activeDragId) {
        return { ...item, x: newX, y: newY };
      }
      return item;
    }));
  };

  const handleMouseUp = () => {
    setActiveDragId(null);
  };

  return (
    <div 
      className={`relative w-full h-[400px] md:h-[600px] bg-[#0f172a] overflow-hidden select-none transition-cursor duration-200 ${activeTool === 'select' ? 'cursor-default' : 'cursor-crosshair'}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 1. TOP APP BAR */}
      <div className="h-10 md:h-12 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center justify-between px-4 z-40 relative flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 group">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 group-hover:bg-red-500 transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 group-hover:bg-yellow-500 transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 group-hover:bg-green-500 transition-colors" />
          </div>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs md:text-sm font-medium text-slate-400">
            <span className="text-slate-200">Deep_Learning_Study</span>
        </div>
        
        <div className="flex items-center gap-3">
           <Search className="w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* 2. CANVAS AREA - SCALABLE CONTAINER */}
      <div className="relative flex-1 bg-[#0f172a] overflow-hidden w-full h-full">
        {/* Background Grid */}
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        
        {/* SCALED CONTENT WRAPPER */}
        <div 
            className="absolute top-0 left-0 w-full h-full origin-top-left transition-transform duration-75 ease-out"
            style={{ transform: `scale(${scale})` }}
        >
            {/* Nodes */}
            {items.map(item => (
            <div
                key={item.id}
                className={`absolute flex flex-col bg-slate-800 rounded-lg shadow-xl cursor-move border transition-all duration-200 ${
                item.selected 
                    ? 'border-sky-500 ring-1 ring-sky-500/50 z-10 shadow-2xl shadow-sky-500/10' 
                    : 'border-slate-700/50 hover:border-slate-600 z-0'
                }`}
                style={{
                transform: `translate(${item.x}px, ${item.y}px)`,
                width: item.w,
                height: item.h,
                }}
                onMouseDown={(e) => handleMouseDown(e, item.id)}
            >
                {/* Node Header */}
                <div className={`flex items-center justify-between px-3 py-2 border-b ${item.selected ? 'bg-slate-800 border-slate-700' : 'bg-slate-800/50 border-slate-700/50'} rounded-t-lg`}>
                <div className="flex items-center gap-2 truncate">
                    {item.type === 'pdf' && <FileText className="w-3 h-3 text-red-400" />}
                    {item.type === 'note' && <FileText className="w-3 h-3 text-yellow-400" />}
                    {item.type === 'image' && <ImageIcon className="w-3 h-3 text-blue-400" />}
                    <span className="text-[11px] font-medium text-slate-300 truncate">{item.title}</span>
                </div>
                <MoreHorizontal className="w-3 h-3 text-slate-500 hover:text-slate-300 cursor-pointer" />
                </div>

                {/* Node Content */}
                <div className="flex-1 overflow-hidden relative group bg-slate-900">
                
                {/* PDF Content Mockup */}
                {item.type === 'pdf' && (
                    <div className="p-4 bg-white h-full w-full">
                    <div className="space-y-3 opacity-80">
                        <div className="h-3 bg-slate-800 rounded w-3/4 mb-4" />
                        <div className="space-y-1.5">
                        <div className="h-1.5 bg-slate-300 rounded w-full" />
                        <div className="h-1.5 bg-slate-300 rounded w-full" />
                        <div className="h-1.5 bg-yellow-200 rounded w-full" /> {/* Highlight */}
                        <div className="h-1.5 bg-yellow-200 rounded w-5/6" /> {/* Highlight */}
                        </div>
                        <div className="flex gap-2 mt-4">
                        <div className="flex-1 h-12 bg-slate-100 rounded border border-slate-200"></div>
                        <div className="flex-1 h-12 bg-slate-100 rounded border border-slate-200"></div>
                        </div>
                    </div>
                    </div>
                )}

                {/* Note Content Mockup */}
                {item.type === 'note' && (
                    <div className="p-4 bg-yellow-50/5 h-full w-full font-mono text-[10px] text-slate-300 leading-relaxed">
                    <div className="text-yellow-400 font-bold mb-2"># Key Takeaways</div>
                    <ul className="list-disc pl-4 space-y-2">
                        <li>Model convergence rates <span className="text-teal-400">15%</span> faster.</li>
                        <li>
                            TODO:
                            <div className="flex items-center gap-2 mt-1 opacity-70">
                                <div className="w-2 h-2 border border-slate-500 rounded-sm"></div>
                                <span>Verify dataset</span>
                            </div>
                        </li>
                    </ul>
                    </div>
                )}

                {/* Image Content Mockup */}
                {item.type === 'image' && (
                    <div className="relative w-full h-full bg-slate-900 flex flex-col p-3">
                    {/* Fake Chart */}
                    <div className="flex-1 flex items-end justify-between gap-1 px-2 pb-2 border-b border-l border-slate-700">
                        <div className="w-full bg-sky-500/20 h-[40%] rounded-t-sm"></div>
                        <div className="w-full bg-sky-500/40 h-[70%] rounded-t-sm"></div>
                        <div className="w-full bg-sky-500/60 h-[50%] rounded-t-sm"></div>
                        <div className="w-full bg-sky-500/80 h-[85%] rounded-t-sm"></div>
                        <div className="w-full bg-sky-500 h-[60%] rounded-t-sm"></div>
                    </div>
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/5 pointer-events-none transition-colors" />
                </div>
            </div>
            ))}
        </div>
      </div>

      {/* 3. BOTTOM FLOATING DOCK */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-800/90 backdrop-blur-md border border-slate-700/50 p-1 rounded-xl shadow-2xl flex items-center gap-1 z-30 max-w-[95%] overflow-hidden">
        <ToolButton icon={MousePointer2} active={activeTool === 'select'} onClick={() => setActiveTool('select')} />
        <div className="w-px h-4 bg-slate-700 mx-0.5" />
        <ToolButton icon={Type} active={activeTool === 'text'} onClick={() => setActiveTool('text')} />
        <ToolButton icon={PenTool} active={activeTool === 'draw'} onClick={() => setActiveTool('draw')} />
        <ToolButton icon={Eraser} active={activeTool === 'eraser'} onClick={() => setActiveTool('eraser')} />
        <div className="w-px h-4 bg-slate-700 mx-0.5" />
        <ToolButton 
            icon={Sparkles} 
            active={activeTool === 'ai'} 
            onClick={() => setActiveTool('ai')}
            className={activeTool === 'ai' ? 'bg-teal-500 text-white' : 'text-teal-400'} 
        />
      </div>

    </div>
  );
};

const ToolButton = ({ 
  icon: Icon, 
  active, 
  onClick,
  className = '' 
}: { 
  icon: any, 
  active?: boolean, 
  onClick?: () => void,
  className?: string 
}) => (
    <button 
        onClick={onClick}
        className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
            active 
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-105' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
        } ${className}`}
    >
      <Icon className="w-4 h-4" />
    </button>
);