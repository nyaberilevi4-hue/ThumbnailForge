import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

export default function TitleSuggestions({ topic, onPickTitle }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (topic.trim()) {
      const suggestions = [
        `I Tried ${topic}...`,
        `${topic} but it's INSANE`,
        `Ranking ${topic}`,
        `${topic} GONE WRONG`,
        `You Won't Believe This ${topic}`
      ];
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  }, [topic]);

  if (!suggestions.length) return null;

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs text-[#E5E5E5]/50 flex items-center gap-1">
        <Lightbulb size={12} /> Suggestions
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onPickTitle(s)}
            className="text-xs bg-[#FF0000]/20 hover:bg-[#FF0000]/40 text-[#FF0000] px-2 py-1 rounded transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}