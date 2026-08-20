import React from 'react';
import { X, Lock } from 'lucide-react';

export default function ProUpgradeModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#141414] border border-white/10 rounded-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#E5E5E5]/60 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <Lock size={32} className="mx-auto text-[#FACC15] mb-4" />
          <h2 className="text-2xl font-black text-white mb-2">Upgrade to Pro</h2>
          <p className="text-[#E5E5E5]/70 mb-6">
            You've used your 3 free generations today. Upgrade for unlimited!
          </p>
          <a
            href="https://templixco.gumroad.com/l/uwxgg"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 bg-[#FF0000] hover:bg-red-600 text-white font-bold rounded-xl transition-all mb-3"
          >
            Unlock PRO – $29
          </a>
          <button
            onClick={onClose}
            className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}