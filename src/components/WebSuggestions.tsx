import React from 'react';
import { ProfileData } from '../../types';

const mockSuggestions = [
  { username: 'reactjs', reason: 'Sugestões para você' },
  { username: 'tailwindcss', reason: 'Sugestões para você' },
  { username: 'vitejs', reason: 'Popular' },
  { username: 'typescript', reason: 'Sugestões para você' },
];

interface WebSuggestionsProps {
  profileData: ProfileData;
  onLockedFeatureClick: (featureName: string) => void;
}

const WebSuggestions: React.FC<WebSuggestionsProps> = ({ profileData, onLockedFeatureClick }) => {
  return (
    <aside className="hidden lg:block w-80 flex-shrink-0 p-8">
      <div className="flex items-center gap-4 mb-8">
        <img src={profileData.profilePicUrl} alt={profileData.username} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <p className="font-bold text-white text-sm">{profileData.username}</p>
          <p className="text-gray-400 text-sm">{profileData.fullName}</p>
        </div>
        <button onClick={() => onLockedFeatureClick('trocar de conta')} className="ml-auto text-blue-400 text-xs font-semibold">Mudar</button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-400 font-semibold text-sm">Sugestões para você</p>
        <button onClick={() => onLockedFeatureClick('ver todas as sugestões')} className="text-white text-xs font-semibold">Ver tudo</button>
      </div>

      <div className="space-y-4">
        {mockSuggestions.map(suggestion => (
          <div key={suggestion.username} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            <div>
              <p className="font-bold text-white text-xs">{suggestion.username}</p>
              <p className="text-gray-500 text-xs">{suggestion.reason}</p>
            </div>
            <button onClick={() => onLockedFeatureClick(`seguir @${suggestion.username}`)} className="ml-auto text-blue-400 text-xs font-semibold">Seguir</button>
          </div>
        ))}
      </div>

      <footer className="mt-8 text-gray-600 text-xs space-y-4">
        <p>Sobre · Ajuda · Imprensa · API · Carreiras · Privacidade · Termos · Localizações · Idioma</p>
        <p>© 2024 SPYGRAM</p>
      </footer>
    </aside>
  );
};

export default WebSuggestions;