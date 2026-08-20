import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] border-t border-white/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-black mb-4">ThumbnailForge AI</h4>
            <p className="text-[#E5E5E5]/60 text-sm">Create viral YouTube thumbnails with AI</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Product</h5>
            <ul className="space-y-2 text-sm text-[#E5E5E5]/60">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Company</h5>
            <ul className="space-y-2 text-sm text-[#E5E5E5]/60">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Connect</h5>
            <div className="flex gap-4">
              <a href="#" className="text-[#E5E5E5]/60 hover:text-white">
                <Github size={20} />
              </a>
              <a href="#" className="text-[#E5E5E5]/60 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-[#E5E5E5]/60 hover:text-white">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-sm text-[#E5E5E5]/60">
          <p>&copy; 2024 ThumbnailForge AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}