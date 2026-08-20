import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onLogoClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const links = [
    { label: 'Home', id: 'hero' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Thumbnail Generator', id: 'generator' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Pricing', id: 'pricing' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0B]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <button
          onClick={() => { onLogoClick?.(); scrollTo('hero'); }}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <polygon points="9.5,7.5 16.5,12 9.5,16.5" />
            </svg>
          </div>
          <span className="font-black text-xl text-white tracking-tight">
            Thumbnail<span className="text-[#FF0000]">Forge</span>
            <span className="text-[#FACC15]"> AI</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm text-[#E5E5E5] hover:text-[#FACC15] transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://templixco.gumroad.com/l/uwxgg"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#FF0000] hover:bg-red-600 text-white text-sm font-bold rounded-lg transition-all hover:scale-105"
          >
            Unlock PRO – $29
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#141414] border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-[#E5E5E5] hover:text-[#FACC15] text-left font-medium py-1"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://templixco.gumroad.com/l/uwxgg"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#FF0000] text-white text-sm font-bold rounded-lg text-center"
          >
            Unlock PRO – $29
          </a>
        </div>
      )}
    </nav>
  );
}