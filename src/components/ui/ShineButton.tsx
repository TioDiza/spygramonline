import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ShineButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const ShineButton: React.FC<ShineButtonProps> = ({ children, onClick, className, disabled = false }) => {
  const baseClasses = `
    relative z-10 flex items-center justify-center rounded-xl
    px-6 py-3 text-lg font-bold text-white
    bg-gradient-to-r from-red-600 to-pink-700
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const shineVariants: Variants = {
    initial: { x: '-100%' },
    animate: {
      x: '100%',
      transition: {
        duration: 2,
        ease: [0, 0, 1, 1], // Linear
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, className, "overflow-hidden group")}
    >
      <span className="relative z-20">{children}</span>
      
      {/* Efeito de Brilho (Shine) - Mais realista com gradiente */}
      <motion.span
        className="absolute top-0 left-0 h-full w-[200%] transform skew-x-12" // Elemento mais largo
        style={{
          // Gradiente: transparente -> branco/opacidade -> transparente
          backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)',
        }}
        variants={shineVariants}
        initial="initial"
        animate="animate"
      />
    </button>
  );
};

export default ShineButton;