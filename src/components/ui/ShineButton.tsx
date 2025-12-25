import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface ShineButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const ShineButton: React.FC<ShineButtonProps> = ({ children, onClick, className, disabled = false }) => {
  const baseClasses = `
    relative overflow-hidden rounded-full py-3 px-6 text-lg font-bold text-white 
    bg-gradient-to-r from-pink-600 via-purple-600 to-yellow-500 
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-4 focus:ring-pink-500/50 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const interactiveClasses = `
    hover:scale-[1.02] active:scale-[0.98]
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, !disabled && interactiveClasses, className)}
    >
      {/* Efeito de Brilho Deslizante */}
      <motion.span
        className="absolute inset-0 block"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'linear',
          delay: 0.5,
        }}
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4) 50%, transparent)',
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default ShineButton;