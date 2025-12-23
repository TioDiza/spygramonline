import React from 'react';
import { cn } from '../../lib/utils';

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ children, onClick, disabled = false, className }) => {
  const baseClasses = `
    relative z-10 flex items-center justify-center gap-2 rounded-full
    px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
    w-full
  `;

  const variantClasses = `
    bg-gray-800/50 text-gray-400 border border-gray-700
    hover:text-white hover:border-pink-500
    hover:bg-gray-800
    hover:shadow-md hover:shadow-pink-500/20
    active:scale-[0.98]
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses, className)}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;