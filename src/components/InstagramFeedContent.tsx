import React, { useMemo } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Lock, MoreHorizontal, Home, Plus, ChevronDown, Search, Clapperboard } from 'lucide-react';
import { ProfileData, SuggestedProfile } from '../../types';
import LockedStory from './LockedStory'; // Importa o novo componente

// Lista de nomes reais para randomizar os posts e stories (usado no fallback)
const RANDOM_USER_NAMES = [
  'Bruna', 'Carlos', 'Pedro', 'Sofia', 'Lucas', 'Julia', 'Maria', 'Joao', 'Ana', 'Matheus'
];

// Mock data for posts (usado no fallback)
const mockPosts = [
  { id: 1, imageUrl: 'https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6', caption: 'HOJE - VIRADA DE LOTE', likes: 1245, comments: 45, sponsored: true, sponsorName: 'reveillonfestival', sponsorPic: 'https://i.pravatar.cc/150?u=reveillon' },
  { id: 2, imageUrl: 'https://picsum.photos/id/1025/600/600', caption: 'Novo look para o inverno. O que acharam? 🧥', likes: 890, comments: 22 },
  { id: 3, imageUrl: 'https://picsum.photos/id/1033/600/600', caption: 'Melhor café da cidade! ☕', likes: 2100, comments: 78 },
];

const InstagramHeader: React.FC = () => (
  <header className="grid grid-cols-3 items-center px-4 py-2 border-b border-gray-800 bg-black sticky top-0 z-10 md:hidden">
    <div className="flex justify-start">
      <Plus className="w-8 h-8 text-white" />
    </div>
    <div className="flex justify-center items-center gap-1 cursor-pointer">
      <img src="/instagram-logo.png" alt="Instagram Logo" className="h-8" style={{ filter: 'invert(1)' }} />
      <ChevronDown className="w-5 h-5 text-white mt-1" />
    </div>
    <div className="flex justify-end">
      <Heart className="w-7 h-7 text-white" />
    </div>
  </header>
);

interface InstagramFooterProps {
  profileData: ProfileData;
}

const InstagramFooter: React.FC<InstagramFooterProps> = ({ profileData }) => (
  <footer className="flex justify-around items-center py-3 border-t border-gray-800 bg-black sticky bottom-0 z-10 md:hidden">
    <Home className="w-7 h-7 text-white" fill="white" />
    <Search className="w-7 h-7 text-white" />
    <Clapperboard className="w-7 h-7 text-white" />
    <div className="relative">
      <Send className="w-7 h-7 text-white" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-black"></div>
    </div>
    <img
      src={profileData.profilePicUrl}
      alt={profileData.username}
      className="w-7 h-7 rounded-full object-cover"
    />
  </footer>
);

// Componente para post real, sem desfoque
const RealPost: React.FC<{ profile: SuggestedProfile; location?: string }> = ({ profile, location }) => {
  const likes = useMemo(() => Math.floor(Math.random() * 5000) + 100, []);
  const comments = useMemo(() => Math.floor(Math.random() * 200) + 5, []);
  const captions = ["Vivendo o momento!", "Ótimas vibrações.", "Lembranças.", "Aproveitando o dia."];
  const caption = useMemo(() => captions[Math.floor(Math.random() * captions.length)], []);

  return (
    <div className="border-b border-gray-800 mb-4">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <img src={profile.profile_pic_url} alt={profile.username} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-white">{profile.username}</p>
            {location && <p className="text-xs text-gray-400">{location}</p>}
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-white" />
      </div>
      <img src={profile.profile_pic_url} alt="Post" className="w-full h-auto object-contain" />
      <div className="flex justify-between items-center p-3">
        <div className="flex space-x-4">
          <Heart className="w-6 h-6 text-white" />
          <MessageCircle className="w-6 h-6 text-white" />
          <Send className="w-6 h-6 text-white" />
        </div>
        <Bookmark className="w-6 h-6 text-white" />
      </div>
      <div className="px-3 pb-3 text-xs">
        <p className="font-semibold text-white mb-1">{new Intl.NumberFormat().format(likes)} curtidas</p>
        <p className="text-white">
          <span className="font-semibold mr-1">{profile.username}</span>
          <span>{caption}</span>
        </p>
        <p className="text-gray-500 mt-1">Ver todos os {comments} comentários</p>
      </div>
    </div>
  );
};

