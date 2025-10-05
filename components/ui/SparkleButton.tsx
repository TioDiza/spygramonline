import React from 'react';
import { Zap } from 'lucide-react'; // Importando o ícone Zap

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
                 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
    >
      {/* Ícone de raio (Zap) */}
      <Zap className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-180 group-hover:scale-125" />
      <span className="text-white">
        {children}
      </span>
    </button>
  );
};

export default SparkleButton;