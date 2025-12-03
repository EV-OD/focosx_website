import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Layout, Shield, Zap, Box, Book, Code, Github, MessageCircle } from 'lucide-react';
import { Button } from './Button';

type Page = 'home' | 'docs' | 'api' | 'changelog' | 'downloads';

interface NavbarProps {
  onNavigate: (page: Page, sectionId?: string) => void;
  currentPage: Page;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: Page, sectionId?: string) => {
    onNavigate(page, sectionId);
    setHoveredMenu(null);
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md border-slate-800 py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
      onMouseLeave={() => setHoveredMenu(null)}
    >
      <div className="container mx-auto px-6 flex items-center justify-between relative">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 group cursor-pointer z-50" 
          onClick={() => handleNavClick('home', 'hero')}
        >
          <div className="p-2 bg-gradient-to-br from-sky-500 to-teal-500 rounded-lg group-hover:scale-105 transition-transform shadow-lg shadow-sky-500/20">
            {/* New "Deep Focus" Logo - Minimal Concentric Layers */}
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Outer Context Layer */}
              <path d="M12 2L2 12L12 22L22 12L12 2Z" strokeOpacity="0.35" />
              {/* Middle Workspace Layer */}
              <path d="M12 6L6 12L12 18L18 12L12 6Z" strokeOpacity="0.75" />
              {/* Inner Focus Core (Solid) */}
              <path d="M12 9.5L9.5 12L12 14.5L14.5 12L12 9.5Z" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            FocosX
          </span>
        </div>

        {/* Desktop Nav - Working Mega Menus */}
        <div className="hidden md:flex items-center gap-2 h-full">
          
          {/* Menu 1: Product */}
          <NavDropdown 
            label="Product" 
            active={hoveredMenu === 'Product'}
            onMouseEnter={() => setHoveredMenu('Product')}
          >
            <div className="w-[400px] p-4 grid gap-2">
              <DropdownItem 
                title="Infinite Canvas" 
                desc="Spatial workspace for unlimited ideas" 
                icon={Layout} 
                onClick={() => handleNavClick('home', 'features')}
              />
               <DropdownItem 
                title="Vault Security" 
                desc="Local-first encryption by default" 
                icon={Shield} 
                onClick={() => handleNavClick('home', 'vault')}
              />
               <DropdownItem 
                title="Plugin Ecosystem" 
                desc="Extend functionality with plugins" 
                icon={Box} 
                onClick={() => handleNavClick('home', 'plugins')}
              />
              <DropdownItem 
                title="User Guide" 
                desc="Learn how to use FocosX" 
                icon={Book} 
                onClick={() => handleNavClick('docs')}
              />
              <div className="pt-2 mt-2 border-t border-slate-700/50">
                <DropdownItem 
                    title="What's New" 
                    desc="Dual engine architecture release" 
                    icon={Zap} 
                    onClick={() => handleNavClick('changelog')}
                    accent
                />
              </div>
            </div>
          </NavDropdown>

          {/* Menu 2: Developers */}
          <NavDropdown 
            label="Developers" 
            active={hoveredMenu === 'Developers'}
            onMouseEnter={() => setHoveredMenu('Developers')}
          >
             <div className="w-[340px] p-4 grid gap-2">
                <DropdownItem 
                    title="Plugin API" 
                    desc="Documentation for building tools" 
                    icon={Code} 
                    onClick={() => handleNavClick('api')}
                />
                <DropdownItem 
                    title="Source Code" 
                    desc="View the repo on GitHub" 
                    icon={Github} 
                    href="https://github.com/EV-OD/focosx"
                    target="_blank"
                />
                 <DropdownItem 
                    title="Report an Issue" 
                    desc="Help us improve FocosX" 
                    icon={MessageCircle} 
                    href="https://github.com/EV-OD/focosx/issues"
                    target="_blank"
                />
             </div>
          </NavDropdown>

        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
            <Button 
                size="sm" 
                variant="primary" 
                className="hidden md:inline-flex group shadow-sky-500/20" 
              onClick={() => handleNavClick('downloads')}
            >
              Downloads
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Mobile Toggle */}
            <button 
                className="md:hidden text-slate-300 p-2 hover:bg-slate-800 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-2 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="space-y-6">
            <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Product</div>
                <div className="space-y-3 pl-2">
                    <MobileLink icon={Layout} label="Infinite Canvas" onClick={() => handleNavClick('home', 'features')} />
                    <MobileLink icon={Shield} label="Security" onClick={() => handleNavClick('home', 'vault')} />
                    <MobileLink icon={Box} label="Plugins" onClick={() => handleNavClick('home', 'plugins')} />
                    <MobileLink icon={Book} label="User Guide" onClick={() => handleNavClick('docs')} />
                    <MobileLink icon={Zap} label="What's New" onClick={() => handleNavClick('changelog')} />
                </div>
            </div>
            
            <div className="w-full h-px bg-slate-800" />

            <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Developers</div>
                <div className="space-y-3 pl-2">
                    <MobileLink icon={Code} label="API Docs" onClick={() => handleNavClick('api')} />
                    <MobileLink icon={Github} label="Source Code" href="https://github.com/EV-OD/focosx" onClick={() => setMobileMenuOpen(false)} />
                    <MobileLink icon={MessageCircle} label="Report Issue" href="https://github.com/EV-OD/focosx/issues" onClick={() => setMobileMenuOpen(false)} />
                </div>
            </div>
          </div>

          <div className="mt-auto">
             <Button 
                className="w-full justify-center" 
                onClick={() => handleNavClick('downloads')}
            >
                Downloads
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

