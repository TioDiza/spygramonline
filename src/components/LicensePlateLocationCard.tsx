import React from 'react';
import { motion } from 'framer-motion';
import { Car, MapPin, Lock } from 'lucide-react';

interface LicensePlateLocationCardProps {
  onUnlockClick: () => void;
}

const LicensePlateLocationCard: React.FC<LicensePlateLocationCardProps> = ({ onUnlockClick }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="mt-12 mb-12 p-6 text-center w-full mx-auto relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Car className="w-10 h-10 text-blue-400 animate-pulse" />
          <h2 className="text-3xl font-extrabold text-white">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
              RASTREAMENTO VEICULAR
            </span>
          </h2>
          <MapPin className="w-10 h-10 text-purple-400 animate-pulse" />
        </div>

        <p className="text-gray-200 mb-6 max-w-md mx-auto text-lg font-medium">
          **NOVIDADE!** Descubra a localização exata do veículo do seu alvo, apenas com a placa. Rastreamento em tempo real via satélite.
        </p>
        
        {/* Mockup de Busca */}
        <div className="flex items-center justify-center gap-3 bg-black/50 border border-blue-700 rounded-full p-3 mb-6 w-fit mx-auto">
            <Car className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-400">Buscando localização da placa...</span>
            <Lock className="w-5 h-5 text-blue-400" />
        </div>

        <p className="text-xl text-yellow-300 font-bold mb-6">
          Não deixe rastros. Saiba onde o carro está agora!
        </p>

        <button
          onClick={onUnlockClick}
          className="w-full py-3 px-6 text-lg font-bold text-white rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        >
          RASTREAR PLACA AGORA
        </button>
      </div>
    </motion.div>
  );
};

export default LicensePlateLocationCard;