import { Layout, FileText, Lock, Zap, Youtube, Database, PenTool, Cpu } from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Security', href: '#vault' },
  { label: 'Plugins', href: '#plugins' },
];

export const FEATURES = [
  {
    title: 'Infinite Canvas',
    description: 'Break free from tabs. Organize documents, videos, and notes spatially on a limitless virtual desk.',
    icon: Layout,
  },
  {
    title: 'Universal Format Support',
    description: 'First-class engines for PDF, Markdown, YouTube, CSV, and code. No context switching required.',
    icon: FileText,
  },
  {
    title: 'Privacy First',
    description: 'Your data lives in your "Vault" stored locally on your device. Zero cloud dependency by default.',
    icon: Lock,
  },
  {
    title: 'Deep Work Focus',
    description: 'Minimalist interface with a powerful "Focus Mode" to eliminate distractions when it matters.',
    icon: Zap,
  },
];

export const PLUGINS = [
  {
    title: 'PDF Viewer V3',
    desc: 'Powered by PDFium. Two-page spread, rotation, and instant search.',
    icon: FileText,
    color: 'text-red-400',
    bg: 'bg-red-400/10'
  },
  {
    title: 'YouTube Studio',
    desc: 'A-B looping, timestamp bookmarks, and speed control for learners.',
    icon: Youtube,
    color: 'text-red-500',
    bg: 'bg-red-500/10'
  },
  {
    title: 'CSV Editor',
    desc: 'Lightweight spreadsheet view to edit data without Excel.',
    icon: Database,
    color: 'text-green-400',
    bg: 'bg-green-400/10'
  },
  {
    title: 'Creative Tools',
    desc: 'Annotate everything with pens, markers, and floating layers.',
    icon: PenTool,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10'
  },
  {
    title: 'AI Dock',
    desc: 'Bring your own assistant (Gemini, ChatGPT) directly into the workspace.',
    icon: Cpu,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  }
];