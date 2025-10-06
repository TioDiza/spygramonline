import React from 'react';
import { ArrowDown } from 'lucide-react';

const ScrollHint: React.FC = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center 
                    animate-bounce-slow z-50 cursor-pointer">
      {/* Define o gradiente SVG oculto para ser usado na seta */}
      <svg width="0" height="0" className="absolute">
        <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E1306C" /> {/* Pink */}
          <stop offset="50%" stopColor="#C13584" /> {/* Purple */}
          <stop offset="100%" stopColor="#FCAF45" /> {/* Yellow */}
        </linearGradient>
      </svg>

      <p className="text-sm font-semibold mb-1 bg-gradient-to-r from-pink-600 via-purple-600 to-yellow-500 text-transparent bg-clip-text">
        Continue lendo
      </p>
      {/* Aplica o gradiente à seta usando a URL do gradiente SVG */}
      <ArrowDown className="w-5 h-5" style={{ fill: 'url(#instagram-gradient)' }} />
    </div>
  );
};

export default ScrollHint;