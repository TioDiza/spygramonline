import React from 'react';
import { cn } from '../../lib/utils';
import { Sparkles } from 'lucide-react';

interface ShineButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  shineColorClasses?: string; // Classes para a cor do brilho (ex: bg-red-600)
}

const ShineButton: React.FC<ShineButtonProps> = ({ children, onClick, className, shineColorClasses = 'bg-purple-600' }) => {
  const baseClasses = `
    relative z-10 flex items-center justify-center gap-2 rounded-lg border-none
    px-6 py-3 text-lg font-bold text-white
    bg-gradient-to-r from-purple-600 to-pink-600
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black
    active:scale-95
  `;

  return (
    <div className={cn("relative w-full overflow-hidden group", className)}>
      {/* Efeito de Brilho Desfocado */}
      <div className={cn(
        "absolute inset-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt blur-md",
        shineColorClasses
      )}></div>
      
      <button
        onClick={onClick}
        className={cn(
          baseClasses,
          className
        )}
        style={{
          // Garante que o background do botão seja visível mesmo com o gradiente
          background: 'linear-gradient(to right, var(--tw-gradient-stops))',
        }}
      >
        <Sparkles className="w-5 h-5 text-white" />
        <span className="text-center">{children}</span>
      </button>
    </div>
  );
};

export default ShineButton;