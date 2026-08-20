import React from 'react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Creator Pro',
      text: 'This tool increased my CTR by 40%! The AI understands what makes thumbnails click.',
      channel: 'Gaming Channel'
    },
    {
      name: 'Tech Reviewer',
      text: 'Finally, a tool that saves me hours on thumbnail design. Highly recommend!',
      channel: 'Tech Review'
    },
    {
      name: 'Content King',
      text: 'The AI-generated thumbnails are indistinguishable from my hand-made ones. Amazing!',
      channel: 'Vlog Channel'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-[#0B0B0B] px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center">
          What Creators <span className="text-[#FF0000]">Say</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-[#141414] border border-white/10 rounded-2xl p-8 hover:border-[#FACC15]/50 transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-[#FACC15]">★</span>
                ))}
              </div>
              <p className="text-[#E5E5E5]/80 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-[#E5E5E5]/60">{testimonial.channel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}