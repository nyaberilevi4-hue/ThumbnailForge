import React from 'react';

// Aurora starry-night hero background: crisp star field layer beneath four
// glowing neon ribbons that stretch, rotate, and reshape independently via
// CSS keyframes (see .aurora-* / .wave-* / @keyframes cosmic-dance in index.css).
export default function AnimatedBackground() {
  return (
    <div className="aurora-viewport">
      <div className="stars-layer" />
      <div className="aurora-container">
        <div className="aurora-wave wave-one" />
        <div className="aurora-wave wave-two" />
        <div className="aurora-wave wave-three" />
        <div className="aurora-wave wave-four" />
        <div className="aurora-wave wave-five" />
      </div>
    </div>
  );
}