/* --- SUB COMPONENTS --- */

const NavDropdown = ({ 
    label, 
    children, 
    active, 
    onMouseEnter 
}: { 
    label: string, 
    children: React.ReactNode, 
    active: boolean, 
    onMouseEnter: () => void 
}) => {
    return (
        <div 
            className="relative h-full flex items-center" 
            onMouseEnter={onMouseEnter}
        >
            <button className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${active ? 'text-sky-400 bg-white/5 rounded-lg' : 'text-slate-400 hover:text-white'}`}>
                {label}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${active ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Panel */}
            <div className={`absolute top-full left-0 pt-4 transition-all duration-200 origin-top-left ${active ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible pointer-events-none'}`}>
                <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/5">
                    {children}
                </div>
            </div>
        </div>
    );
};

interface DropdownItemProps {
    title: string;
    desc: string;
    icon: any;
    href?: string;
    accent?: boolean;
    onClick?: () => void;
    target?: string;
}

const DropdownItem = ({ 
    title, 
    desc, 
    icon: Icon, 
    href,
    accent = false,
    onClick,
    target
}: DropdownItemProps) => {
    // If href is present, use anchor. If onClick is present, use button.
    if (href) {
        return (
            <a 
                href={href} 
                target={target}
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-800/80 transition-colors group cursor-pointer"
            >
                <ItemContent title={title} desc={desc} icon={Icon} accent={accent} />
            </a>
        );
    }
    
    return (
        <button 
            onClick={onClick}
            className="w-full text-left flex items-start gap-4 p-3 rounded-lg hover:bg-slate-800/80 transition-colors group cursor-pointer focus:outline-none focus:bg-slate-800"
        >
            <ItemContent title={title} desc={desc} icon={Icon} accent={accent} />
        </button>
    );
};

const ItemContent = ({ title, desc, icon: Icon, accent }: any) => (
    <>
        <div className={`mt-1 p-2 rounded-lg transition-colors ${accent ? 'bg-sky-500/20 text-sky-400 group-hover:bg-sky-500 group-hover:text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'}`}>
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <div className={`font-medium mb-0.5 ${accent ? 'text-sky-400 group-hover:text-sky-300' : 'text-slate-200 group-hover:text-white'}`}>
                {title}
            </div>
            <div className="text-xs text-slate-500 group-hover:text-slate-400 leading-relaxed">
                {desc}
            </div>
        </div>
    </>
);

const MobileLink = ({ href, icon: Icon, label, onClick }: { href?: string, icon: any, label: string, onClick: () => void }) => {
    if (href) {
        return (
            <a href={href} onClick={onClick} className="flex items-center gap-3 text-slate-300 hover:text-white group">
                <Icon className="w-5 h-5 text-slate-500 group-hover:text-sky-400" />
                <span className="text-lg font-medium">{label}</span>
            </a>
        );
    }
    return (
        <button onClick={onClick} className="w-full flex items-center gap-3 text-slate-300 hover:text-white group">
            <Icon className="w-5 h-5 text-slate-500 group-hover:text-sky-400" />
            <span className="text-lg font-medium">{label}</span>
        </button>
    );
};