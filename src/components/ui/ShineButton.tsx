import React from 'react';
import { cn } from '../../lib/utils';

interface ShineButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  shineColorClasses?: string; // Classes para a cor do brilho (ex: 'bg-red-600')
}

const ShineButton: React.FC<ShineButtonProps> = ({ children, onClick, className, shineColorClasses = 'bg-purple-600' }) => {
  const baseClasses = `
    relative z-10 flex items-center justify-center rounded-full
    px-6 py-3 text-lg font-bold text-white
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black
    active:scale-[0.98]
  `;

  return (
    <div className={cn("relative w-full overflow-hidden group rounded-full")}>
      {/* Efeito de Brilho (Shine) */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-1000 animate-pulse-slow rounded-full",
          shineColorClasses,
          "blur-xl"
        )}
      ></div>
      
      {/* Botão Principal - Aplica o className aqui para cor e largura */}
      <button
        onClick={onClick}
        className={cn(
          baseClasses,
          className // Aplica classes de cor e largura aqui
        )}
      >
        <span className="relative z-20">{children}</span>
      </button>
    </div>
  );
};

export default ShineButton;