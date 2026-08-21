import React from 'react';
import { ChevronDown } from 'lucide-react';
import ThumbnailGenerator from '@/ThumbnailGenerator';

export default function HeroSection() {
  const [showGenerator, setShowGenerator] = React.useState(false);

  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-b from-[#0B0B0B] via-[#1a1a1a] to-[#0B0B0B] pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-80">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF0000]/50 rounded-full blur-3xl mix-blend-screen animate-blob-1" />
        <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] bg-[#FACC15]/40 rounded-full blur-3xl mix-blend-screen animate-blob-2" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#FF0000]/35 rounded-full blur-3xl mix-blend-screen animate-blob-3" />
        <div className="absolute top-1/2 left-1/4 w-[32rem] h-[32rem] bg-[#FACC15]/25 rounded-full blur-3xl mix-blend-screen animate-blob-4" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-[#FF0000]/45 rounded-full blur-3xl mix-blend-screen animate-blob-5" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight animate-glow-pulse">
            Create <span className="text-[#FF0000]">Viral</span> YouTube
            <br />
            Thumbnails with <span className="text-[#FACC15]">AI</span>
          </h1>
          <p className="text-xl text-[#E5E5E5]/70 mb-8 max-w-2xl mx-auto">
            Generate eye-catching, high-CTR thumbnails in seconds. Powered by advanced AI to maximize your click-through rates.
          </p>

          <button
            onClick={() => setShowGenerator(true)}
            className="px-10 py-5 bg-[#FF0000] hover:bg-red-600 text-white font-black rounded-xl text-xl transition-all hover:scale-110 shadow-2xl animate-cta-pulse"
          >
            Generate Free Thumbnail
          </button>

          {!showGenerator && (
            <div className="mt-12 flex justify-center animate-bounce">
              <ChevronDown size={32} className="text-[#FACC15]" />
            </div>
          )}
        </div>

        {showGenerator && (
          <div id="generator" className="mt-16 max-w-4xl mx-auto">
            <ThumbnailGenerator />
          </div>
        )}
      </div>
    </section>
  );
}