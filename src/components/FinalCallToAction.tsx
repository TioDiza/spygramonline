import React from 'react';
import { motion } from 'framer-motion';
import { LockOpen, Zap } from 'lucide-react';

interface FinalCallToActionProps {
  checkoutUrl: string; // Adicionando prop para o URL de checkout
}

const FinalCallToAction: React.FC<FinalCallToActionProps> = ({ checkoutUrl }) => {
  const handleClick = () => {
    window.open(checkoutUrl, '_blank'); // Abre o URL em uma nova aba
  };

  return (
    <>
      <style>{`
        @keyframes cta-pulse-animation {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 35px rgba(236, 72, 153, 0.7);
          }
        }
        .animate-cta-pulse {
          animation: cta-pulse-animation 2s infinite ease-in-out;
        }
      `}</style>
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
            bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 
            text-white font-extrabold text-xl rounded-full 
            transform transition-all duration-300 ease-in-out 
            hover:shadow-2xl hover:shadow-pink-500/50
            focus:outline-none focus:ring-4 focus:ring-pink-300
            animate-cta-pulse
          "
        >
          <LockOpen className="w-7 h-7 transform transition-transform duration-300 group-hover:rotate-[-10deg]" />
          <span>Descobrir Tudo AGORA 🐂</span>
          <Zap className="w-7 h-7 transform transition-transform duration-300 group-hover:rotate-[10deg]" />
        </button>
      </motion.div>
    </>
  );
};

export default FinalCallToAction;