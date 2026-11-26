import { Sparkles, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              ResuMatch <span className="text-blue-600">AI</span>
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              AI-Powered
            </span>
          </div>
        </div>

        {/* Navigation links & CTA */}
        <nav className="flex items-center space-x-6">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('analyzer-form')}
            className="inline-flex items-center space-x-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <span>Analyze Resume</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </header>
  );
}
