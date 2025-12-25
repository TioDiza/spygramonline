import React from 'react';
import { cn } from '../../lib/utils'; // Importando a função cn

interface ShineButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  checkoutUrl?: string;
  className?: string;
}

const ShineButton: React.FC<ShineButtonProps> = ({ children, onClick, disabled = false, checkoutUrl, className }) => {
  
  // Classes base do botão (usando o gradiente padrão do SparkleButton como fallback)
  const defaultBgClasses = 'bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400';
  
  const baseButtonClasses = `
    relative z-10 flex items-center justify-center gap-1 rounded-full border-none
    px-6 py-3 text-lg font-medium text-white
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
    mx-auto
  `;

  // Classes de interação simplificadas para focar apenas no clique
  const interactiveClasses = `
    cursor-pointer
    hover:scale-[1.02] 
    active:scale-[0.98] active:ring-4 active:ring-purple-500/50
  `;

  const handleButtonClick = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className={cn("relative w-full overflow-hidden", !disabled && "group", className)}>
      {/* O brilho desfocado foi removido */}
      
      <button
        onClick={handleButtonClick}
        disabled={disabled}
        className={cn(
          baseButtonClasses,
          // Aplica as classes de fundo padrão se nenhuma classe for fornecida via className
          !className?.includes('bg-') && defaultBgClasses,
          !disabled && interactiveClasses
        )}
      >
        <span className="text-center">{children}</span>
      </button>
    </div>
  );
};

export default ShineButton;