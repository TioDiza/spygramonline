import React from 'react';

interface SparkleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const SparkleButton: React.FC<SparkleButtonProps> = ({ children, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative flex items-center justify-center gap-1 whitespace-nowrap rounded-full border-none cursor-pointer
                 w-[250px] px-6 py-3 text-lg font-medium text-white
                 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400
                 transition-all duration-300 ease-in-out
                 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/70
                 active:shadow-xl active:shadow-purple-500/70 active:scale-100
                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* Um ícone de estrela simplificado para representar o 'sparkle' */}
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
      </svg>
      <span>{children}</span>
    </button>
  );
};

export default SparkleButton;