import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Radar } from 'lucide-react';

interface LocationTrackerSectionProps {
  userCity: string;
}

const LocationTrackerSection: React.FC<LocationTrackerSectionProps> = ({ userCity }) => {
  const cityDisplay = userCity.toUpperCase();

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="mt-16 mb-12 p-6 bg-gray-900/70 border border-red-600/50 rounded-2xl shadow-2xl shadow-red-600/20 text-center"
    >
      <h2 className="text-3xl font-extrabold text-white mb-4">
        <span className="bg-gradient-to-r from-red-500 to-pink-600 text-transparent bg-clip-text">
          RASTREAMENTO DE LOCALIZAÇÃO EM TEMPO REAL
        </span>
      </h2>
      <p className="text-gray-300 mb-8 max-w-md mx-auto text-lg font-medium">
        **PROVA IRREFUTÁVEL!** Nosso sistema de rastreamento de IP de última geração capturou a localização exata do alvo.
        <span className="block mt-2 text-yellow-400 font-bold">
          Desbloqueie agora e veja onde ele está neste exato momento!
        </span>
      </p>

      {/* Map Mockup with Animation (Ajustado para o estilo solicitado) */}
      <div className="relative w-full h-48 bg-[#1a1a1a] rounded-2xl overflow-hidden mb-6 border border-red-700/50">
        {/* Simulated Map Grid Background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}></div>
        
        {/* Animated Radar Effect */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-3/4 h-3/4 border-4 border-red-500 rounded-full opacity-50"></div>
        </motion.div>
        
        {/* Central Pin - Usando MapPin para corrigir o erro TS6133 */}
        <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2">
          <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" fill="#EF4444" />
        </div>

        {/* Location Text Overlay (Ajustado para o estilo solicitado) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/90 px-6 py-3 rounded-full border border-red-600 shadow-xl">
          <p className="text-lg font-bold text-red-400 flex items-center gap-2">
            <Radar className="w-4 h-4 animate-spin-slow" />
            PERTO DE {cityDisplay}
          </p>
        </div>
      </div>
      
      <p className="text-sm text-red-400 font-semibold">
        Atenção: A localização é atualizada a cada 5 minutos. Não perca essa chance!
      </p>
    </motion.div>
  );
};

export default LocationTrackerSection;