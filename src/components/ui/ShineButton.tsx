import React from 'react';
import { cn } from '../../lib/utils';
import { motion, Variants } from 'framer-motion';

interface ShineButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  shineColorClasses?: string; // Classes para a cor do brilho (ex: bg-red-600)
}

const ShineButton: React.FC<ShineButtonProps> = ({ children, onClick, className, shineColorClasses = 'bg-purple-600' }) => {
  const baseClasses = `
    relative z-10 flex items-center justify-center rounded-full
    py-3 px-6 text-lg font-bold text-white
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
    cursor-pointer active:scale-95
  `;

  // Animação de reflexo (shine)
  const shineVariants: Variants = {
    initial: { x: '-100%' },
    animate: {
      x: '100%',
      transition: {
        duration: 2,
        ease: [0, 0, 1, 1], // Usando array para satisfazer o tipo 'Easing'
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  };

  return (
    <div className={cn("relative overflow-hidden rounded-full", className)}>
      {/* Elemento de Brilho (Reflexo) - Opacidade aumentada para 50% */}
      <motion.div
        className={cn(
          "absolute inset-0 w-full h-full opacity-50", // Opacidade aumentada para 50%
          shineColorClasses
        )}
        variants={shineVariants}
        initial="initial"
        animate="animate"
        style={{
          // Cria o efeito de reflexo diagonal, opacidade do branco aumentada para 0.8
          backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)`,
          width: '200%', // Garante que o reflexo cubra o botão
          left: '-100%',
        }}
      />
      
      <button
        onClick={onClick}
        className={cn(baseClasses, className)}
        style={{
          // Garante que o botão tenha a cor de fundo definida pelo className
          backgroundColor: 'transparent', 
        }}
      >
        {children}
      </button>
    </div>
  );
};

export default ShineButton;