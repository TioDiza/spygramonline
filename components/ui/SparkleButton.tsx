import React from 'react';
import { Sparkles } from 'lucide-react'; // Importando o novo ícone

interface SparkleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const SparkleButton: React.FC<SparkleButtonProps> = ({ children, onClick, disabled = false }) => {
  return (
    <div className="relative group w-[350px]"> {/* Wrapper para conter o brilho e o botão */}
      {/* O div para o brilho desfocado */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-yellow-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      
      <button
        onClick={onClick}
        disabled={disabled}
        className="relative z-10 flex items-center justify-center gap-1 whitespace-nowrap rounded-full border-none cursor-pointer
                   w-full px-6 py-3 text-lg font-medium text-white
                   bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400
                   transition-all duration-300 ease-in-out
                   hover:scale-105 hover:ring-4 hover:ring-purple-500/50
                   active:scale-100 active:ring-4 active:ring-purple-500/50
                   focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-5 h-5 text-white" /> {/* Usando o ícone Sparkles */}
        <span>{children}</span>
      </button>
    </div>
  );
};

export default SparkleButton;