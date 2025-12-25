import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, MessageSquare } from 'lucide-react';
import ShineButton from './ui/ShineButton';

interface RecoveredDataCardProps {
  onUnlockClick: () => void;
}

// Função para gerar um número aleatório dentro de um intervalo
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const RecoveredDataCard: React.FC<RecoveredDataCardProps> = ({ onUnlockClick }) => {
  const [photosCount, setPhotosCount] = useState(0);
  const [chatsCount, setChatsCount] = useState(0);

  useEffect(() => {
    // Fotos: 21 a 37
    setPhotosCount(getRandomNumber(21, 37));
    // Conversas: 5 a 15
    setChatsCount(getRandomNumber(5, 15));
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.6 }} // Atraso após o card de placa
      className="mt-12 mb-12 p-6 text-center w-full mx-auto relative overflow-hidden bg-gray-900/50 border border-gray-700 rounded-xl"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <MessageSquare className="w-10 h-10 text-pink-400 animate-pulse" />
          <h2 className="text-3xl font-extrabold text-white">
            <span className="bg-gradient-to-r from-pink-400 via-red-500 to-yellow-400 text-transparent bg-clip-text">
              DADOS APAGADOS RECUPERADOS
            </span>
          </h2>
          <Image className="w-10 h-10 text-yellow-400 animate-pulse" />
        </div>

        <p className="text-gray-200 mb-6 max-w-md mx-auto text-lg font-medium">
          **IMPERDÍVEL!** Nosso sistema de recuperação de dados encontrou arquivos que o alvo pensou ter deletado para sempre.
        </p>
        
        {/* Contadores de Dados Recuperados */}
        <div className="flex justify-around items-center gap-4 mb-8 p-4 bg-black/50 border border-pink-700 rounded-lg">
            <div className="flex flex-col items-center">
                <p className="text-5xl font-extrabold text-pink-400">{photosCount}</p>
                <p className="text-sm text-gray-400 mt-1">Fotos Recuperadas</p>
            </div>
            <div className="w-px h-16 bg-gray-700"></div>
            <div className="flex flex-col items-center">
                <p className="text-5xl font-extrabold text-yellow-400">{chatsCount}</p>
                <p className="text-sm text-gray-400 mt-1">Conversas Secretas</p>
            </div>
        </div>

        <p className="text-xl text-red-400 font-bold mb-6">
          Desbloqueie agora e veja o que ele(a) estava escondendo!
        </p>

        <ShineButton 
          onClick={onUnlockClick} 
          // Sobrescreve o BG e o anel de foco (ring)
          className="w-full bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 hover:ring-pink-500/50 active:ring-pink-500/50"
          shineColorClasses="bg-pink-600"
        >
          VER FOTOS E CONVERSAS APAGADAS
        </ShineButton>
      </div>
    </motion.div>
  );
};

export default RecoveredDataCard;