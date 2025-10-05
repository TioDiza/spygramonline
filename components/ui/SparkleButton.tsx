import React from 'react';

interface SparkleButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const SparkleButton: React.FC<SparkleButtonProps> = ({ children, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group relative flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-0 px-6 py-3 text-lg font-semibold text-white transition-all duration-300
                 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600
                 shadow-lg shadow-purple-500/50
                 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/75
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black
                 disabled:opacity-50 disabled:cursor-not-allowed mt-6" // Adicionado mt-6 para espaçamento
    >
      {/* Ícone de estrela/brilho simples */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-180 group-hover:scale-125"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      <span className="text-white">
        {children}
      </span>
    </button>
  );
};

export default SparkleButton;