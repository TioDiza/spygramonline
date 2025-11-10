import React from 'react';
import type { InteractionProfile } from '../../types'; // Caminho corrigido

interface InteractionCardProps {
  profile: InteractionProfile;
  isPremiumLocked?: boolean; // Nova prop
}

const InteractionCard: React.FC<InteractionCardProps> = ({ profile, isPremiumLocked = false }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-800/50 rounded-xl border border-gray-700 shadow-md hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
      <div className="relative w-20 h-20 rounded-full border-2 border-gray-600 object-cover mb-3 overflow-hidden">
        <img
          src={profile.profilePicUrl}
          alt={`${profile.username}'s profile picture`}
          className={`w-full h-full object-cover ${isPremiumLocked ? 'blur-sm' : ''}`}
        />
        {isPremiumLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-bold">
            SECRETO
          </div>
        )}
      </div>
      <p className={`text-white font-semibold text-sm truncate w-full text-center ${isPremiumLocked ? 'blur-sm select-none' : ''}`}>
        {isPremiumLocked ? 'Usuário Oculto' : `@${profile.username}`}
      </p>
      <p className="text-gray-400 text-xs mt-1">Interação: {profile.interactionScore}%</p>
    </div>
  );
};

export default InteractionCard;