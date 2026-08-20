import React from 'react';
import { Heart } from 'lucide-react';

export default function DonationCTA() {
  return (
    <section className="py-12 bg-gradient-to-r from-[#FF0000]/10 via-transparent to-[#FACC15]/10 px-4 border-y border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart size={20} className="text-[#FF0000]" />
          <p className="text-sm font-bold text-[#FF0000]">Support the Project</p>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
          Love ThumbnailForge AI? Consider supporting us!
        </h3>
        <p className="text-[#E5E5E5]/70 mb-6">
          Your support helps us improve and add new features. Every contribution means the world!
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] hover:bg-red-600 text-white font-bold rounded-lg transition-all hover:scale-105"
        >
          <Heart size={18} />
          Donate Now
        </a>
      </div>
    </section>
  );
}