import React from 'react';
import { ArrowDown } from 'lucide-react';

const ScrollHint: React.FC = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400 animate-bounce-slow z-50">
      <p className="text-sm mb-1">Continue lendo</p>
      <ArrowDown className="w-5 h-5" />
    </div>
  );
};

export default ScrollHint;