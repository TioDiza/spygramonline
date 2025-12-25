import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../src/lib/utils'; // Importando a função cn

interface SparkleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  checkoutUrl?: string; // Nova prop para o URL de checkout
}

const SparkleButton: React.FC<SparkleButtonProps> = ({ children, onClick, disabled = false, checkoutUrl }) => {
  const baseButtonClasses = `
    relative z-10 flex items-center justify-center gap-1 rounded-full border-none
    px-4 py-2 text-sm font-medium text-white
    bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black
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
      window.open(checkoutUrl, '_blank'); // Abre o URL em uma nova aba
    } else if (onClick) {
      onClick(); // Executa o onClick padrão se não houver checkoutUrl
    }
  };

  return (
    <div className={cn("relative w-full overflow-hidden", !disabled && "group")}>
      {/* O div para o brilho desfocado foi removido */}
      
      <button
        onClick={handleButtonClick}
        disabled={disabled}
        className={cn(
          baseButtonClasses,
          !disabled && interactiveClasses // Aplica classes interativas apenas se não estiver desabilitado
        )}
      >
        <Sparkles className="w-4 h-4 text-white" />
        <span className="text-center">{children}</span>
      </button>
    </div>
  );
};

export default SparkleButton;