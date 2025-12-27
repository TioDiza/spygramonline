import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Plus } from 'lucide-react';
import { ProfileData, SuggestedProfile, FeedPost } from '../../types';
import BlurredPost from './BlurredPost'; // Importa o novo componente

// Helper function to mask usernames
const maskUsername = (username: string) => {
  if (username.length <= 4) return username; // Não mascara nomes curtos (como os gerados)
  if (username.length <= 3) return '*******';
  return `${username.substring(0, 3).toLowerCase()}****`;
};

interface ClickableProps {
  onLockedFeatureClick: (featureName: string) => void;
}

const InstagramHeader: React.FC<ClickableProps> = ({ onLockedFeatureClick }) => (
  <header className="grid grid-cols-3 items-center px-4 py-2 border-b border-gray-800 bg-black sticky top-0 z-10 md:hidden">
    <button onClick={() => onLockedFeatureClick('criar uma publicação')} className="flex justify-start">
      <img src="/icons/add-content.png" alt="Criar" className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
    </button>
    <div onClick={() => onLockedFeatureClick('trocar de conta')} className="flex justify-center items-center gap-1 cursor-pointer">
      <img src="/instagram-logo.png" alt="Instagram Logo" className="h-8" style={{ filter: 'invert(1)' }} />
      <ChevronDown className="w-5 h-5 text-white mt-1" />
    </div>
    <button onClick={() => onLockedFeatureClick('ver as notificações')} className="flex justify-end">
      <img src="/icons/heart.png" alt="Notificações" className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
    </button>
  </header>
);

const InstagramFooter: React.FC<{ profileData: ProfileData } & ClickableProps> = ({ profileData, onLockedFeatureClick }) => {
  const navigate = useNavigate();
  return (
    <footer className="flex justify-around items-center py-3 border-t border-gray-800 bg-black sticky bottom-0 z-10 md:hidden">
      <button onClick={() => onLockedFeatureClick('acessar a página inicial')}>
        <img src="/icons/home.png" alt="Página Inicial" className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
      </button>
      <button onClick={() => onLockedFeatureClick('fazer uma pesquisa')}>
        <img src="/icons/search.png" alt="Pesquisa" className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
      </button>
      <button onClick={() => onLockedFeatureClick('ver os Reels')}>
        <img src="/icons/reels.png" alt="Reels" className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
      </button>
      <button onClick={() => navigate('/messages')} className="relative">
        <img src="/icons/send.png" alt="Mensagens" className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-black"></div>
      </button>
      <button onClick={() => onLockedFeatureClick('ver o seu perfil')}>
        <img src={profileData.profilePicUrl} alt={profileData.username} className="w-7 h-7 rounded-full object-cover" />
      </button>
    </footer>
  );
};

interface InstagramFeedContentProps extends ClickableProps {
  profileData: ProfileData;
  suggestedProfiles: SuggestedProfile[];
  posts: FeedPost[];
  locations: string[];
}

const InstagramFeedContent: React.FC<InstagramFeedContentProps> = ({ profileData, suggestedProfiles, posts, locations, onLockedFeatureClick }) => {
  // Agora, posts sempre terá conteúdo (real ou mockado)
  const postsToDisplay = posts.length > 0 ? posts : [];

  return (
    <>
      <InstagramHeader onLockedFeatureClick={onLockedFeatureClick} />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="flex p-3 space-x-4 border-b border-gray-800 overflow-x-auto flex-shrink-0 scrollbar-hide">
          <div onClick={() => onLockedFeatureClick('criar um story')} className="flex flex-col items-center flex-shrink-0 space-y-1 cursor-pointer">
            <div className="relative"><img src={profileData.profilePicUrl} alt="Seu story" className="w-16 h-16 rounded-full object-cover" />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center"><Plus className="w-4 h-4 text-white" /></div>
            </div><span className="text-xs text-gray-400">Seu story</span>
          </div>
          {suggestedProfiles.map((story, index) => {
            const isCloseFriend = index < 3;
            const ringClasses = isCloseFriend
              ? 'bg-green-500'
              : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600';

            return (
              <div key={index} onClick={() => onLockedFeatureClick(`ver os stories de @${story.username}`)} className="flex flex-col items-center flex-shrink-0 space-y-1 text-center relative cursor-pointer">
                <div className={`w-[70px] h-[70px] rounded-full flex items-center justify-center p-0.5 ${ringClasses}`}>
                  <div className="bg-black p-1 rounded-full"><img src={story.profile_pic_url} alt={story.username} className="w-full h-full rounded-full object-cover" /></div>
                </div><span className="text-xs text-white mt-1 truncate w-16">{maskUsername(story.username)}</span>
              </div>
            );
          })}
        </div>
        
        {postsToDisplay.map((post, index) => (
          <BlurredPost 
            key={post.post.id || index} 
            postData={post} 
            location={locations.length > 0 ? locations[index % locations.length] : undefined} 
            onLockedFeatureClick={onLockedFeatureClick} 
          />
        ))}

        <div className="text-center p-4 text-gray-500 text-sm">Fim do feed por enquanto.</div>
      </div>
      <InstagramFooter profileData={profileData} onLockedFeatureClick={onLockedFeatureClick} />
    </>
  );
};

export default InstagramFeedContent;