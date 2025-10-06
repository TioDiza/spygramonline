import React from 'react';
import { ArrowDown } from 'lucide-react';

const ScrollHint: React.FC = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center p-3 rounded-full 
                    bg-gradient-to-r from-pink-600 via-purple-600 to-yellow-500 text-white 
                    shadow-lg shadow-pink-500/50 animate-bounce-slow z-50 cursor-pointer">
      <p className="text-sm font-semibold mb-1">Continue lendo</p>
      <ArrowDown className="w-5 h-5" />
    </div>
  );
};

export default ScrollHint;