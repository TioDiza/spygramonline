import React from 'react';
import { motion } from 'framer-motion';
import { LockOpen, Zap } from 'lucide-react';

const FinalCallToAction: React.FC = () => {
  const handleClick = () => {
    alert('Redirecionando para a página de compra final...');
  };

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-[100] flex justify-center"
    >
      <button
        onClick={handleClick}
        className="
          group relative flex items-center justify-center gap-3 px-8 py-4 
          bg-gradient-to-r from-green-400 via-cyan-500 to-blue-600 
          text-white font-extrabold text-xl rounded-full 
          shadow-lg shadow-cyan-500/30 
          transform transition-all duration-300 ease-in-out 
          hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50
          focus:outline-none focus:ring-4 focus:ring-cyan-300
        "
      >
        {/* Pulsing background glow */}
        <span className="absolute inset-0 rounded-full bg-inherit opacity-30 transition-opacity duration-300 animate-pulse"></span>
        
        <LockOpen className="w-7 h-7 transform transition-transform duration-300 group-hover:rotate-[-10deg]" />
        <span>DESBLOQUEAR TUDO AGORA</span>
        <Zap className="w-7 h-7 transform transition-transform duration-300 group-hover:rotate-[10deg]" />
      </button>
    </motion.div>
  );
};

export default FinalCallToAction;