import React, { useState } from 'react';
import { Sparkles } from 'lucide-react'; // Usando Lucide para o ícone de brilho

interface SparkleButtonProps {
  onClick: () => void;
  isLoading: boolean;
  children: React.ReactNode;
}

const SparkleButton: React.FC<SparkleButtonProps> = ({ onClick, isLoading, children }) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => setIsActive(true);
  const handleMouseLeave = () => setIsActive(false);
  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);

  const buttonClasses = `
    relative flex items-center gap-1 whitespace-nowrap rounded-full px-6 py-3 text-lg font-medium
    cursor-pointer border-0 transition-all duration-300 ease-in-out
    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
    ${isActive ? 'scale-105 shadow-lg shadow-purple-500/75' : 'scale-100 shadow-md shadow-purple-500/25'}
    bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 text-white
    hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500
  `;

  const sparkleClasses = `
    transition-transform duration-300 ease-in-out
    ${isActive ? 'animate-sparkle-bounce' : ''}
  `;

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={buttonClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <Sparkles className={`w-5 h-5 ${sparkleClasses}`} />
      <span className="text-white">{children}</span>
    </button>
  );
};

export default SparkleButton;