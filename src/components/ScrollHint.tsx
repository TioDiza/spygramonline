import React from 'react';
import { ArrowDown } from 'lucide-react';

const ScrollHint: React.FC = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center 
                    animate-bounce-slow z-50 cursor-pointer">
      <p className="text-sm font-semibold mb-1 bg-gradient-to-r from-pink-600 via-purple-600 to-yellow-500 text-transparent bg-clip-text">
        Continue lendo
      </p>
      <ArrowDown className="w-5 h-5 bg-gradient-to-r from-pink-600 via-purple-600 to-yellow-500 text-transparent bg-clip-text" />
    </div>
  );
};

export default ScrollHint;