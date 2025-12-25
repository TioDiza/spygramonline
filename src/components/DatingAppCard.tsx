import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Flame, Search, Lock } from 'lucide-react';

interface DatingAppCardProps {
  onUnlockClick: () => void;
}

const DatingAppCard: React.FC<DatingAppCardProps> = ({ onUnlockClick }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="mt-12 mb-12 p-6 bg-gradient-to-br from-pink-900/70 to-red-900/70 border border-red-500 rounded-2xl shadow-2xl shadow-red-500/30 text-center w-full mx-auto relative overflow-hidden"
    >
      {/* Efeito de fundo sutil */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(255, 0, 0, 0.5) 0%, transparent 70%)',
      }}></div>

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Flame className="w-10 h-10 text-red-400 animate-pulse" />
          <h2 className="text-3xl font-extrabold text-white">
            <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 text-transparent bg-clip-text">
              O SEGREDO MAIS QUENTE
            </span>
          </h2>
          <Heart className="w-10 h-10 text-pink-400 animate-pulse" />
        </div>

        <p className="text-gray-200 mb-6 max-w-md mx-auto text-lg font-medium">
          **DESMASCARADO!** Descubra agora se o seu alvo está ativo no **Tinder, Badoo, Happn** ou qualquer outro aplicativo de relacionamento.
        </p>
        
        {/* Mockup de Busca */}
        <div className="flex items-center justify-center gap-3 bg-black/50 border border-red-700 rounded-full p-3 mb-6 w-fit mx-auto">
            <Search className="w-5 h-5 text-red-400" />
            <span className="text-sm text-gray-400">Buscando perfis de namoro...</span>
            <Lock className="w-5 h-5 text-red-400" />
        </div>

        <p className="text-xl text-yellow-300 font-bold mb-6">
          Não viva na dúvida. Obtenha a verdade que pode mudar tudo!
        </p>

        <button
          onClick={onUnlockClick}
          className="w-full py-3 px-6 text-lg font-bold text-white rounded-xl bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-red-500/50"
        >
          VERIFICAR APPS DE NAMORO AGORA
        </button>
      </div>
    </motion.div>
  );
};

export default DatingAppCard;