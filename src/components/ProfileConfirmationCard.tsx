import React from 'react';
import { ProfileData } from '../../types';
import { CheckCircle, XCircle, User, ShieldAlert } from 'lucide-react';
import SparkleButton from './ui/SparkleButton'; // Corrigido o caminho
import SecondaryButton from './ui/SecondaryButton'; // Importar SecondaryButton
import { motion } from 'framer-motion';

interface ProfileConfirmationCardProps {
  profileData: ProfileData;
  onConfirm: () => void;
  onCorrect: () => void;
}

const ProfileConfirmationCard: React.FC<ProfileConfirmationCardProps> = ({ profileData, onConfirm, onCorrect }) => {
  const isMockData = profileData.username === 'usuario_mockado'; // Check against mock username

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="w-full max-w-md mx-auto p-6 bg-gray-900/80 backdrop-blur-md border border-purple-500 rounded-xl shadow-2xl shadow-purple-500/20 text-center"
    >
      <ShieldAlert className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
      <h2 className="text-2xl font-extrabold text-white mb-4">CONFIRMAR ALVO</h2>
      
      <p className="text-gray-300 mb-6">
        Você realmente deseja invadir o perfil abaixo?
      </p>
      
      {isMockData && (
        <div className="mb-4 p-3 bg-yellow-900/50 border border-yellow-500 text-yellow-300 rounded-lg text-sm">
          Aviso: Dados de exemplo. A invasão real pode falhar se o perfil não for encontrado.
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-4 bg-gray-800 p-4 rounded-lg border border-gray-700 mb-8">
        <img
          src={profileData.profilePicUrl}
          alt={profileData.username}
          className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
        />
        <div>
          <p className="text-2xl font-bold text-white">@{profileData.username}</p>
          <p className="text-sm text-gray-400">{profileData.fullName}</p>
          <div className="flex items-center justify-center mt-1 text-xs text-gray-500">
            <User className="w-3 h-3 mr-1" />
            <span>{new Intl.NumberFormat().format(profileData.followers)} Seguidores</span>
          </div>
        </div>
      </div>

      <div className="space-y-3"> {/* Reduced space-y for tighter button layout */}
        <SparkleButton onClick={onConfirm}>
          <CheckCircle className="w-4 h-4" />
          CONFIRMAR INVASÃO
        </SparkleButton>
        
        <SecondaryButton onClick={onCorrect}>
          <XCircle className="w-4 h-4" />
          Corrigir Nome de Usuário (@)
        </SecondaryButton>
      </div>
    </motion.div>
  );
};

export default ProfileConfirmationCard;