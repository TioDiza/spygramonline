import React from 'react';
import { ArrowDown } from 'lucide-react';

interface ScrollDownButtonProps {
  onClick?: () => void;
}

const ScrollDownButton: React.FC<ScrollDownButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-16 flex items-center justify-center gap-2 px-6 py-3 rounded-full
                 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400
                 text-white font-semibold text-lg shadow-lg
                 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500
                 transition-all duration-300 ease-in-out
                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black
                 animate-bounce-slow"
    >
      <span>Continue Lendo</span>
      <ArrowDown className="w-5 h-5" />
    </button>
  );
};

export default ScrollDownButton;