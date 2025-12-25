import React from 'react';
import { cn } from '../../lib/utils';

interface ShineButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const ShineButton: React.FC<ShineButtonProps> = ({ children, onClick, className }) => {
  const baseClasses = `
    relative z-10 flex items-center justify-center rounded-lg border-none
    px-6 py-3 text-lg font-bold text-white
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
    cursor-pointer active:scale-95
  `;

  return (
    <div className="relative w-full overflow-hidden">
      {/* O brilho de fundo foi removido daqui */}
      <button
        onClick={onClick}
        className={cn(
          baseClasses,
          className
        )}
      >
        {children}
      </button>
    </div>
  );
};

export default ShineButton;