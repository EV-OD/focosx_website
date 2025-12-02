# FocosX - The Spatial Workspace

**FocosX** is a next-generation spatial operating system designed for deep work. It replaces the traditional browser tab interface with an infinite canvas, allowing researchers, students, and power users to organize documents, notes, and data in a limitless 2D space.

## ✨ Features

- **Infinite Spatial Canvas**: Pan, zoom, and organize PDFs, videos, and notes on a virtual desk without boundaries.
- **Local-First Privacy**: Your data lives in your "Vault" (IndexedDB on Web, File System on Desktop). No cloud lock-in.
- **Universal Format Support**: First-class rendering for PDF, Markdown, CSV, YouTube, and Code.
- **Plugin Ecosystem**: Extensible architecture allowing developers to build custom tools using standard React & TypeScript.
- **Deep Focus Mode**: Minimalist interface designed to eliminate distractions.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/focosx.git
   cd focosx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📦 Deployment

This project includes a GitHub Actions workflow that automatically deploys the application to **GitHub Pages** whenever you push to the `main` branch.

### Manual Setup for GitHub Pages

1. Go to your repository **Settings**.
2. Navigate to **Pages** (in the sidebar).
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Push your changes to `main`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.