import React from 'react';
import { Zap, Sparkles } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Advanced AI generates thumbnails optimized for maximum CTR'
    },
    {
      icon: Sparkles,
      title: 'Multiple Styles',
      description: 'Choose from MrBeast, Gaming, Tech, Reaction, and Minimalist styles'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get professional-quality thumbnails in just seconds'
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#0B0B0B] px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center">
          Powerful <span className="text-[#FF0000]">Features</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="bg-[#141414] border border-white/10 rounded-2xl p-8 hover:border-[#FF0000]/50 transition-all">
                <Icon size={32} className="text-[#FACC15] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-[#E5E5E5]/60">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}