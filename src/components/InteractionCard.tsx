import React from 'react';
import type { InteractionProfile } from '../../types';

interface InteractionCardProps {
  profile: InteractionProfile;
}

const InteractionCard: React.FC<InteractionCardProps> = ({ profile }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-800/50 rounded-xl border border-gray-700 shadow-md hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
      <img
        src={profile.profilePicUrl}
        alt={`${profile.username}'s profile picture`}
        className="w-20 h-20 rounded-full border-2 border-gray-600 object-cover mb-3"
      />
      <p className="text-white font-semibold text-sm truncate w-full text-center">@{profile.username}</p>
      <p className="text-gray-400 text-xs mt-1">Interação: {profile.interactionScore}%</p>
    </div>
  );
};

export default InteractionCard;