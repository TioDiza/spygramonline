import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorButtonProps {
  onClick?: () => void;
  className?: string;
}

const ScrollIndicatorButton: React.FC<ScrollIndicatorButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 px-6 py-3 rounded-full
        bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400
        text-white font-semibold text-lg
        shadow-lg hover:shadow-xl transition-all duration-300
        hover:scale-105 active:scale-100
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black
        mt-16 mb-8
        ${className || ''}
      `}
    >
      <span>Continue Lendo</span>
      <ChevronDown className="w-5 h-5 animate-bounce" />
    </button>
  );
};

export default ScrollIndicatorButton;