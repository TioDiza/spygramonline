import React from 'react';
import { cn } from '../../lib/utils'; // Importando a função cn

interface ShineButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string; // Classes para o botão principal (incluindo bg)
  shineColorClasses?: string; // Classes para o efeito de brilho interno
}

const ShineButton: React.FC<ShineButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false, 
  className,
  shineColorClasses = 'bg-gradient-to-r from-red-600 to-pink-700' // Padrão para o tema principal
}) => {
  const baseButtonClasses = `
    relative z-10 flex items-center justify-center gap-1 rounded-full border-none
    px-6 py-3 text-lg font-bold text-white
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
    mx-auto
  `;

  const interactiveClasses = `
    cursor-pointer
    hover:scale-[1.02] hover:ring-4 hover:ring-pink-500/50
    active:scale-[0.98] active:ring-4 active:ring-pink-500/50
  `;
  
  // Determina a classe de fundo. Se o className contiver 'bg-' ou 'from-', ele é usado. Caso contrário, usamos o padrão.
  const customBgClass = className?.split(' ').find(cls => cls.startsWith('bg-') || cls.startsWith('from-'));
  const finalBgClass = customBgClass || 'bg-gradient-to-r from-red-600 to-pink-700';

  // Remove a classe de BG customizada do className para evitar duplicação, mas mantém o restante das classes customizadas (como w-full)
  const otherCustomClasses = className?.split(' ').filter(cls => !cls.startsWith('bg-') && !cls.startsWith('from-')).join(' ') || '';

  return (
    <div className={cn("relative w-full", !disabled && "group", otherCustomClasses)}>
      {/* O div para o brilho desfocado (usando shineColorClasses) */}
      <div className={cn(
        "absolute inset-2 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt",
        shineColorClasses
      )}></div>
      
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          baseButtonClasses,
          finalBgClass, // Aplica a cor de fundo (customizada ou padrão)
          !disabled && interactiveClasses,
          otherCustomClasses // Aplica outras classes customizadas (como w-full)
        )}
      >
        <span className="text-center">{children}</span>
      </button>
    </div>
  );
};

export default ShineButton;