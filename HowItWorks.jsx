import React from 'react';

export default function HowItWorks() {
  const steps = [
    { number: 1, title: 'Enter Details', description: 'Provide your video title and topic' },
    { number: 2, title: 'Choose Style', description: 'Select your preferred thumbnail style' },
    { number: 3, title: 'Generate', description: 'Let AI create your perfect thumbnail' },
    { number: 4, title: 'Download', description: 'Save and use your new thumbnail' }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#141414] px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center">
          How It <span className="text-[#FACC15]">Works</span>
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="bg-[#0B0B0B] border border-white/10 rounded-xl p-6 text-center h-full">
                <div className="w-12 h-12 bg-[#FF0000] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-black text-lg">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-[#E5E5E5]/60">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#FF0000]/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}