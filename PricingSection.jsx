import React from 'react';
import { Check } from 'lucide-react';

export default function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: ['3 generations/day', 'Basic styles', 'Standard resolution'],
      cta: 'Get Started'
    },
    {
      name: 'Pro',
      price: '$29',
      features: ['Unlimited generations', 'All styles', '4K resolution', 'Priority support', 'API access'],
      cta: 'Upgrade Now',
      highlight: true
    },
    {
      name: 'Team',
      price: '$99',
      features: ['Everything in Pro', 'Team management', 'Analytics', 'Custom styles', 'Dedicated support'],
      cta: 'Contact Sales'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-[#141414] px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center">
          Simple <span className="text-[#FACC15]">Pricing</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 transition-all ${
                plan.highlight
                  ? 'bg-[#FF0000]/10 border-2 border-[#FF0000]'
                  : 'bg-[#0B0B0B] border border-white/10'
              }`}
            >
              <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
              <p className="text-4xl font-black text-[#FACC15] mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-[#E5E5E5]/80">
                    <Check size={20} className="text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 font-bold rounded-lg transition-all ${
                  plan.highlight
                    ? 'bg-[#FF0000] hover:bg-red-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}