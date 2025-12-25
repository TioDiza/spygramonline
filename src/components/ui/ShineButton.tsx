import React from 'react';
import { cn } from '../../lib/utils';

interface ShineButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  gradientClasses?: string; // Adicionado para permitir gradientes personalizados
}

const ShineButton: React.FC<ShineButtonProps> = ({ 
  children, 
  onClick, 
  className, 
  disabled = false,
  gradientClasses,
}) => {
  
  // Gradiente padrão (usado em InvasionConcludedPage para desconto)
  const defaultGradient = "from-red-600 via-pink-700 to-purple-800 hover:from-red-700 hover:via-pink-800 hover:to-purple-900";
  const finalGradient = gradientClasses || defaultGradient;

  const baseButtonClasses = `
    relative z-10 flex items-center justify-center gap-1 rounded-full border-none
    px-6 py-3 text-lg font-bold text-white
    bg-gradient-to-r ${finalGradient}
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const interactiveClasses = `
    cursor-pointer
    hover:scale-[1.02]
    active:scale-[0.98]
  `;

  return (
    <div className={cn("relative", className, !disabled && "group")}>
      {/* O div para o brilho desfocado (Shine effect) */}
      <div className={`absolute inset-0.5 bg-gradient-to-r ${finalGradient} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`}></div>
      
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          baseButtonClasses,
          !disabled && interactiveClasses
        )}
      >
        <span className="text-center">{children}</span>
      </button>
    </div>
  );
};

export default ShineButton;