// Componente para post bloqueado (fallback)
const LockedPost: React.FC<{ post: typeof mockPosts[0]; location?: string }> = ({ post, location }) => {
  const randomUser = useMemo(() => {
    const name = RANDOM_USER_NAMES[Math.floor(Math.random() * RANDOM_USER_NAMES.length)];
    return {
      username: `${name.substring(0, 3).toLowerCase()}*****`,
      profilePicUrl: `https://i.pravatar.cc/150?u=${name}${post.id}`
    };
  }, [post.id]);

  const postUser = post.sponsored ? { username: post.sponsorName, profilePicUrl: post.sponsorPic } : randomUser;

  return (
    <div className="border-b border-gray-800 mb-4">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <img src={postUser.profilePicUrl} alt={postUser.username} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-white">{postUser.username}</p>
            {location && !post.sponsored && <p className="text-xs text-gray-400">{location}</p>}
            {post.sponsored && <p className="text-xs text-gray-400">Patrocinado</p>}
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-white" />
      </div>
      <div className="relative w-full bg-gray-900 flex items-center justify-center">
        <img src={post.imageUrl} alt="Post" className="w-full h-auto object-contain blur-md" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <Lock className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
          <p className="text-xl font-bold text-white">CONTEÚDO BLOQUEADO</p>
          <p className="text-sm text-gray-400 mt-1">Acesso Premium Requerido</p>
        </div>
      </div>
      <div className="flex justify-between items-center p-3">
        <div className="flex space-x-4">
          <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
          <MessageCircle className="w-6 h-6 text-white" />
          <Send className="w-6 h-6 text-white" />
        </div>
        <Bookmark className="w-6 h-6 text-white" />
      </div>
      <div className="px-3 pb-3 text-xs">
        <p className="font-semibold text-white mb-1">{new Intl.NumberFormat().format(post.likes)} curtidas</p>
        <p className="text-white">
          <span className="font-semibold mr-1">{postUser.username}</span>
          <span>{post.caption}</span>
        </p>
        <p className="text-gray-500 mt-1">Ver todos os {post.comments} comentários</p>
      </div>
    </div>
  );
};

interface InstagramFeedContentProps {
  profileData: ProfileData;
  suggestedProfiles: SuggestedProfile[];
  isApiDataAvailable: boolean;
  locations: string[];
}

const InstagramFeedContent: React.FC<InstagramFeedContentProps> = ({ profileData, suggestedProfiles, isApiDataAvailable, locations }) => {
  return (
    <>
      <InstagramHeader />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Stories */}
        <div className="flex p-3 space-x-4 border-b border-gray-800 overflow-x-auto flex-shrink-0 scrollbar-hide">
          <div className="flex flex-col items-center flex-shrink-0 space-y-1">
            <div className="relative">
              <img src={profileData.profilePicUrl} alt="Seu story" className="w-16 h-16 rounded-full object-cover" />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-xs text-gray-400">Seu story</span>
          </div>
          
          {isApiDataAvailable 
            ? suggestedProfiles.map((story, index) => (
                <div key={index} className="flex flex-col items-center flex-shrink-0 space-y-1 text-center relative">
                  <div className="w-[70px] h-[70px] rounded-full flex items-center justify-center p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                    <div className="bg-black p-1 rounded-full">
                      <img src={story.profile_pic_url} alt={story.username} className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <span className="text-xs text-white mt-1 truncate w-16">{story.username}</span>
                </div>
              ))
            : RANDOM_USER_NAMES.slice(0, 5).map(name => <LockedStory key={name} name={name} />)
          }
        </div>

        {/* Feed Content */}
        {isApiDataAvailable
          ? suggestedProfiles.slice(0, 5).map((profile, index) => (
              <RealPost 
                key={profile.username} 
                profile={profile} 
                location={locations.length > 0 ? locations[index % locations.length] : undefined} 
              />
            ))
          : mockPosts.map((post, index) => (
              <LockedPost 
                key={post.id} 
                post={post} 
                location={locations.length > 0 ? locations[index % locations.length] : undefined} 
              />
            ))
        }
        
        <div className="text-center p-4 text-gray-500 text-sm">
          Fim do feed por enquanto.
        </div>
      </div>
      <InstagramFooter profileData={profileData} />
    </>
  );
};

export default InstagramFeedContent;