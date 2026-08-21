import React from 'react';
import { ChevronDown } from 'lucide-react';
import ThumbnailGenerator from '@/ThumbnailGenerator';
import AnimatedBackground from '@/AnimatedBackground';

export default function HeroSection() {
  const [showGenerator, setShowGenerator] = React.useState(false);

  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-b from-[#0B0B0B] via-[#1a1a1a] to-[#0B0B0B] pt-32 pb-20 px-4 overflow-hidden">
      <AnimatedBackground />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-[#FF0000]/15 border border-[#FF0000]/60">
            <span className="text-[#FF4D4D] font-bold text-sm">⚡ AI-Powered Thumbnail Creator</span>
          </div>

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